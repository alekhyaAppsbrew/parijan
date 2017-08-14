
   // Include the file responsible for 
   // mysql connection
   var mysql = require('../node_modules/mysql');
   var connection =require('./databaseConnection.js')();

   // Include the file responsible for
   // writing log file
   var fs = require('fs');
   
  /** get_List() is used to Display
   *  the entire users list 
   *  Input : A reference to the response object  
   *  Output: A json object which contains
   *          user-details is sent as response
   **/

  function get_List(request,response)
  {
    // If the session is not active then
    // Send the api-status as false
    // and set msg as'login_error'
    if(!(request.session.userName))
    { 
      var responseToSend={};
      responseToSend.apiStatus=false;
      responseToSend.msg='login_error';
         
      // Append the same to the log file
      fs.appendFile('log',"\nAPI:get_List\nOUTPUT:\n" ,function()
      {
        fs.appendFile('log',"response:"+JSON.stringify(responseToSend)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from get_List Written to log file");

        // Send the response to the server
        response.send(responseToSend);}); 
      });
    }
    else
    {
      // Data before sending to the server
      fs.appendFile('log',"\n URL :/get_List - API NAME :get_List  METHOD TYPE : GET" ,function()
      {
        // Once the API's details are logged now append the input and output information for the same file
          fs.appendFile('log',"\nINPUT:\n" ,function()
          {
            fs.appendFile('log',"request.session.userName:"+request.session.userName,function()
            {
              // Connect to the DB and extract all the details of logged-in users
              connection.query('select * from project.customer WHERE mobilenumber='+connection.escape(request.session.userName) ,function(err, rows,result)
              {
                if(err)
                {
                  // Send 0 if unable to connect
                  response.send(new Boolean(0));
                  response.end();
                }
                else
                {
                  // If there is no error in connecting to DB
                  // create a json object of the result and 
                  // send the same as response
                  var row=rows[0];

                  // Once the API's details are logged now append the input and output information for the same file
                  fs.appendFile('log',"\nOUTPUT:\n" ,function()
                  {
                    fs.appendFile('log',"response:"+JSON.stringify(row)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from get_List Written to log file");}); 
                  });
                  response.send(row);
                }
              });
            }); 
          });
        }); 
    }
  }
 module.exports =get_List;
