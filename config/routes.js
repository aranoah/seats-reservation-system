// Draw routes.  Locomotive's router provides expressive syntax for drawing
// routes, including support for resourceful routes, namespaces, and nesting.
// MVC routes can be mapped to controllers using convenient
// `controller#action` shorthand.  Standard middleware in the form of
// `function(req, res, next)` is also fully supported.  Consult the Locomotive
// Guide on [routing](http://locomotivejs.org/guide/routing.html) for additional
// information.
module.exports = function routes() {
  this.root('pages#main');
  this.match('/location/details','findbus#getbus',{via:'POST'});
  this.match('/location/seatLayout','findseat#getseat',{via:'POST'});
  this.match('/location/seatLayout/confirmBooking','bookseat#getDetails',{via:'POST'});

}


