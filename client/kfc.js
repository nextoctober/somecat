Session.set('showRegisterForm',true);



Template.kfcmenu.helpers({
    dishes: function () {
      return DishList.find({});
    }
  });

Template.kfcdish.helpers({
    images: function () {
      return Images.find({});
    }
  });




Template.kfcnewmeal.events({
  "click .subbuton": function (event, template) {

    event.preventDefault();

    var mealname = event.target.form.mealname.value;
    var price = event.target.form.price.value;
    var description = event.target.form.description.value;
    var category = event.target.form.category.value;

    var photo = tmp.findOne({}).photourl;
    var photoid = tmp.findOne({}).phid; 
    Meteor.call('clearTemp');

    DishList.insert({
        mealname: mealname,
        price: price,
        description: description,
        photo: photo,
        photoid: photoid,
        category: category,
      });

    event.target.form.mealname.value = "";
    event.target.form.price.value = "";
    event.target.form.description.value = "";
    event.target.form.category.value = "";


    }
  });



Template.kfcdish.events({
    "click .delete": function () {
      Meteor.call('removeThisDish', this.photoid, this._id);
    }
  });




Template.kfcnewmeal.events({
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


//GETTING THE LIST OF UNIQUE CATEGORIES
Template.chooseCategory.helpers({
categories: function () {
      datag = DishList.find({}, {fields: {'category':1}}).fetch();
      mm = _.pluck(datag, 'category');
      categories = _.uniq(mm);
      return categories
    }
  });



Template.chooseCategory.events({
  'click .catButton': function(event, template) {
    event.preventDefault();
    category = this;
    Router.go('/kfc/category/'+ category);
  }
});



///////////////////////////////////////////////////////////
//REGISTRATION/////////////////////////////////////////////
///////////////////////////////////////////////////////////






Template.regiii.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Session.set('showRegisterForm',true);
    }
  });
  Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var emailVar = event.target.registerEmail.value;
        var passwordVar = event.target.registerPassword.value;
        Accounts.createUser({
            email: emailVar,
            password: passwordVar
        });
    }
  });
  Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(emailVar, passwordVar);
    }
  });




Template.regiii.events({
  'click .logreg':function(){
  Session.set('showRegisterForm',false);
    },
     'click .closereg':function(){
    Session.set('showRegisterForm',true);
    }
  });

Template.regiii.helpers({
    showTheRegisterDiv:function(){
      return Session.get('showRegisterForm');
    }

  });

///////////////////////////////////////////////////////////
//REGISTRATION//END/////////////////////////////////////////
///////////////////////////////////////////////////////////