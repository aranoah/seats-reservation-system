var bus;
function viewseat(x,y,z){
  bus=z;
	$.post("/location/seatLayout",{source:x, destination:y, bus:z},function(data,status){
    busCreate(data); });
	$("#dialogue").dialog({
      resizable: false,
      height:500,
      width:500,
      modal: true,
      buttons: {
        "proceed": function() {
          $( this ).dialog( "close" );
          $(".displayList").hide();
          $(".passengerDetails").show();
          
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      }
    });
}

$(function(){
$("#submit").click(function(){
var x=$("#source").val();
var y=$("#destination").val();
var a=$("#name").val();
var b=$("#contact").val();

  $.post("/location/seatLayout/confirmBooking",{source:x,destination:y,bus:bus,name:a,contact:b,bookedSeat:selectedSeat});
})
});
/*$( "#details" ).submit(function( event ) {
  $.post("/location/seatLayout/confirmBooking",{source:source,destination:destination,bus:bus,name:name,contact:contact,bookedSeat:selectedSeat});
  event.preventDefault();
});*/