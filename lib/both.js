DishList = new Mongo.Collection("dishes");

// Временная коллекция.
tmp = new Mongo.Collection("tmp");


var imageStore = new FS.Store.GridFS("images");
Images = new FS.Collection("images", {
 stores: [imageStore]
});



Meteor.methods({
  clearTemp: function(){
    tmp.remove({})
  }
});



Meteor.methods({
  removeThisDish: function(imid, dsid){
    Images.remove(imid);
    DishList.remove(dsid);
  }
});
