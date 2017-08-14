   
   // Include the file responsible for 
   // mysql connection
   var mysql = require('../node_modules/mysql');
   var connection =require('./databaseConnection.js')();

   // Include the file responsible for
   // writing log file
   var fs = require('fs');
   
  /** getConfirmedVendors() is used to get those
   *  vendors that have confirmed for the deal
   *  (that is those vendors who have agreed to work)
   *  Input       : 1.transactionId(Specifying the transaction-id)
   *  Output      : 1.API status
   *  Method type : POST      
   **/

  function getConfirmedVendors(request,response)
  {
    // Data before sending to the server
    fs.appendFile('log',"\n URL :/getConfirmedVendors - API NAME :getConfirmedVendors  METHOD TYPE : POST"+"\nINPUT:\n" ,function()
    {
      fs.appendFile('log',"transactionId:"+request.body.transactionId,function()
      {
  
           // Get the vendor List pre existing in the Database                 
           connection.query("SELECT vendorList FROM project.inboxData WHERE transactionId = '"+request.body.transactionId+"';",function(err,rows,result)   
           {
            if(err)
            {
              // Once the API's details are logged now append the input and output information for the same file
              fs.appendFile('log',"\nOUTPUT:\n" ,function()
              {
                fs.appendFile('log',"response:"+new Boolean(0)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from getConfirmedVendors Written to log file");}); 
                response.send(new Boolean(0));
              });
            }
             
             // Choose a list of array randomly assuming that
             // those vendors were the ones who responded 
             // For which just randomly choose a number
             // Math.random() returns a value from 0 to 1
             // Max-rowsMapping.length
             // Min-1,parse it before using the vendorList
             // Because it was stringified before insertion
             var number=Math.floor(Math.random() * ((JSON.parse(rows[0].vendorList).length)-1))+1;
             var parsedRows=JSON.parse(rows[0].vendorList);
             var newVendorList=[];

             // Prepare the new vendor-list
             // assuming that they were those
             // who responded
             for(i=0;i<number;i++)
             {
                newVendorList.push(parsedRows[i]);
             }
             console.log(number);
             console.log(newVendorList);
             console.log(rows[0].vendorList);
             // Change the status as well as the vendorList Array
             connection.query("UPDATE project.inboxData SET vendorList='"+JSON.stringify(newVendorList)+"', status='vendorConfirmed' WHERE transactionId='"+request.body.transactionId+"';",function(err,rows,result)   
             {

                // If there was an error then send false
                if(err)
                {
                  // Once the API's details are logged now append the input and output information for the same file
                  fs.appendFile('log',"\nOUTPUT:\n" ,function()
                  {
                    fs.appendFile('log',"response:"+new Boolean(0)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from getConfirmedVendors Written to log file");}); 
                    response.send(new Boolean(0));
                  });
                }
                else
                {
                  // Once the API's details are logged now append the input and output information for the same file
                  fs.appendFile('log',"\nOUTPUT:\n" ,function()
                  {
                    fs.appendFile('log',"response:"+new Boolean(1)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from getConfirmedVendors Written to log file");}); 
                    response.send(new Boolean(1));
                  });
                }
              });
           });
        });
      });      
    }
 module.exports = getConfirmedVendors;
