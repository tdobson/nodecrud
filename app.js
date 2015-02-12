
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var date = require('./node_modules/datejs/index.js');

//load jobboard route
var jobboard = require('./routes/jobboard');

var app = express();

var connection  = require('express-myconnection'); 
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(
    
    connection(mysql,{
        
  host     : 'localhost',                                                       
  user     : 'root',                                                            
  password : '3degUB7JxZa',                                                     
       port : 3306, //port mysql
        database:'jobboard'

    },'pool') //or single

);



//app.get('/', routes.index);
//app.get('/db1', db1.list);


//app.get('/db1/add', db1.add);
//app.post('/db1/add', db1.save);
//app.get('/db1/delete/:id', db1.delete_db1);
//app.get('/db1/edit/:id', db1.edit);
//app.post('/db1/edit/:id',db1.save_edit);

app.get('/', jobboard.list);
app.get('/view/:id', jobboard.view);
app.get('/jobs/:location/:id/:title_:company', jobboard.view);

// private funktions
app.get('/admin/add', jobboard.add);
app.post('/admin/add', jobboard.save);
//app.get('/admin/delete/:id', db1.delete_db1);
//app.get('/admin/edit/:id', db1.edit);
//app.post('/admin/edit/:id',db1.save_edit);



app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
