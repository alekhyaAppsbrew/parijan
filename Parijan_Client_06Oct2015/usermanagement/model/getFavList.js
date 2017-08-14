   
   // Include the file responsible for 
   // mysql connection
   var mysql = require('../node_modules/mysql');
   var connection =require('./databaseConnection.js')();

   // Include the file responsible for
   // writing log file
   var fs = require('fs');
   
  /** getFavList() is used to return 
   *  the list of vendors who are favorite for that
   *  customer whose id is taken as an input
   *  Input       : A string that indicates the customer-id
   *  Output      : An array of Vendors(an array of vendors).
   *  Method type : POST     
   **/

  function getFavList(request,response)
  {

      // Prepare the query statement
      var part1 ='SELECT vendorid FROM project.fav_list WHERE customerid =';
      var part2 =request.body.customerid;
      
      part5=part1+"'"+part2+"'"+';';

      // Data before sending to the server
      fs.appendFile('log',"\n URL :/getFavList - API NAME :getFavList  METHOD TYPE : POST" ,function()
      {
        // Once the API's details are logged now append the input and output information for the same file
        fs.appendFile('log',"\nINPUT:\n" ,function()
        {
          fs.appendFile('log',"customerid:"+request.body.customerid,function()
          {
            // Connect to the DB and extract certain details
            // of the vendor
            connection.query(part5,function(err, rows,result)
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

               // If there is no error in connecting to DB
               // send the result as response
               var array=[];
               for(var i in rows)
               {
                 array.push(rows[i].vendorid);
               }

               // Once the API's details are logged now append the input and output information for the same file
              fs.appendFile('log',"\nOUTPUT:\n" ,function()
              {
                fs.appendFile('log',"response:"+JSON.stringify(array)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from getFavList Written to log file");}); 
              });
               
               // Send the response to the server
               response.send(array);
             }
           });
         });
       });
     });
 }
 module.exports = getFavList;
