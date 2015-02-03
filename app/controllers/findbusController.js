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

var day=params.date.getDay();

var query='MATCH (b)-[:stop]->(c:location{name:"'+params.initial+'"}),(b)-[:stop]->(d:location{name:"'+params.final+'"}),(x:bus)-[:via]->(b) return x';

var store=[];
 _self.name=[];
db.query(query, {}, function (err, results) {
  if (err) throw err;
       
            store = results;
            console.log(store); 
              _self.array=store;
            _self.render("pages/buslist");
  }); 
}


module.exports=findbusController;