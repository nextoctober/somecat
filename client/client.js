

// Accounts.ui.config({
//   passwordSignupFields: 'USERNAME_ONLY'
// });


Template.menu.helpers({
    dishes: function () {
      return DishList.find({});
    }
  });

Template.dish.helpers({
    images: function () {
      return Images.find({});
    }
  });





Template.newmeal.events({
  "submit form": function (event, template) {

    event.preventDefault();

    var mealname = event.target.mealname.value;
    var price = event.target.price.value;
    var description = event.target.description.value;

    var photo = tmp.findOne({}).photourl;
    var photoid = tmp.findOne({}).phid; 
    Meteor.call('clearTemp');

    DishList.insert({
        mealname: mealname,
        price: price,
        description: description,
        photo: photo,
        photoid: photoid
      });

    event.target.mealname.value = "";
    event.target.price.value = "";
    event.target.description.value = "";


    }
  });






Template.dish.events({
    "click .delete": function () {
      Meteor.call('removeThisDish', this.photoid, this._id);
    }
  });




Template.newmeal.events({
   'change .myFileInput': function(event, template) {
      FS.Utility.eachFile(event, function(file) {
        Images.insert(file, function (err, fileObj) {
          if (err){
             // handle error
          } else {
           tmp.insert({"photourl": "/cfs/files/images/" + fileObj._id + "/" + fileObj.original.name, "phid": fileObj._id});
          }
        });
     });
   },
  });





