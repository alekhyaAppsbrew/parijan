   
   // Include the file responsible for 
   // mysql connection
   var mysql = require('../node_modules/mysql');
   var connection =require('./databaseConnection.js')();

   // Include the file responsible for
   // writing log file
   var fs = require('fs');
   
  /** getRatings () is used to input 
   *  the ratings and corespondingly
   *  change ratings in vendors table
   *  Input       : 1.transactionId[Transaction-Id]
   *                2.ratings[ratings given by the customer]
   *  Output      : 1.API status
   *  Method type : POST      
   **/

  function getRatings(request,response)
  {
    // Inserting all the ratings details into inboxData table 
    // Data before sending to the server
    fs.appendFile('log',"\n URL :/getRatings - API NAME :getRatings  METHOD TYPE : POST"+"\nINPUT:\n" ,function()
    {
      fs.appendFile('log',"transactionId:"+request.body.transactionId+"\nratings:"+request.body.ratings,function()
      {        
           connection.query("UPDATE project.inboxData SET myRatings='"+request.body.ratings+"' WHERE transactionId='"+request.body.transactionId+"';",function(err, rows,result)   
           {
                // If there was an error then send false
                if(err)
                {
                  // Once the API's details are logged now append the input and output information for the same file
                  fs.appendFile('log',"\nOUTPUT:\n" ,function()
                  {
                    fs.appendFile('log',"response:"+new Boolean(0)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from getRatings Written to log file");}); 
                    response.send(new Boolean(0));
                  });
                }
                else
                {
                  // First get the vendor-Id
                  connection.query("SELECT vendorList FROM project.inboxData WHERE transactionId='"+request.body.transactionId+"';",function(err, rows1,result) 
                  {
                    var vendorId;
                    // If there was an error then send false
                    if(err)
                    {
                      // Once the API's details are logged now append the input and output information for the same file
                      fs.appendFile('log',"\nOUTPUT:\n" ,function()
                      {
                        fs.appendFile('log',"response:"+new Boolean(0)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from getRatings Written to log file");}); 
                        response.send(new Boolean(0));
                      });
                    }
                    else
                    {
                      vendorId=JSON.parse(rows1[0].vendorList)[0].vendorId;
                      
                      // Update the ratings given by the user in corresponding vendor table
                      // Since we dont know the count for average,the new value can be added to the
                      // existing average and divide by 2
                      connection.query("UPDATE project.vendor SET userRating=(userRating+"+request.body.ratings+") DIV 2  WHERE vendorId='"+vendorId+"';",function(err, rows,result)
                     {
                       if(err)
                       {
                         // Once the API's details are logged now append the input and output information for the same file
                         fs.appendFile('log',"\nOUTPUT:\n" ,function()
                         {
                           fs.appendFile('log',"response:"+new Boolean(0)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from getRatings Written to log file");}); 
                           response.send(new Boolean(0));
                         });
                       }
                       else
                       {
                         // Once the API's details are logged now append the input and output information for the same file
                         fs.appendFile('log',"\nOUTPUT:\n" ,function()
                         {
                            fs.appendFile('log',"response:"+new Boolean(1)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from getRatings Written to log file");}); 
                            response.send(new Boolean(1));
                         });
                       }
 
                     }); 
                    }
                  });
                }
          });
        });
      });      
    }
 module.exports = getRatings;
