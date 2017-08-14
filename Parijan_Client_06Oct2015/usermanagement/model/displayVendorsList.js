   
   // Include the file responsible for 
   // mysql connection
   var mysql = require('../node_modules/mysql');
   var connection =require('./databaseConnection.js')();

   // Include the file responsible for
   // writing log file
   var fs = require('fs');
   
  /** displayVendorsList() is used to return 
   *  the entire list of vendors
   *  Input       : Nil           
   *  Output      : List of vendors
   *  Method type : POST      
   **/

  function displayVendorsList(request,response)
  {

      // Prepare the query statement
      var part1 ='SELECT vendorid FROM project.vendor';
     
      // Data before sending to the server
      fs.appendFile('log',"\n URL :/displayVendorsList - API NAME :displayVendorsList  METHOD TYPE : POST" ,function()
      {
        // Once the API's details are logged now append the input and output information for the same file
        fs.appendFile('log',"\nINPUT:\n" ,function()
        {
          fs.appendFile('log',"Nill",function()
          {
            // Connect to the DB and extract certain details
            // of the vendor
            connection.query(part1,function(err, rows,result)
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

               // Once the entire list of vendors are available
               // extract the favourite vendors for that customer
               // in specific
               connection.query("SELECT vendorid FROM project.fav_list WHERE customerid="+request.session.userName,function(err, favoriteRows,result)
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
                   console.log(favoriteRows);
                   var responseObj = {};
                   responseObj["favouriteVendors"] = favoriteRows;
                   responseObj["entireVendors"] = rows;
                  // Once the API's details are logged now append the input and output information for the same file
                  fs.appendFile('log',"\nOUTPUT:\n" ,function()
                  {

                    fs.appendFile('log',"response:"+JSON.stringify(responseObj)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from displayVendorsList Written to log file");}); 
                  });
               
                  // Send the response to the server
                  response.send(JSON.stringify(responseObj));
                }
              });
             }
           });
         });
       });
     });
 }
 module.exports = displayVendorsList;
