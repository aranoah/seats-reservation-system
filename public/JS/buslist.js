
var seat={booked:"booked",unbooked:"available",seatHeight:30,seatWidth:30, busHeight:10,busWidth:6};
function busCreate(bookedSeat){
		var x=1;
		for(var i=0;i<seat.busHeight;i++)
			for(var j=0;j<seat.busWidth;j++)
{if(i!=9)
	{if (j==2)
		continue;
		else
			{if ($.isArray(bookedSeat) && $.inArray(x,bookedSeat) != -1) 
			 $("#busgrid").append("<li  id='" + x +"'" + "class='seatPo  "+ seat.booked+"' style='top:" +seat.seatHeight*i+"px; left:"+seat.seatWidth*j+"px;'> </li>");
			 else
			$("#busgrid").append("<li  id='" + x +"'" + "class='seatPo  "+ seat.unbooked+"' style='top:" +seat.seatHeight*i+"px; left:"+seat.seatWidth*j+"px;'> </li>");}}
else
	{if ($.isArray(bookedSeat) && $.inArray(x,bookedSeat) != -1)
			 $("#busgrid").append("<li  id='" + x +"'" + "class='seatPo "+ seat.booked+"' style='top:" +seat.seatHeight*i+"px; left:"+seat.seatWidth*j+"px;'> </li>");
			 else
			$("#busgrid").append("<li  id='" + x +"'" + "class='seatPo  "+ seat.unbooked+"' style='top:" +seat.seatHeight*i+"px; left:"+seat.seatWidth*j+"px;'> </li>");}
x++;
}
}
var selectedSeat=[];
$(function(){
	$(document).on("click",".seatPo",function(){
	if($(this).hasClass("booked"))
		alert("already booked");
	else{
		var seatId=$(this).attr('id');
$(this).toggleClass("selected");
if($.inArray(seatId,selectedSeat)!=-1)
selectedSeat.pop(seatId);
else
selectedSeat.push(seatId);
//x=x+1;	
	}
})

});