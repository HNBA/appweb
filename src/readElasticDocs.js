// first we do a search, and specify a scroll timeout
function readElasticDocs (client, options, callback) {
  var lasttime, delay, scroll;
  var origin;
   var _readesdocs = function () {
        client.search({
          index: options.index,
          type: options.type,
          scroll: scroll,
          query: {
             // "filtered": {"query": options.query, "filter": options.filter},
             "filter": {
             "bool": {
               must :[{"range":
                   {"@timestamp":
                   {"format":"epoch_millis", "gt":lasttime}}}]

}

          }}}, function getMoreUntilDone(error, response) {
                if (error) {
                    callback(error,'a');
                } else {
                  // collect all the records
                  if (response.hits && response.hits.hits) {
                     //console.log("******** "+response.hits.hits.length);
                     response.hits.hits.forEach(function (hit) {
                        //console.log(hit);
                        var timestamp = (new Date(hit._source["@timestamp"])).getTime();
                       // if (timestamp < origin) console.log("**** lasttime="+lasttime+ " timestamp="+timestamp);
                        if (timestamp > lasttime) lasttime=timestamp;
                        try {
                            callback(null, hit._source);
                        } catch (err) {callback(err,'b');}
                        });

                      if (response.hits.hits.length !== 0) {
                        // now we can call scroll over and over
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
        options.query=options.query?options.query:'{"match_all":{}}';
        options.filter=options.filter?options.filter:'{"match_all":{}}';
      _readesdocs();
     }
};

module.exports=readElasticDocs;
