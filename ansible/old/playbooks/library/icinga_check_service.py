#!/usr/bin/python
# monitor_service: monitor an init.d service status


DOCUMENTATION = '''
---
module: monitor_service
short_description: monitor an init.d service status
description: TODO
options: TODO
how to test:
see: http://docs.ansible.com/ansible/dev_guide/developing_modules.html#testing-modules
then:
hacking/test-module -m ../phenix-ops/ansible/playbooks/library/icinga_check_service.py -a "name=XXX hostname=YYYY"
SERVICE
NAME=SERVICE1; check_type=service; state=latest; hacking/test-module -m ../phenix-ops/ansible/playbooks/library/icinga_check_service.py -a "name=${NAME} hostname=sltbda09.dcn.fr.carrefour.com api_hostname=localhost api_user=icinga api_password=icinga api_port=5665 check_type=${check_type} state=${state} command_endpoint=command_endpoint serviceinit=systemd (if systemd);
LOG
NAME=LOG1; check_type=log; state=latest; hacking/test-module -m ../phenix-ops/ansible/playbooks/library/icinga_check_service.py -a "name=${NAME} hostname=sltbda09.dcn.fr.carrefour.com api_hostname=localhost api_user=icinga api_password=icinga api_port=5665 check_type=${check_type} state=${state} command_endpoint=command_endpoint logfile=/var/log/icinga2/icinga2.log oldlog=/var/log/icinga2/icinga2-warning-test-filtres.log pattern=warning";
HTTP
NAME=HTTP1; check_type=http; state=latest; hacking/test-module -m ../phenix-ops/ansible/playbooks/library/icinga_check_service.py -a "name=${NAME} hostname=sltbda09.dcn.fr.carrefour.com api_hostname=localhost api_user=icinga api_password=icinga api_port=5665 check_type=${check_type} state=${state} command_endpoint=command_endpoint http_vhost=localhost http_port=3030 http_uri=localhost http_string=string";
DISK
NAME=DISK1; check_type=disk; state=latest; hacking/test-module -m ../phenix-ops/ansible/playbooks/library/icinga_check_service.py -a "name=${NAME} hostname=sltbda09.dcn.fr.carrefour.com api_hostname=localhost api_user=icinga api_password=icinga api_port=5665 check_type=${check_type} state=${state} command_endpoint=command_endpoint disk_wfree=1 disk_cfree=2";
CPU
NAME=CPU1; check_type=cpu; state=latest; hacking/test-module -m ../phenix-ops/ansible/playbooks/library/icinga_check_service.py -a "name=${NAME} hostname=sltbda09.dcn.fr.carrefour.com api_hostname=localhost api_user=icinga api_password=icinga api_port=5665 check_type=${check_type} state=${state} command_endpoint=command_endpoint cpu_wfree=200 cpu_cfree=100";
MEM
NAME=MEM1; check_type=mem; state=latest; hacking/test-module -m ../phenix-ops/ansible/playbooks/library/icinga_check_service.py -a "name=${NAME} hostname=sltbda09.dcn.fr.carrefour.com api_hostname=localhost api_user=icinga api_password=icinga api_port=5665 check_type=${check_type} state=${state} command_endpoint=command_endpoint mem_wfree=2000 mem_cfree=1000";
LOAD
NAME=load; check_type=load; state=latest; hacking/tegit st-module -m ../phenix-ops/ansible/playbooks/library/icinga_check_service.py -a "name=${NAME} hostname=sltbda09.dcn.fr.carrefour.com api_hostname=localhost api_user=icinga api_password=icinga api_port=5665 check_type=${check_type} state=${state} command_endpoint=command_endpoint";
ELASTIC
NAME=cluster_elasticsearch; check_type=checkelastic; state=latest; hacking/test-module -m ../phenix-ops/ansible/playbooks/library/icinga_check_service.py -a "name=${NAME} hostname=sltbda09.dcn.fr.carrefour.com api_hostname=localhost api_user=icinga api_password=icinga api_port=5665 check_type=${check_type} state=${state} command_endpoint=command_endpoint es_port=9200";
CHECKTCP
NAME=check_tcp; check_type=checktcp; state=latest; hacking/test-module -m ../phenix-ops/ansible/playbooks/library/icinga_check_service.py -a "name=${NAME} hostname=sltbda09.dcn.fr.carrefour.com api_hostname=localhost api_user=icinga api_password=icinga api_port=5665 check_type=${check_type} state=${state} command_endpoint=command_endpoint tcp_port=9200";
SPARK
NAME=SPARK1; check_type=spark; state=latest; hacking/test-module -m ../phenix-ops/ansible/playbooks/library/icinga_check_service.py -a "name=${NAME} hostname=sltbda09.dcn.fr.carrefour.com api_hostname=localhost api_user=icinga api_password=icinga api_port=5665 check_type=${check_type} state=${state} command_endpoint=command_endpoint environment_name=pipeline marathonHost=marathon-uat application_name=online-transactions-persister category_name=transaction gauge=lastCompletedBatch_totalDelay critical=60000 ";
MARATHON_FRAMEWORK
NAME=MARATH1; check_type=marathon_framework; state=latest; hacking/test-module -m ../phenix-ops/ansible/playbooks/library/icinga_check_service.py -a "name=${NAME} hostname=sltbda09.dcn.fr.carrefour.com api_hostname=localhost api_user=icinga api_password=icinga api_port=5665 check_type=${check_type} state=${state} command_endpoint=command_endpoint environment_name=pipeline application_name=online-transactions-persister category_name=transaction";
'''
import json

