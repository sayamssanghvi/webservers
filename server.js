const express=require('express');
const hbs=require('hbs');

var app=express();

var port=process.env.PORT || 3000;

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
    var log=`${time}:${request.method}:${request.url}`;
    console.log(log);
    next();
});

/*app.use((request,response,next)=>{
    response.render('maintenance.hbs');
    next();
});*/

app.get('/',(request,response)=>{
    response.render('home.hbs',{
        WelcomeMessage:"Welcome to JPL-7 Official Website",
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

app.listen(port,()=>{
    console.log('Server is up and running');
});