#!/usr/bin/env python
# -*- coding: utf-8 -*-

DOCUMENTATION = '''
---
module: elasticsearch
short_description: Create or delete elasticsearch template/index
description:
    - You can create/delete elasticsearch templates or indices
    - Each time you create a template, you will override existing template if it exists
    - You cannot override existing index without deleting: to override existing index you should delete and then create index
options:
  hosts:
    required: True
    description:
      - elasticsearch hosts
  port_http:
    required: False
    default: 9200
    description:
      - elasticsearch http port
  name:
    required: True
    description:
      - elasticsearch template/index name
  type:
    required: True
    choices:
      - index
      - template
    description:
      - elasticsearch mapping type
  definition_file:
    required: False
    description:
      - Path to data file (mapping, settings, aliases, ...). Required with 'present' state
  params:
    required: False
    default: {}
    description:
      - The jinja2 template parameters dictionary
  state:
    required: True
    description:
      - The state to execute: present or absent
    choices:
      - present
      - absent
'''

EXAMPLES = '''
---
# Create an elasticsearch template
- elasticsearch:
    hosts: host1,host2
    name: es-template
    type: template
    state: present
    definition_file: <path>/template.json.j2
    params: {"param1": 5, "param2": 1}

# Delete an elasticsearch template
- elasticsearch:
    hosts: host1,host2
    name: es-template
    type: template
    state: absent

Tests
 - source <path to ansible source>/hacking/env-setup
 - <path to ansible source>/hacking/test-module -m ./ansible/playbooks/library/elasticsearch.py -a 'hosts=host1,host2 name=es-template state=absent type=template'
'''

import os

try:
    from jinja2 import Template
    HAS_JINJA2 = True
except ImportError:
    HAS_JINJA2 = False


def elasticsearch_url(type, host, port, name):
    """
        Generate elasticsearch url depending on type
        :return: url
    """
    if type == 'template':
        url = "http://%s:%s/_template/%s" % (host, str(port), name)
    else:
        url = "http://%s:%s/%s" % (host, str(port), name)
    return url

def check_input_file(file):
    """
        Check the file: exists, not a directory and readable
        :return: (failed, msg)
    """
    failed = False
    msg = ""
    if not os.path.exists(file):
        failed = True
        msg = "File %s not found" % (file)
    elif not os.access(file, os.R_OK):
        failed = True
        msg = "File %s not readable" % (file)
    elif os.path.isdir(file):
        failed = True
        msg = "File %s is a directory" % (file)
    return (failed, msg)

def render_jinja2_template_file(file, params):
    """
        Process and render a jinja2 template file
        :return: render template content
    """
    with open(file, 'r') as file_content:
        jinja2_template = Template(file_content.read())
        file_content.close()
        return jinja2_template.render(params)

def check_index_exists(module, url):
    """
        Check if index already exists
        :return: True if exists and False else
    """
    response, info = fetch_url(module, url, method="HEAD")
    if info["status"] == 200:
        return True
    else:
        return False

def execute_elasticsearch_present_state(module, type, state, url, definition_file, params):
    """
        Create template/index in elasticsearch
        :return: failed, changed, msg
    """
    changed = False
    failed, msg = check_input_file(definition_file)
    if not failed:
        data = render_jinja2_template_file(definition_file, params)
        response, info = fetch_url(module, url, data=data, method="POST")
        if info["status"] == 200:
            changed = True
            msg=response.read()
        else:
            failed = True
            msg=error_msg(state, definition_file, url, info["status"], response)
    return failed, changed, msg

def execute_elasticsearch_state(module, type, state, url, definition_file, params):
    """
        Execute state depending on type and state types
        :return: failed, changed, msg
    """
    failed, changed, msg = False, False, ""
    if state == 'absent':
        response, info = fetch_url(module, url, method="DELETE")
        if info["status"] == 404:
            msg = "%s not found" % type
        elif info["status"] == 200:
            changed = True
            msg=response.read()
        else:
            failed = True
            msg=error_msg(state, definition_file, url, info["status"], response)
    elif type == 'index' and check_index_exists(module, url):
        msg="index already exists"
    else:
        failed, changed, msg = execute_elasticsearch_present_state(module, type, state, url, definition_file, params)
    return failed, changed, msg

def first_reachable_host(module, hosts, port):
    for host in hosts:
        check_url = "http://%s:%s/" % (host, str(port))
        response, info = fetch_url(module, check_url, method="HEAD")
        if info["status"] == 200:
            return host
    return None


def error_msg(state, definition_file, url, status, response):
    return "Unable to execute state '%s' for template %s on host %s, failed with status_code %s : %s" % (state, definition_file, url, status, response)

def main():

    module = AnsibleModule(
        argument_spec=dict(
            hosts=dict(required=True, type='list'),
            port_http=dict(default=9200, type='int'),
            name=dict(required=True, type='str'),
            type=dict(required=True, choices=['index', 'template']),
            params=dict(default={}, type='dict'),
            definition_file=dict(default="", type='str'),
            state=dict(required=True, choices=['present', 'absent'])
        )
    )

    if not HAS_JINJA2:
        module.fail_json(msg='jinja2 module is required for this module')

    changed = False

    hosts = module.params['hosts']
    port = module.params['port_http']
    name = module.params['name']
    type = module.params['type']
    definition_file = module.params['definition_file']
    params = module.params['params']
    state = module.params['state']

    if state != 'absent' and not definition_file:
        module.fail_json(msg='definition_file parameter is required for %s state' % state)

    host = first_reachable_host(module, hosts, port)
    if not host:
        module.fail_json(msg='no index available in the list of hosts %s' % hosts)

    url = elasticsearch_url(type, host, port, name)

    failed, changed, msg = execute_elasticsearch_state(module, type, state, url, definition_file, params)

    if not failed:
        module.exit_json(changed=changed, msg=msg)
    else:
        module.fail_json(msg=msg)


# import module snippets
from ansible.module_utils.basic import *
from ansible.module_utils.urls import *

if __name__ == "__main__":
    main()