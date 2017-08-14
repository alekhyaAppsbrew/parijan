
   // Include the file responsible for 
   // mysql connection
   var mysql = require('../node_modules/mysql');
   var connection =require('./databaseConnection.js')();

   // Include the file responsible for
   // writing log file
   var fs = require('fs');
 
  /** getAddress () is used to return 
   *  the address of the customer
   *  based on the areaPinCode
   *  Input       : 1.areaPinCode
   *                2.userName from the session
   *  Output      : 1.API status
   *                2.Json Object which contains the customer's address
   *  Method type : POST      
   **/

  function getAddress(request,response) 
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
       fs.appendFile('log',"\nAPI:getAddress\nOUTPUT:\n" ,function()
       {
         fs.appendFile('log',"response:"+JSON.stringify(responseToSend)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from getAddress Written to log file");

         // Send the response to the server
         response.send(responseToSend);}); 
       });
     }
     else
     {
       // Data before sending to the server
      fs.appendFile('log',"\n URL :/getAddress - API NAME :getAddress  METHOD TYPE : POST" ,function()
      {
        // Once the API's details are logged now append the input and output information for the same file
        fs.appendFile('log',"\nINPUT:\n" ,function()
        {
          fs.appendFile('log',"areaPinCode:"+request.body.areaPinCode+"\nuserName:"+request.session.userName,function()
          {    
             connection.query("select address from project.customer WHERE mobilenumber='"+request.session.userName+"' AND areaPinCode='"+request.body.areaPinCode+"';",function(err, rows,result)
             {
       
               if((err)||(rows[0]==undefined))
               {
                  // Send the api status
                  response.send( new Boolean(0));
               }
               else
               {
         
                 // Prepare the Json Object to be sent
                 var responseToSend={};
                 responseToSend=rows[0];
                 responseToSend.apiStatus=true;
                 console.log(responseToSend.address);
                 // Once the API's details are logged now append the input and output information for the same file
                 fs.appendFile('log',"\nOUTPUT:\n" ,function()
                 {
                   fs.appendFile('log',"response:"+JSON.stringify(responseToSend)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from getAddress Written to log file");}); 
                 });

                 // Send the response that contains both address and apiStatus
                 response.send(responseToSend);
                                            
               }
             });
           });
        });
       });
     }
   }
 module.exports =getAddress;
