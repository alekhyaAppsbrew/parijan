   
   // Include the file responsible for 
   // mysql connection
   var mysql = require('../node_modules/mysql');
   var connection =require('./databaseConnection.js')();

   // Include the file responsible for
   // writing log file
   var fs = require('fs');
   
  /** getInboxData () is used to return 
   *  certain transaction details of
   *  customer
   *  Input       : 1.pageNumber
   *                2.pageSize
   *                3.userName from the session
   *  Output      : 1.API status
   *                2.Inbox Data Array
   *  Method type : POST      
   **/

  function getInboxData(request,response)
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
         fs.appendFile('log',"\nAPI:getInboxData\nOUTPUT:\n" ,function()
         {
           fs.appendFile('log',"response:"+JSON.stringify(responseToSend)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from getInboxData Written to log file");

                      // Send the response to the server
                      response.send(responseToSend);}); 
         });
      }
      else
      {
        // Prepare the query statement
        var part1 ='SELECT transactionId,service,date,time,status FROM project.inboxData WHERE customerid =';
        var part2 =request.session.userName;
        var part7=' ORDER BY transactionId DESC';
        var part3 =' LIMIT ';
        var part4 =request.body.pageSize;
        var part5 =' OFFSET';
        var part6 =(request.body.pageNumber-1)*(request.body.pageSize);
        part8=part1+"'"+part2+"'"+part7+part3+part4+part5+' '+part6+';';


        // Data before sending to the server
        fs.appendFile('log',"\n URL :/getInboxData - API NAME :getInboxData  METHOD TYPE : POST" ,function()
        {
          // Once the API's details are logged now append the input and output information for the same file
          fs.appendFile('log',"\nINPUT:\n" ,function()
          {
            fs.appendFile('log',"pageSize:"+request.body.pageSize+"\npageNumber:"+request.body.pageNumber+"\nrequest.session.userName:"+request.session.userName,function()
            {
              // Connect to the DB and extract certain details
              // of the vendor
              connection.query(part8,function(err, rows,result)
              {
                if(err)
                {
                  // Display the error message,if the connection fails
                  console.log(err.message);
                
                  // Once the API's details are logged now append the input and output information for the same file
                  fs.appendFile('log',"\nOUTPUT:\n" ,function()
                  {
                    fs.appendFile('log',"response:"+new Boolean(0)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from getInboxData Written to log file");

                      // Send the response to the server
                      response.send(new Boolean(0));
                  
                    });
                  });
               }
               else
               {
                  // Once the API's details are logged now append the input and output information for the same file
                  fs.appendFile('log',"\nOUTPUT:\n" ,function()
                  {
                    var responseToSend={};
                    responseToSend.inboxData=rows;
                    responseToSend.apiStatus=true;
                    fs.appendFile('log',"response:"+JSON.stringify(responseToSend)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from getInboxData Written to log file");

                      // Send the response to the server
                      response.send(responseToSend);}); 
                  
                  });
               }
           });
         });
       });
     });
   }
 }
 module.exports = getInboxData;
