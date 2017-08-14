   
   // Include the file responsible for 
   // mysql connection
   var mysql = require('../node_modules/mysql');
   var connection =require('./databaseConnection.js')();

   // Include the file responsible for
   // writing log file
   var fs = require('fs');
   
  /** sendEstimate () is used to send
   *  Estimate amount 
   *  Input       : 1.transactionId[Transaction-Id]
   *                2.estimatedCost[Estimated Cost]
   *  Output      : 1.API status
   *  Method type : POST      
   **/

  function sendEstimate(request,response)
  {
    // Data before sending to the server
    fs.appendFile('log',"\n URL :/sendEstimate - API NAME :sendEstimate  METHOD TYPE : POST"+"\nINPUT:\n" ,function()
    {
      fs.appendFile('log',"transactionId:"+request.body.transactionId+"\nestimatedCost:"+request.body.estimatedCost,function()
      {        
           connection.query("UPDATE project.inboxData SET estimatedCost='"+request.body.estimatedCost+"', status='receivedQuotation' WHERE transactionId='"+request.body.transactionId+"';",function(err, rows,result)   
           {
             // If there was an error then send false
                if(err)
                {
                  // Once the API's details are logged now append the input and output information for the same file
                  fs.appendFile('log',"\nOUTPUT:\n" ,function()
                  {
                    fs.appendFile('log',"response:"+new Boolean(0)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from sendEstimate Written to log file");}); 
                    response.send(new Boolean(0));
                  });
                }
                else
                {
                  // Once the API's details are logged now append the input and output information for the same file
                  fs.appendFile('log',"\nOUTPUT:\n" ,function()
                  {
                    fs.appendFile('log',"response:"+new Boolean(1)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from sendEstimate Written to log file");}); 
                    response.send(new Boolean(1));
                  });
                }
          });
        });
      });      
    }
 module.exports = sendEstimate;
