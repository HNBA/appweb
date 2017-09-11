<<<<<<< HEAD
=======
// first we do a search, and specify a scroll timeout
>>>>>>> 4c2ee4987027b63ad242dab14da597655c24ad03
function readElasticDocs (client, options, callback) {
  var lasttime, delay, scroll;
  var origin;
   var _readesdocs = function () {
        client.search({
          index: options.index,
          type: options.type,
          scroll: scroll,
<<<<<<< HEAD

   }
, function getMoreUntilDone(error, response) {
                if (error) {
                    callback(error,'a');
                } else {
                  if (response.hits && response.hits.hits) {
                     response.hits.hits.forEach(function (hit) {
                        var timestamp = (new Date(hit._source["@timestamp"])).getTime();
=======
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
>>>>>>> 4c2ee4987027b63ad242dab14da597655c24ad03
                        if (timestamp > lasttime) lasttime=timestamp;
                        try {
                            callback(null, hit._source);
                        } catch (err) {callback(err,'b');}
                        });

                      if (response.hits.hits.length !== 0) {
<<<<<<< HEAD
=======
                        // now we can call scroll over and over
>>>>>>> 4c2ee4987027b63ad242dab14da597655c24ad03
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
<<<<<<< HEAD
       options.query=options.query?options.query:'{ "match": { "plugin": "cpu" }}';
       options.filter=options.filter?options.filter:'{{ "range": {"value": {"gte":  20,"lt":   30}}}}';
=======
        options.query=options.query?options.query:'{"match_all":{}}';
        options.filter=options.filter?options.filter:'{"match_all":{}}';
>>>>>>> 4c2ee4987027b63ad242dab14da597655c24ad03
      _readesdocs();
     }
};

module.exports=readElasticDocs;
