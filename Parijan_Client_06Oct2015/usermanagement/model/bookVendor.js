   
   // Include the file responsible for 
   // mysql connection
   var mysql = require('../node_modules/mysql');
   var connection =require('./databaseConnection.js')();

   // Include the file responsible for
   // writing log file
   var fs = require('fs');
   
  /** bookVendor () is used to update
   *  the staus as "BOOKED" and update the vendors
   *  by deleting the rest of the vendors
   *  Input       : 1.transactionId[Transaction-Id]
   *                2.vendorList[Which contains one Vendor-Id]
   *  Output      : 1.API status
   *  Method type : POST      
   **/

  function bookVendor(request,response)
  {
    // Data before sending to the server
    fs.appendFile('log',"\n URL :/bookVendor - API NAME :bookVendor  METHOD TYPE : POST"+"\nINPUT:\n" ,function()
    {
      fs.appendFile('log',"vendorList:"+request.body.vendorList+"\ntransactionId:"+request.body.transactionId,function()
      {        

        // Get the vendorList so that it can be updated
        connection.query("SELECT vendorList FROM project.inboxData WHERE transactionId='"+request.body.transactionId+"';",function(err, rowsMapping,result)   
          {
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
              // Prepare the new Vendor-List
              var vendorListNew=[];
              var parsedRows=JSON.parse(rowsMapping[0].vendorList);
 
              for(var k in parsedRows )
              {
                // Check if the vendor Id matches
                if(parsedRows[k].vendorId==request.body.vendorList)
                {
                   vendorListNew.push(parsedRows[k]);
                }
              }
              
              // Update the new status as BOOKED and the new Vendor-List,only the first element is taken because
              // from this stage on wards only one vendor will be present
              connection.query("UPDATE project.inboxData SET vendorList='"+JSON.stringify(vendorListNew)+"', status='BOOKED' WHERE transactionId='"+request.body.transactionId+"';",function(err, rows,result)   
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
                  // Once the API's details are logged now append the input and output information for the same file
                  fs.appendFile('log',"\nOUTPUT:\n" ,function()
                  {
                    fs.appendFile('log',"response:"+new Boolean(1)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from bookOneVendor Written to log file");}); 
                    response.send(new Boolean(1));
                  });
                }
              });
            }
          });
        });
      });      
    }
 module.exports = bookVendor;
