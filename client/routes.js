
Router.route('/', function () {
  this.layout('oooLayout');
  this.render('menu');
});




Router.route('/kfc', function () {
  this.layout('kfcLayout');
  this.render('kfcmenu');

});




Router.route('/kfc/category/:category', function () {
	this.layout('kfcLayout');
    this.render('ShowByCategory', {data: function() 
    {

      catdishes = DishList.find({category: this.params.category})
      return catdishes;

    }
    }); });


// Router.map(function() {
//   this.route('anotherpath', {
//     path: '/kfc/' + category,
//     layoutTemplate: 'ShowByCategory',
//      data:  function() 
//     { console.log(this.params),
//       catid = this.params.category,
//       catdishes = DishList.find({category: catid})
//       return catdishes;}

//   });
// });


Router.route('/reg', function () {
  this.render('regiii');
//  this.render();

});

