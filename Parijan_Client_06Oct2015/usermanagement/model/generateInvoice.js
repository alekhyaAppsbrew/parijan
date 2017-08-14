   
   // Include the file responsible for 
   // mysql connection
   var mysql = require('../node_modules/mysql');
   var connection =require('./databaseConnection.js')();

   // Include the file responsible for
   // writing log file
   var fs = require('fs');
   
  /** generateInvoice () is used to update
   *  the staus as "WORK_COMPLETED" and generate
   *  docImage for invoice
   *  Input       : 1.transactionId[Transaction-Id]
   *  Output      : 1.API status
   *  Method type : POST      
   **/

  function generateInvoice(request,response)
  {
    // Data before sending to the server
    fs.appendFile('log',"\n URL :/generateInvoice - API NAME :generateInvoice  METHOD TYPE : POST"+"\nINPUT:\n" ,function()
    {
      fs.appendFile('log',"transactionId:"+request.body.transactionId,function()
      {        
        // Update the new status as BOOKED and the new Vendor-List,only the first element is taken because
        // from this stage on wards only one vendor will be present
        connection.query("UPDATE project.inboxData SET docImage=CONCAT('img/invoice_thumbnail_','"+request.body.transactionId+"','.jpg'), status='WORK_COMPLETED' WHERE transactionId='"+request.body.transactionId+"';",function(err, rows,result)   
        {
           // If there was an error then send false
           if(err)
           {
              // Once the API's details are logged now append the input and output information for the same file
              fs.appendFile('log',"\nOUTPUT:\n" ,function()
              {
                fs.appendFile('log',"response:"+new Boolean(0)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from bookOneVendor Written to log file");}); 
                response.send(new Boolean(0));
              });
           }
           else
           {
             // Obtain the ratings given by that customer for that transaction
             connection.query("SELECT myRatings FROM project.inboxData WHERE transactionId='"+request.body.transactionId+"';",function(err,rowsRatings,result)
             {
               // Check If ratings are null or not
               if(rowsRatings[0].myRatings!=null)
               {

               }
               
             });            

             // Once the API's details are logged now append the input and output information for the same file
             fs.appendFile('log',"\nOUTPUT:\n" ,function()
             {
               fs.appendFile('log',"response:"+new Boolean(1)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from bookOneVendor Written to log file");}); 
               response.send(new Boolean(1));
             });
           }
         });
       });
    });      
  }
 module.exports = generateInvoice;
