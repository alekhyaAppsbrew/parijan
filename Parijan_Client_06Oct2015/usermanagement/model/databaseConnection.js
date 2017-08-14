   
    var mysql = require('../node_modules/mysql');
   /** databaseConnection() is used to connect 
    *  to Database
    *  Input:Nil  
    *  Output:Connects to the database and
    *         returns the connection object
    **/
  function databaseConnection()
  {
    
    // Given the username and password,
    // connect to the Database.
    var connection=mysql.createConnection({
       host  :'localhost',
       user  :'root',
       password :'root123',
    });
 
    return connection;

  } 
  
  
 module.exports=databaseConnection;
