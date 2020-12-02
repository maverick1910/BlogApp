var mongoose=require("mongoose")
var siteSchema =mongoose.Schema({
    title:String,
    image:String,
    body:String,
    date:{type:Date,default:Date.now}
});
var Site =mongoose.model("Site",siteSchema);
module.exports=Site;