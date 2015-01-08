var locomotive=require('locomotive');
Controller=locomotive.Controller;

var bookseatController = new Controller();

bookseatController.getDetails=function(){
	var neo4j = require('neo4j');
    var db = new neo4j.GraphDatabase('http://localhost:7474');

    var _self=this;
    var params={
    	source: _self.req.body["source"],
    	destination:_self.req.body["destination"],
    	bus:_self.req.body["bus"],
    	name:_self.req.body["name"],
    	contact:_self.req.body["contact"],
    	bookedSeat:_self.req.body["bookedSeat"]
    }

    //req.session, req.getSession
    var query='match (b:bus{name:"'+params.z+'"})-[:via]->(a:route) ,(a:route)-[s1:stop]->(d:location{name:"'+params.y+'"}),(a:route)-[s2:stop]->(e:location{name:"'+params.x+'"}) return a,s1,s2;'
_self.store=[];
db.query(query, {}, function (err, results) {
  if (err) throw err;
 _self.store = results;
 var initial_no=_self.store[0].s2._data.data['no'];
 var final_no=_self.store[0].s1._data.data['no'];
 var total_location=_self.store[0].a._data.data['total_stops'];
  
  var power= total_location-final_no-1;
  var loop=final_no-initial_no;  
_self.sum=0;
for(var j=power;j>(power-loop);j--)
{
	var add=Math.pow(2,power);
	_self.sum=sum+add;
}
  for(var i=0;i<params.bookedSeat.length;i++)
    {
    	var id=bookedSeat[i];
    	var query1="match (s:seat{seatId:"+id+"})-[:belongsTo]->(b:bus{name:"+params.bus+"}) set s.booked=1,s.bookingInfo=s.bookingInfo+"+_self.sum;
    	db.query(query1, {}, function (err, results) {
         if (err) throw err;}

    }

    _self.render("pages/confirm");
}

module.exports=bookseatController;