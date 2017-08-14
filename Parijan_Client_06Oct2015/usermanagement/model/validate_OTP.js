
   // Include the file responsible for 
   // mysql connection
   var mysql = require('../node_modules/mysql');
   var connection =require('./databaseConnection.js')();

  // Include the file responsible for
  // writing log file
  var fs = require('fs');
    
 
   
  /**Input:Request object that contains OTP entered by the customer
     Output:Returns boolean
            true:If the OTP entered is correct
            false:If the OTP entered is wrong
  **/

  function validate_OTP(request,response) 
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
       fs.appendFile('log',"\nAPI:validate_OTP\nOUTPUT:\n" ,function()
       {
         fs.appendFile('log',"response:"+JSON.stringify(responseToSend)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from validate_OTP Written to log file");

         // Send the response to the server
         response.send(responseToSend);}); 
       });
     }
     else
     {
       // Data before sending to the server
       fs.appendFile('log',"\n URL :/validate_OTP - API NAME :validate_OTP  METHOD TYPE : POST" ,function()
       {
         // Once the API's details are logged now append the input and output information for the same file
         fs.appendFile('log',"\nINPUT:\n" ,function()
         {
           fs.appendFile('log',"otp:"+request.body.otp+"\nrequest.session.userName:"+request.session.userName,function()
           {    
             connection.query('select count(*) AS noOfrows,otp from project.customer WHERE mobilenumber='+connection.escape(request.session.userName),function(err, rows,result)
             {
       
               if(err)
               {
        
                 // If there is an error in connecting to the Database
                 // Send the log-in status
                 response.send( new Boolean(0));
               }
               else
               {
         
                 // Check if the password entered matches with the correct password in database
                 if((rows[0].otp==request.body.otp)&(request.body.otp!='')&(request.body.otp!=null))
                 {
                 
                   // Once the API's details are logged now append the input and output information for the same file
                   fs.appendFile('log',"\nOUTPUT:\n" ,function()
                   {
                     fs.appendFile('log',"response:"+new Boolean(1)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from validateUserWithoutview Written to log file");}); 
                   });

                   // Send the validation status
                   response.send( new Boolean(1));
                                            
                 }
                 else
                 {
 
                   // Once the API's details are logged now append the input and output information for the same file
                   fs.appendFile('log',"\nOUTPUT:\n" ,function()
                   {
                      fs.appendFile('log',"response:"+new Boolean(0)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from validate_OTP Written to log file");}); 
                   });

    
                   // Send the log-in status
                   response.send( new Boolean(0));
          
                 }
               }
             });
           });
        });
       });
     }
   }
 module.exports =validate_OTP;
