function readElasticDocs (client, options, callback) {
  var lasttime, delay, scroll;
  var origin;
   var _readesdocs = function () {
        client.search({
          index: options.index,
          type: options.type,
          scroll: scroll,

   }
, function getMoreUntilDone(error, response) {
                if (error) {
                    callback(error,'a');
                } else {
                  if (response.hits && response.hits.hits) {
                     response.hits.hits.forEach(function (hit) {
                        var timestamp = (new Date(hit._source["@timestamp"])).getTime();
                        if (timestamp > lasttime) lasttime=timestamp;
                        try {
                            callback(null, hit._source);
                        } catch (err) {callback(err,'b');}
                        });

                      if (response.hits.hits.length !== 0) {
                        client.scroll({
                          scrollId: response._scroll_id,
                          scroll: scroll
                        }, getMoreUntilDone);
                      } else {
                          setTimeout(_readesdocs, delay);
                      }
                  } else callback(Error(reponse),'c');
                }}
    )};

    if (options.index==undefined || options.type==undefined) {
        callback(Error('index and type must be defined'),'d');
    } else {
        lasttime=options.lasttime?options.lasttime:0;
        origin=lasttime;
        delay=options.delay?options.delay:10000;
        scroll=options.scroll?options.scroll:'30s';
       options.query=options.query?options.query:'{ "match": { "plugin": "cpu" }}';
       options.filter=options.filter?options.filter:'{{ "range": {"value": {"gte":  20,"lt":   30}}}}';
      _readesdocs();
     }
};

module.exports=readElasticDocs;
