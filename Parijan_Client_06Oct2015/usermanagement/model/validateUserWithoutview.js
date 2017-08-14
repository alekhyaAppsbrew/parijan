
   // Include the file responsible for 
   // mysql connection
   var mysql = require('../node_modules/mysql');
   var connection =require('./databaseConnection.js')();

  // failedLogins COUNT
  var failedLogins=0;

  // Include the file responsible for
  // writing log file
  var fs = require('fs');
    
 
   
  /**Input:UserName and Password  
     Output:Renders home page if the user-details
            are correct otherwise redirects back
            to login page
  **/

  function validateUserWithoutview(userName,password,response,request) 
  {

     // Data before sending to the server
    fs.appendFile('log',"\n URL :/login - API NAME :validateUserWithoutview  METHOD TYPE : POST" ,function()
    {
      // Once the API's details are logged now append the input and output information for the same file
      fs.appendFile('log',"\nINPUT:\n" ,function()
      {
        fs.appendFile('log',"userName:"+userName+"\npassword:"+password,function()
        {    
           connection.query('select count(*) AS noOfrows,mobilenumber,password from project.customer WHERE mobilenumber='+connection.escape(userName),function(err, rows,result)
           {
       
             if(err)
             {
        
                // If the user isn't present in the database then display the login page again stating that
                // the user has enetered wrong username or wrong password
                var status=[{"status":"login_failed","message":"Unable to connect to Database"}];

                // Send the log-in status
                response.send( new Boolean(0));
             }
             else
             {
         
               // Check if the password entered matches with the correct password in database
               if((rows[0].password==password)&(userName!='')&(password!=null))
               {
                 // Start the session 
                 request.session.userName =rows[0].mobilenumber;

                 status=[{"status":"login_success"}];

                 // Once the API's details are logged now append the input and output information for the same file
                 fs.appendFile('log',"\nOUTPUT:\n" ,function()
                 {
                   fs.appendFile('log',"response:"+new Boolean(1)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from validateUserWithoutview Written to log file");}); 
                 });

                 // Send the log-in status
                 response.send( new Boolean(1));
                                            
               }
               else
               {
 
                 // Increment the failedLogins by 1
                 // Render the same login message with the message stating the password is
                 // incorrect
                 var status=[{"status":"login_failed","message":"Incorrect Password or User-Name.Please enter it again"}];

                 // Once the API's details are logged now append the input and output information for the same file
                 fs.appendFile('log',"\nOUTPUT:\n" ,function()
                 {
                    fs.appendFile('log',"response:"+new Boolean(0)+"\n---------------",function(){console.log("OUTPUT from validateUserWithoutview Written to log file");}); 
                 });

    
                 // Send the log-in status
                 response.send( new Boolean(0));
                 failedLogins=failedLogins+1;
          
               }
             }
           });
         });
      });
     });
   }
 module.exports =validateUserWithoutview;