try:
    import requests
    HAS_REQUESTS_LIB = True
except ImportError:
    HAS_REQUESTS_LIB = False


class IcingaApi:

    methods = {'GET':      requests.get,
               'PUT':      requests.put,
               'POST':     requests.post,
               'DELETE':   requests.delete
               }

    headers = {'Accept': 'application/json'}

    timeout = 30

    def __init__(self, api_hostname, api_port, api_user, api_password):
        IcingaApi.check(api_hostname, api_port, api_user, api_password)
        self.api_hostname = api_hostname
        self.api_port = api_port
        self.api_user = api_user
        self.api_password = api_password

    def manage_object(self, object_type, object_name, method, data, extras):
        uri = 'https://%s:%s/v1/objects/%s/%s?%s' % (self.api_hostname, self.api_port, object_type, object_name, extras)
        return self.methods[method](uri, auth=(self.api_user, self.api_password), timeout=self.timeout, verify=False, data=data, headers=self.headers)

    @staticmethod
    def check(api_hostname, api_port, api_user, api_password):
        if api_hostname is None:
            raise MissingParameterException("api_hostname")
        if api_port is None:
            raise MissingParameterException("api_port")
        if api_user is None:
            raise MissingParameterException("api_user")
        if api_password is None:
            raise MissingParameterException("api_password")


class ServicesApi(IcingaApi):

    def __init__(self, api_hostname, api_port, api_user, api_password):
        IcingaApi.__init__(self, api_hostname, api_port, api_user, api_password)

    def create_service(self, service):
        data = service.to_json()
        result = self.manage_object('services', service.object_name, 'PUT', data, '')
        if result.status_code != requests.codes.ok:
            result.raise_for_status()
        return result

    def delete_service(self, service):
        result = self.manage_object('services', service.object_name, 'DELETE', '', 'cascade=1')
        if result.status_code != requests.codes.ok:
            result.raise_for_status()
        return result

    def get_service(self, service):
        result = self.manage_object('services', service.object_name, 'GET', '', '')
        return result


class Object:
    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)


class GenericService:

    def __init__(self, name, hostname):
        GenericService.check(name, hostname)
        self.attrs = Object()
        self.attrs.vars = Object()
        self.object_name = "%s!%s" % (hostname, name)
        self.templates = ["generic-service"]

    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

    @staticmethod
    def check(name, hostname):
        if hostname is None:
            raise MissingParameterException("hostname")
        if name is None:
            raise MissingParameterException("name")


class Check(GenericService):

    def __init__(self, name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint):
        GenericService.__init__(self, name, hostname)
        self.attrs.check_interval = check_interval
        self.attrs.retry_interval = retry_interval
        self.attrs.max_check_attempts = max_check_attempts
        self.attrs.command_endpoint = command_endpoint
        self.attrs.vars.os_unix = "linux"


class CheckService(Check):

    def __init__(self, name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint, serviceinit):
        Check.__init__(self, name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint)
        self.attrs.check_command = "services"
        self.attrs.vars.service_name = name
        self.attrs.vars.command_status = "sudo service %s status" % name
        if serviceinit is not None:
            if serviceinit == "systemd":
                self.attrs.vars.command_status = "sudo initctl status %s" % name
            else:
                MissingParameterException("bad serviceinit")

