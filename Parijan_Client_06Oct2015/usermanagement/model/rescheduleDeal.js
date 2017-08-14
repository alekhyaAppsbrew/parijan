   
   // Include the file responsible for 
   // mysql connection
   var mysql = require('../node_modules/mysql');
   var connection =require('./databaseConnection.js')();

   // Include the file responsible for
   // writing log file
   var fs = require('fs');
   
  /** rescheduleDeal () is used to reschedule 
   *  Deal
   *  Input       : 1.transactionId[Transaction-Id]
   *                2.date[New Date]
   *                3.time[New Time]
   *  Output      : 1.API status
   *  Method type : POST      
   **/

  function rescheduleDeal(request,response)
  {
    // Data before sending to the server
    fs.appendFile('log',"\n URL :/rescheduleDeal - API NAME :rescheduleDeal  METHOD TYPE : POST"+"\nINPUT:\n" ,function()
    {
      fs.appendFile('log',"transactionId:"+request.body.transactionId+"\ndate:"+request.body.date+"\ntime:"+request.body.time,function()
      {        
           // Without changing the status make all the booked by vendor variables as'0'
           connection.query("SELECT vendorList FROM project.inboxData  WHERE transactionId='"+request.body.transactionId+"';",function(err, rows1,result)
           {
             if(err)
             {
               // Once the API's details are logged now append the input and output information for the same file
               fs.appendFile('log',"\nOUTPUT:\n" ,function()
               {
                  fs.appendFile('log',"response:"+new Boolean(0)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from rescheduleDeal Written to log file");}); 
                  response.send(new Boolean(0));
               });
             }
 
             else
             {
               var vendorList=JSON.parse(rows1[0].vendorList)
               for(var i in vendorList)
               {
                 vendorList[i].bookedByVendor=0;
               }
      
               connection.query("UPDATE project.inboxData SET date='"+request.body.date+"', time='"+request.body.time+"', vendorList='"+JSON.stringify(vendorList)+"' WHERE transactionId='"+request.body.transactionId+"';",function(err, rows,result)   
           {
             // If there was an error then send false
                if(err)
                {
                  console.log(err.message);
                  // Once the API's details are logged now append the input and output information for the same file
                  fs.appendFile('log',"\nOUTPUT:\n" ,function()
                  {
                    fs.appendFile('log',"response:"+new Boolean(0)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from rescheduleDeal Written to log file");}); 
                    response.send(new Boolean(0));
                  });
                }
                else
                {
                  // Once the API's details are logged now append the input and output information for the same file
                  fs.appendFile('log',"\nOUTPUT:\n" ,function()
                  {
                    fs.appendFile('log',"response:"+new Boolean(1)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from rescheduleDeal Written to log file");}); 
                    response.send(new Boolean(1));
                  });
                }
          });
             }
           });          

           
        });
      });      
    }
 module.exports = rescheduleDeal;
