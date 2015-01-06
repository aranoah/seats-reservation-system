$(document).ready(function(){
	var seat={booked:"booked",unbooked:"available",seatHeight:30,seatWidth:30, busHeight:10,busWidth:6};
	var bookedSeat=[6,4,34,21,32];
	function busCreate(bookedSeat){
		var x=1;
		for(var i=0;i<seat.busHeight;i++)
			for(var j=0;j<seat.busWidth;j++)
{if(i!=9)
	{if (j==2)
		continue;
		else
			{if ($.isArray(bookedSeat) && $.inArray(x,bookedSeat) != -1) 
			 $("#busgrid").append("<li id='" + x +"'" + "class='"+ seat.booked+"' style='top:" +seat.seatHeight*i+"px; left:"+seat.seatWidth*j+"px;'> </li>");
			 else
			$("#busgrid").append("<li id='" + x +"'" + "class='"+ seat.unbooked+"' style='top:" +seat.seatHeight*i+"px; left:"+seat.seatWidth*j+"px;'> </li>");}}
else
	{if ($.isArray(bookedSeat) && $.inArray(x,bookedSeat) != -1)
			 $("#busgrid").append("<li id='" + x +"'" + "class='"+ seat.booked+"' style='top:" +seat.seatHeight*i+"px; left:"+seat.seatWidth*j+"px;'> </li>");
			 else
			$("#busgrid").append("<li id='" + x +"'" + "class='"+ seat.unbooked+"' style='top:" +seat.seatHeight*i+"px; left:"+seat.seatWidth*j+"px;'> </li>");}
x++;
}
}
busCreate(bookedSeat);
});

$(function(){
	var x=0;
$("li").click(function(){
	
	if($(this).hasClass("booked"))
		alert("already booked");
	else{
$(this).toggleClass("selected");
x=x+1;
}
});
});
/*$(document).ready(function()
{
$("#ok").click(function()
{ $("#busgrid").html("<br>ok this is great");

});
});*/