class CheckLog(Check):

    def __init__(self, name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint, critical_ram_threshold, logfile, oldlog, pattern, servicehandler):
        Check.__init__(self, name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint)
        CheckLog.check(logfile, oldlog, pattern)
        self.attrs.check_command = "checklog"
        self.attrs.vars.ram_critical = critical_ram_threshold
        self.attrs.vars.logfile = logfile
        self.attrs.vars.oldlog = oldlog
        self.attrs.vars.query = pattern
        if servicehandler is not None:
            self.attrs.vars.event_command = "event_restart-services"
            self.attrs.vars.query = servicehandler

    @staticmethod
    def check(logfile, oldlog, pattern):
        if logfile is None:
            raise MissingParameterException("logfile")
        if oldlog is None:
            raise MissingParameterException("oldlog")
        if pattern is None:
            raise MissingParameterException("pattern")


class CheckHttp(Check):

    def __init__(self, name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint, http_vhost, http_port, http_uri, http_string):
        Check.__init__(self, name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint)
        CheckHttp.check(http_vhost, http_port, http_uri, http_string)
        self.attrs.check_command = "http"
        self.attrs.vars.http_vhost = http_vhost
        self.attrs.vars.http_port = http_port
        self.attrs.vars.http_uri = http_uri
        self.attrs.vars.http_string = http_string

    @staticmethod
    def check(http_vhost, http_port, http_uri, http_string):
        if http_vhost is None:
            raise MissingParameterException("http_vhost")
        if http_port is None:
            raise MissingParameterException("http_port")
        if http_uri is None:
            raise MissingParameterException("http_uri")
        if http_string is None:
            raise MissingParameterException("http_string")


class CheckDisk(Check):

    def __init__(self, name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint, disk_wfree, disk_cfree):
        Check.__init__(self, name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint)
        CheckDisk.check(disk_wfree, disk_cfree)
        self.attrs.check_command = "disk"
        self.attrs.vars.wfree = disk_wfree
        self.attrs.vars.cfree = disk_cfree

    @staticmethod
    def check(disk_wfree, disk_cfree):
        if disk_wfree is None:
            raise MissingParameterException("disk_wfree")
        if disk_cfree is None:
            raise MissingParameterException("disk_cfree")


class CheckCpu(Check):

    def __init__(self, name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint, cpu_wfree, cpu_cfree):
        Check.__init__(self, name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint)
        CheckCpu.check(cpu_wfree, cpu_cfree)
        self.attrs.check_command = "check_cpu"
        self.attrs.vars.wfree = cpu_wfree
        self.attrs.vars.cfree = cpu_cfree

    @staticmethod
    def check(cpu_wfree, cpu_cfree):
        if cpu_wfree is None:
            raise MissingParameterException("cpu_wfree")
        if cpu_cfree is None:
            raise MissingParameterException("cpu_cfree")

class CheckLoad(Check):

    def __init__(self, name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint):
        Check.__init__(self, name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint)
        self.attrs.check_command = "load"

class CheckHardware(Check):

    def __init__(self, name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint):
        Check.__init__(self, name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint)
        self.attrs.check_command = "check_hw_health"

class CheckElastic(Check):

    def __init__(self, name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint, es_port):
        Check.__init__(self, name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint)
        self.attrs.check_command = "checkelastic"
        self.attrs.vars.hostname = hostname
        self.attrs.vars.port = es_port


class CheckTcp(Check):

    def __init__(self, name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint, tcp_port):
        Check.__init__(self, name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint)
        CheckTcp.check(tcp_port)
        self.attrs.check_command = "tcp"
        self.attrs.vars.hostname = hostname
        self.attrs.vars.tcp_port = tcp_port

    @staticmethod
    def check(tcp_port):
        if tcp_port is None:
            raise MissingParameterException("tcp_port")

class CheckMem(Check):

    def __init__(self, name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint, mem_wfree, mem_cfree):
        Check.__init__(self, name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint)
        CheckMem.check(mem_wfree, mem_cfree)
        self.attrs.check_command = "check_mem"
        self.attrs.vars.wfree = mem_wfree
        self.attrs.vars.cfree = mem_cfree

    @staticmethod
    def check(mem_wfree, mem_cfree):
        if mem_wfree is None:
            raise MissingParameterException("mem_wfree")
        if mem_cfree is None:
            raise MissingParameterException("mem_cfree")

