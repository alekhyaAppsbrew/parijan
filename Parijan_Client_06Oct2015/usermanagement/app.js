

  // Include express
  var express = require('express');

  // Include cookieParser and session
  // so that session can be maintained
  var cookieParser = require('cookie-parser');
  var session = require('express-session');

  // Intantiate the express()
  var app = express();
  
  // Use Cookie Parser for creating a session 
  app.use(cookieParser());
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }));

  // Include http object to create server,mysql
  // object to establish the connection to the
  // database,fs object for file related operations
  var http = require('http')
  , mysql = require('mysql')
  , fs = require('fs');
  
  // Include the scripts for redirectionScript
  // and body-parser for json object
  var redirect = require('redirectionScript.js');
  var bodyParser = require('body-parser');
  var router = require('node-simple-router');
  
  // Set the view engine to ejs to send data
  // to the client side
  app.set('view engine', 'ejs');
  
  // This is to render a html file
  app.engine('html', require('ejs').renderFile);
  
  // Set the port
  app.set('port', process.env.PORT || 3004);
  
  // Let the app use the bodyparser and 
  // router
  app.use(bodyParser());
  
  // Specify the path for views folder
  // app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/ParijanClientApp'));
  // app.use("/views", express.static(__dirname + '/views'));
  
   // Create the server
   var server=http.createServer(app).listen(app.get('port'), function(){
      
     console.log('Express server listening on port ' + app.get('port'));

     // Save the server information in a variable
     var serverInfo='Express server listening on port ' + app.get('port');
     
     // Once the Server Starts,clear the data that is present in the
     // log file and write the server information in it
     fs.writeFile('log',"\n------------------------------------------------------------------------------\n"+serverInfo+"\n------------------------------------------------------------------------------",function(){console.log("Log File Cleared");});
     
   });

   // If there was an error in creating a server
  server.on('error', function(e) 
  {
    console.log('problem with request: ' + e.message);
  });
   
   // Set up the routes
   require('./lib/route_handler.js')(app);

 
    



   
  


  
        

 
