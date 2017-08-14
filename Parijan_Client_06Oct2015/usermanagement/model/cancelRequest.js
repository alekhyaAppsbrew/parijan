   
   // Include the file responsible for 
   // mysql connection
   var mysql = require('../node_modules/mysql');
   var connection =require('./databaseConnection.js')();

   // Include the file responsible for
   // writing log file
   var fs = require('fs');
   
  /** cancelRequest () is used to update
   *  the staus and add remarks given by 
   *  customer
   *  Input       : 1.transactionId[Transaction-Id]
   *                2.remarks[Remarks or complaint given by the customer]
   *  Output      : 1.API status
   *  Method type : POST      
   **/

  function cancelRequest(request,response)
  {
    // Inserting all the request details into inboxData table 
    // Data before sending to the server
    fs.appendFile('log',"\n URL :/cancelRequest - API NAME :cancelRequest  METHOD TYPE : POST"+"\nINPUT:\n" ,function()
    {
      fs.appendFile('log',"transactionId:"+request.body.transactionId+"\nremarks:"+request.body.remarks,function()
      {        
           connection.query("UPDATE project.inboxData SET remarks='"+request.body.remarks+"', status='CANCEL' WHERE transactionId='"+request.body.transactionId+"';",function(err, rows,result)   
           {
             // If there was an error then send false
                if(err)
                {
                  // Once the API's details are logged now append the input and output information for the same file
                  fs.appendFile('log',"\nOUTPUT:\n" ,function()
                  {
                    fs.appendFile('log',"response:"+new Boolean(0)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from cancelRequest Written to log file");}); 
                    response.send(new Boolean(0));
                  });
                }
                else
                {
                  // Once the API's details are logged now append the input and output information for the same file
                  fs.appendFile('log',"\nOUTPUT:\n" ,function()
                  {
                    fs.appendFile('log',"response:"+new Boolean(1)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from cancelRequest Written to log file");}); 
                    response.send(new Boolean(1));
                  });
                }
          });
        });
      });      
    }
 module.exports = cancelRequest;
