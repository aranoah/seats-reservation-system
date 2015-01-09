var locomotive=require('locomotive');
Controller=locomotive.Controller;

var bookseatController = new Controller();
  var neo4j = require('neo4j');
    var db = new neo4j.GraphDatabase('http://localhost:7474');
bookseatController.getDetails=function(){


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
    var query='match (b:bus{name:"'+params.bus+'"})-[:via]->(a:route) ,(a:route)-[s1:stop]->(d:location{name:"'+params.destination+'"}),(a:route)-[s2:stop]->(e:location{name:"'+params.source+'"}) return a,s1,s2';
_self.store=[];
db.query(query, {}, function (err, results) {
  if (err) throw err;
 _self.store = results;
 
 var initial_no=_self.store[0].s2._data.data['no'];
 var final_no=_self.store[0].s1._data.data['no'];
 var total_location=_self.store[0].a._data.data['total_stops'];

  var power= total_location-initial_no-1;
  console.log("power",power);
  var loop=final_no-initial_no;  
_self.sum=0;
for(var j=power;j>(power-loop);j--)
{
	var add=Math.pow(2,j);
  console.log("add",add);
	_self.sum=_self.sum+add;
  console.log("sum",_self.sum);
}
console.log("asd",params);
_self.store1;
  for(var i=0;i<params.bookedSeat.length;i++)
    {
    	var id=params.bookedSeat[i];
    	var query1="match (s:seat{seatId:"+id+"})-[:belongsTo]->(b:bus{name:'"+params.bus+"'}) set s.booked=1,s.bookingInfo=s.bookingInfo+"+_self.sum;
    	db.query(query1, {}, function (err, results) {
         if (err) throw err; 
         var bookid=params.name.substr(1,3)+"bus"+params.destination.substr(1,3);
    var query2="match (b:bus{name:'"+params.bus+"'}) create(s:ticket{bookingId:'"+bookid+"',PassengerName:'"+params.name+"',PassengerContact:"+params.contact+",toCity:'"+params.source+"',fromCity:'"+params.destination+"',seatNo:"+id+"}), (s)-[p:bus_ticket]->(b) return s";
        db.query(query2, {}, function (err, results) {
         if (err) console.log(err);
         console.log("ticket",results);
       _self.store1=results;
        _self.res.json(_self.store1);
        });

});
      
    }
 });
}

bookseatController.viewdetails=function(){
  var ticket=this.req.query.id;
  console.log("check",ticket);
/*var query2="match(t:ticket) where t.seatNo="+seat+" return t";
var store;
db.query(query2, {}, function (err, results) {
         if (err) throw(err);
         console.log(results);
         store=results;
         console.log(store); 
      this.seatNo=seat;*/
this.render("pages/confirm");

}

module.exports=bookseatController;