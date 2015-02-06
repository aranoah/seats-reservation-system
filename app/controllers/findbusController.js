var locomotive= require('locomotive'),
Controller=locomotive.Controller;

var findbusController= new Controller();

findbusController.getbus= function(){
	var neo4j = require('neo4j');
    var db = new neo4j.GraphDatabase('http://localhost:7474');

var _self = this;
var params = {

  initial: _self.req.body["source"],
  final: _self.req.body["destination"],
  date: new Date(_self.req.body["journeyDate"])
//initial: _self.req.params.source,
//final: _self.req.params.destination
};
console.log("params.date",params.date);
_self.source=params.initial;
_self.destination=params.final;

 _self.day=params.date.getDay();
console.log("current day",_self.day);

var query='MATCH (b)-[:stop]->(c:location{name:"'+params.initial+'"}),(b)-[:stop]->(d:location{name:"'+params.final+'"}),(x:bus)-[:via]->(b) return x';

var store=[];
var store2=[];
db.query(query, {}, function (err, results) {
  if (err) throw err;
  store = results;
  console.log("initial results",store);
       for(var i=0;i<store.length;i++)
       { var arr=[];
        arr=JSON.stringify(store[i].x.data['days']);
        console.log("checking days",arr);
       if(arr.indexOf(_self.day)!=-1)
           store2.push(store[i]);
          }  
          console.log("final results",store2);
              _self.array=store2;
            _self.render("pages/buslist");
  }); 
}


module.exports=findbusController;