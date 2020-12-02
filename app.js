var express=require("express")
const app=express()
var bodyparser=require("body-parser")
//APP CONFIG
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

// Model COnfig
var mongoose=require("mongoose")
mongoose.connect("mongodb://localhost/site_app");
//Model Schema 
var siteSchema =mongoose.Schema({
    title:String,
    image:String,
    body:String,
    date:{type:Date,default:Date.now}
});
var Site =mongoose.model("Site",siteSchema);
// Routes 
app.get('/',function(req,res){
    res.redirect('site');
});

app.get('/site',function(req,res){
    Site.find({},function(err,sites){
        if(err)
        {
            console.log(err)
        }
        else{
            res.render('site',{site:sites});
        }
    })
});

//Create new Blog
app.get('/site/new',function(req,res){
    res.render('new')
});


// Redirect to main after creating new blog
app.post('/site',function(req,res){
    Site.create(req.body.site,function(err,newsite){
        if(err){
            res.render("new")
        }
        else{
            res.redirect('site')
        }
    });
});


app.listen(3000,console.log('Server is up!'))

