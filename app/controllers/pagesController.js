var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var pagesController = new Controller();

/*pagesController.main = function() {
this.render("main");
}*/

pagesController.main = function(){
	this.render("main");
}

pagesController.getbus=function(){
this.sCity=this.req.params.source;
this.dCity=this.req.params.destination;
this.render("buslist");
}


module.exports = pagesController;

