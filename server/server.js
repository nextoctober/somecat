
  Meteor.startup(function() {

  });



  Images.allow({
  'insert': function () {
    // add custom authentication code here
    return true;
  },
  'download': function () {
    // add custom authentication code here
    return true;
  }
});


