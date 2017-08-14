   
   // Include the file responsible for 
   // mysql connection
   var mysql = require('../node_modules/mysql');
   var connection =require('./databaseConnection.js')();

   // Include the file responsible for
   // writing log file
   var fs = require('fs');
   
  /** vendors() is used to return 
   *  those vendors whose bookedByVendor 
   *  variable is 1
   *  Input       : transaction-Id         
   *  Output      : List of vendors
   *  Method type : POST      
   **/

  function vendors(request,response)
  {

      // Prepare the query statement
      var part1 ="SELECT vendorList FROM project.inboxData WHERE transactionId='"+request.body.transactionId+"';";
     
      // Data before sending to the server
      fs.appendFile('log',"\n URL :/vendors - API NAME :vendors  METHOD TYPE : POST" ,function()
      {
        // Once the API's details are logged now append the input and output information for the same file
        fs.appendFile('log',"\nINPUT:\n" ,function()
        {
          fs.appendFile('log',"transactionId:"+request.body.transactionId+"\n------------------------------------------------------------------------------",function()
          {
            // Connect to the DB and extract certain details
            // of the vendor
            connection.query(part1,function(err,rows,result)
            {
              if(err)
              {
                // Display the error message,if the connection fails
                console.log(err.message);
                response.send(err.message);
                response.end();
              }
             else
             {
               // First create the object that must be sent as response
               //var responseObj["entireVendors"] = rows;
               console.log(rows);
               
               var rowsTosend=[];
               var parsedRows=JSON.parse(rows[0].vendorList);

               for(var k in parsedRows )
               {
                  // Check if bookedByVendor is one or not
                  if(parsedRows[k].bookedByVendor==1)
                  {
                    rowsTosend.push(parsedRows[k].vendorId);
                  }
                 }

               console.log(rowsTosend+"\n\n");
               // Once the API's details are logged now append the input and output information for the same file
               fs.appendFile('log',"\nOUTPUT:\n" ,function()
               {
                 fs.appendFile('log',"response:"+rowsTosend+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from displayVendorsListNew Written to log file");}); 
               });
               
               // Send the response to the server
               response.send(rowsTosend);
              }
             });
          });
        });
      });
    }
 module.exports=vendors;

