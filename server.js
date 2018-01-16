const express=require('express');
const hbs=require('hbs');

var app=express();

var port=process.env.PORT || 3000;

//How to add a route 
//how to register Helpers as they can be used anywhere in the app(They act like Global Variables).
//How to add static pages in the public folder.
//the public always contains static **
//How to add views folder so that we can store hbs files we can make them dynamic and render it to display them.
//How to add partials and use them in the hbs files.Make it easier to code. No redundant coding. 
//How to add maintenance to the app

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('currentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('League',()=>{
    return 'JPL-7';
});

app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));
app.use((request,response,next)=>{
    var time=new Date().toString();
    var log=`${time}:${request.method}:${request.url}:${request.hostname}:${request.ip}:${request.ips}`;    
    console.log(log);
    next();
});

/*app.use((request,response,next)=>{
    response.render('maintenance.hbs');
    next();
});*/

app.get('/',(request,response)=>{
    response.render('home.hbs',{
        WelcomeMessage:"Welcome to JPL-7 Official Website"
    });
});

app.get('/about',(request,response)=>{
    response.render('about.hbs');
});

app.get('/bad',(request,response)=>{
    response.send({
        error:"Unable to Connect to API servers"
    });
});

app.get('/modules',(request,response)=>{
    response.render('modules.hbs');
});

app.listen(port,()=>{
    console.log('Server is up and running');
});