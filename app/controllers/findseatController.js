var locomotive=require('locomotive');
Controller=locomotive.Controller;

var findseatController = new Controller();

findseatController.getseat= function(){
 
 var neo4j=require('neo4j');
 var db= new neo4j.GraphDatabase('http://localhost:7474');

var _self=this;
var params={
 x: _self.req.body["source"],
 y: _self.req.body["destination"],
 z: _self.req.body["bus"]};

console.log(params.x);
console.log(params.z);

var query='match (s:seat)-[:belongsTo]->(b:bus{name:"'+params.z+'"}) where s.booked=1 return s';

_self.seats=[];
db.query(query, {}, function (err, results) {
  if (err) throw err;
               console.log(results);
             _self.seats = results;
             //console.log("check1",_self.seats);
             //console.log("check2",_self.seats[0].s);
//console.log(self.seats);
//var y=_self.seats[1].s.data['bookingInfo'];
//console.log(y);

var query1='match (b:bus{name:"'+params.z+'"})-[:via]->(a:route) ,(a:route)-[s1:stop]->(d:location{name:"'+params.y+'"}),(a:route)-[s2:stop]->(e:location{name:"'+params.x+'"}) return a,s1,s2;'
_self.store=[];
db.query(query1, {}, function (err, results) {
  if (err) throw err;

     //  console.log(results[0]['s1']["_data"]);
 _self.store = results;
//console.log("tesr",_self.store[0].s2);
 
var initial_no=_self.store[0].s2._data.data['no'];
var final_no=_self.store[0].s1._data.data['no'];
var total_location=_self.store[0].a._data.data['total_stops'];

//console.log("yess",initial_no);
//console.log("qw",final_no);
//console.log("yessds",total_location);

_self.shift=total_location - final_no;
_self.mask=final_no - initial_no;
_self.bookedseats=[];
console.log("shift",_self.shift);
console.log("mask",_self.mask);
for(var i=0;i<_self.seats.length;i++)
{
	var bookInfo=_self.seats[i].s.data['bookingInfo'];
	console.log("bookInfo",bookInfo);
    var x=bookInfo >> _self.shift;
    console.log("x",x);
    var y=Math.pow(2, _self.mask)-1;
     console.log("y",y);
    if((x&y)!=0)
      _self.bookedseats.push(_self.seats[i].s.data['seatId']);
}
console.log(_self.bookedseats);

_self.res.json(_self.bookedseats);

});
});
 



}
module.exports=findseatController;