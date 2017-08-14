   
   // Include the file responsible for 
   // mysql connection
   var mysql = require('../node_modules/mysql');
   var connection =require('./databaseConnection.js')();

   // Include the file responsible for
   // writing log file
   var fs = require('fs');
   
  /** makePayment () is used to update
   *  the DB after payment
   *  Input       : 1.transactionId[Transaction-Id]
   *                2.modeOfpayment[The mode in which the customer wants to pay]
   *  Output      : 1.API status
   *  Method type : POST      
   **/

  function makePayment(request,response)
  {
    // Inserting all the request details into inboxData table 
    // Data before sending to the server
    fs.appendFile('log',"\n URL :/makePayment - API NAME :makePayment  METHOD TYPE : POST"+"\nINPUT:\n" ,function()
    {
      fs.appendFile('log',"transactionId:"+request.body.transactionId+"\nmodeOfpayment:"+request.body.modeOfpayment,function()
      {        
           connection.query("UPDATE project.inboxData SET  status='TXN_COMPLETED' WHERE transactionId='"+request.body.transactionId+"';",function(err, rows,result)   
           {
             // If there was an error then send false
                if(err)
                {
                  // Once the API's details are logged now append the input and output information for the same file
                  fs.appendFile('log',"\nOUTPUT:\n" ,function()
                  {
                    fs.appendFile('log',"response:"+new Boolean(0)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from makePayment Written to log file");}); 
                    response.send(new Boolean(0));
                  });
                }
                else
                {
                  // Once the API's details are logged now append the input and output information for the same file
                  fs.appendFile('log',"\nOUTPUT:\n" ,function()
                  {
                    fs.appendFile('log',"response:"+new Boolean(1)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from makePayment Written to log file");}); 
                    response.send(new Boolean(1));
                  });
                }
          });
        });
      });      
    }
 module.exports = makePayment;