class CheckSpark(Check):

    def __init__(self, name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint, environment_name, marathonHost, application_name, category_name, gauge, critical):
        Check.__init__(self, name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint)
        CheckSpark.check(environment_name, marathonHost, application_name, category_name, gauge, critical)
        self.attrs.check_command = "check_phenix_spark"
        self.attrs.vars.environment_name = environment_name
        self.attrs.vars.marathonHost = marathonHost
        self.attrs.vars.application_name = application_name
        self.attrs.vars.category_name = category_name
        self.attrs.vars.gauge = gauge
        self.attrs.vars.critical = critical

    @staticmethod
    def check(environment_name, marathonHost, application_name, category_name, gauge, critical):
        if environment_name is None:
            raise MissingParameterException("environment_name")
        if marathonHost is None:
            raise MissingParameterException("marathonHost")
        if application_name is None:
            raise MissingParameterException("application_name")
        if category_name is None:
            raise MissingParameterException("category_name")
        if gauge is None:
            raise MissingParameterException("gauge")
        if critical is None:
            raise MissingParameterException("critical")

class CheckMarathonFramework(Check):

    def __init__(self, name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint, environment_name, application_name, category_name):
        Check.__init__(self, name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint)
        CheckMarathonFramework.check(environment_name, application_name, category_name)
        self.attrs.check_command = "check_phenix_framework"
        self.attrs.vars.environment_name = environment_name
        self.attrs.vars.application_name = application_name
        self.attrs.vars.category_name = category_name

    @staticmethod
    def check(environment_name, application_name, category_name):
        if environment_name is None:
            raise MissingParameterException("environment_name")
        if application_name is None:
            raise MissingParameterException("application_name")
        if category_name is None:
            raise MissingParameterException("category_name")

class MissingParameterException(Exception):
    def __init__(self, param_name):
        self.message = 'Missing `%s` option.' % param_name


