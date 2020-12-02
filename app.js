// Packages config
var express=require("express")
const app=express()
var bodyparser=require("body-parser")
var methodOverride=require("method-override")

//APP CONFIG
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

// Model Config
var mongoose=require("mongoose")
mongoose.connect("mongodb://localhost/site_app");

//Model Schema 
var siteSchema =mongoose.Schema({
    title:String,
    image:String,
    body:String,
    date:{type:Date,default:Date.now}
});
var Site =mongoose.model("Site",siteSchema); // variable created for easy accessing 

// Routes 
app.get('/',function(req,res){
    res.redirect('site');
});

// display all blogs on the site
app.get('/site',function(req,res){
    Site.find({},function(err,sites){
        if(err)
        {
            console.log(err)
        }
        else{
            res.render('site',{site:sites});
        }
    });
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

//Show Blog
app.get('/site/:id',function(req,res){
    Site.findById(req.params.id,function(err,foundSite){
        if(err)
        {
            res.redirect('/site')
        }else{
            res.render('show',{site:foundSite});
        }
    });
});

//Edit Route
app.get('/site/:id/edit',function(req,res){
    Site.findById(req.params.id,function(err,foundSite){
        if(err){
            res.redirect('/site')
        }else{
            res.render('edit',{site:foundSite});
        }
    });
});

//Update Route
app.put('/site/:id',function(req,res){
    
    Site.findByIdAndUpdate(req.params.id,req.body.site,function(err,updatedSite){
        if(err){
            res.redirect('/site')
        }else{
            res.redirect('/site/'+ req.params.id);
        }
    });
});

//Delete Route
app.delete('/site/:id',function(req,res){
    Site.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect('/site')
        }else{
            res.redirect('/site')
        }
    });
});


app.listen(3000,console.log('Server is up!'))