def main():
    module = AnsibleModule(
        argument_spec=dict(
            check_type=dict(required=True, type='str', choices=['service', 'log', 'http', 'disk', 'cpu', 'load', 'mem', 'spark', 'marathon_framework', 'checkelastic', 'hardware', 'checktcp']),
            state=dict(required=True, type='str', choices=['present', 'absent', 'latest']),
            api_hostname=dict(required=True, type='str'),
            api_port=dict(required=True, type='int'),
            api_user=dict(required=True, type='str'),
            api_password=dict(required=True, type='str'),
            hostname=dict(required=True, type='str'),
            name=dict(required=True, type='str'),
            max_check_attempts=dict(required=False, type='str'),
            command_endpoint=dict(required=True, type='str'),
            warning_cpu_threshold=dict(required=False, type='int', default=90),
            critical_cpu_threshold=dict(required=False, type='int', default=95),
            critical_ram_threshold=dict(required=False, type='int', default=98),
            check_interval=dict(required=False, type='int', default=120),
            retry_interval=dict(required=False, type='int', default=60),
            logfile=dict(required=False, type='str'),
            oldlog=dict(required=False, type='str'),
            pattern=dict(required=False, type='str'),
            servicehandler=dict(required=False, type='str'),
            serviceinit=dict(required=False, type='str'),
            http_vhost=dict(required=False, type='str'),
            http_port=dict(required=False, type='str'),
            es_port=dict(required=False, type='str'),
            http_uri=dict(required=False, type='str'),
            http_string=dict(required=False, type='str'),
            disk_wfree=dict(required=False, type='str'),
            disk_cfree=dict(required=False, type='str'),
            cpu_wfree=dict(required=False, type='str'),
            cpu_cfree=dict(required=False, type='str'),
            mem_wfree=dict(required=False, type='str'),
            mem_cfree=dict(required=False, type='str'),
            environment_name=dict(required=False, type='str'),
            marathonHost=dict(required=False, type='str'),
            application_name=dict(required=False, type='str'),
            category_name=dict(required=False, type='str'),
            gauge=dict(required=False, type='str'),
            critical=dict(required=False, type='int'),
            tcp_port=dict(required=False, type='str')
        )
    )


    if not HAS_REQUESTS_LIB:
        module.fail_json(changed=False, msg='Missing library icinga2api')
    ## global params
    check_type = module.params.get('check_type')
    state = module.params.get('state')
    ## api params
    api_hostname = module.params.get('api_hostname')
    api_port = module.params.get('api_port')
    api_user = module.params.get('api_user')
    api_password = module.params.get('api_password')
    ## services params
    hostname = module.params.get('hostname')
    name = module.params.get('name')
    serviceinit = module.params.get('serviceinit')
    warning_cpu_threshold = module.params.get('warning_cpu_threshold')
    critical_cpu_threshold = module.params.get('critical_cpu_threshold')
    critical_ram_threshold = module.params.get('critical_ram_threshold')
    check_interval = module.params.get('check_interval')
    retry_interval = module.params.get('retry_interval')
    max_check_attempts = module.params.get('max_check_attempts')
    command_endpoint = module.params.get('command_endpoint')
    ## elasticsearch
    es_port = module.params.get('es_port')
    ## log checker params
    logfile = module.params.get('logfile')
    oldlog = module.params.get('oldlog')
    pattern = module.params.get('pattern')
    servicehandler = module.params.get('servicehandler')
    ## http checker params
    http_vhost = module.params.get('http_vhost')
    http_port = module.params.get('http_port')
    http_uri = module.params.get('http_uri')
    http_string = module.params.get('http_string')
    ## disk checker params
    disk_wfree = module.params.get('disk_wfree')
    disk_cfree = module.params.get('disk_cfree')
    ## cpu checker
    cpu_wfree = module.params.get('cpu_wfree')
    cpu_cfree = module.params.get('cpu_cfree')
    ## mem checker
    mem_wfree = module.params.get('mem_wfree')
    mem_cfree = module.params.get('mem_cfree')
    ## spark checker
    environment_name = module.params.get('environment_name')
    marathonHost = module.params.get('marathonHost')
    application_name = module.params.get('application_name')
    category_name = module.params.get('category_name')
    gauge = module.params.get('gauge')
    critical = module.params.get('critical')
    # Check tcp
    tcp_port = module.params.get('tcp_port')
    

    if check_type is None:
        module.fail_json(changed=False, msg='Missing `check_type` option.')
    if state is None:
        module.fail_json(changed=False, msg='Missing `state` option.')

    try:
        api = ServicesApi(api_hostname, api_port, api_user, api_password)

        if check_type == "service":
            service = CheckService(name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint, serviceinit)
        if check_type == "log":
            service = CheckLog(name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint, critical_ram_threshold, logfile, oldlog,
                               pattern, servicehandler)
        if check_type == "http":
            service = CheckHttp(name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint, http_vhost, http_port, http_uri,
                                http_string)
        if check_type == "disk":
            service = CheckDisk(name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint, disk_wfree, disk_cfree)
        if check_type == "cpu":
            service = CheckCpu(name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint, cpu_wfree, cpu_cfree)
        if check_type == "load":
            service = CheckLoad(name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint)
        if check_type == "hardware":
            service = CheckHardware(name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint)
        if check_type == "checkelastic":
            service = CheckElastic(name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint, es_port)
        if check_type == "mem":
            service = CheckMem(name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint, mem_wfree, mem_cfree)
        if check_type == "spark":
            service = CheckSpark(name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint,
             environment_name, marathonHost, application_name, category_name, gauge, critical)
        if check_type == "marathon_framework":
            service = CheckMarathonFramework(name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint,
             environment_name, application_name, category_name)
        if check_type == "checktcp":
            service = CheckTcp(name, hostname, check_interval, retry_interval, max_check_attempts, command_endpoint, tcp_port)

    except MissingParameterException as mp:
        module.fail_json(changed=False, msg=mp.message)

    try:
        result = api.get_service(service)
    except Exception as e: 
        module.fail_json(changed=False, msg="error when get object - CAUSE: %s" % (e))

    try:
        if result.status_code == requests.codes.ok:
            if state == "present":
                module.exit_json(changed=True, msg="service already exists")
            if state == "absent":
                api.delete_service(service)
                module.exit_json(changed=True, msg="service deleted")
            if state == "latest":
                api.delete_service(service)
        else:
            if state == "absent":
                module.exit_json(changed=True, msg="service already absent")
    except Exception as e:
        module.fail_json(changed=False, msg="error when delete object : %s - CAUSE: %s" % (e, result.content))

    try:

        if state in ["present", "latest"]:
            result = api.create_service(service)
            module.exit_json(changed=True, msg="successfull %s" % result)

    except Exception as e:
        module.fail_json(changed=False, msg="error on create object : %s - CAUSE: %s" % (e, result.content))


from ansible.module_utils.basic import *
if __name__ == '__main__':
    main()
