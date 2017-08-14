   
   // Include the file responsible for 
   // mysql connection
   var mysql = require('../node_modules/mysql');
   var connection =require('./databaseConnection.js')();

   // Include the file responsible for
   // writing log file
   var fs = require('fs');
   
  /** setFavList() is used to set the 
   *  favourite list of that customer 
   *  customer whose id is taken as an input
   *  Input       : A string that indicates the customer-id and
                    an array containg vendors list 
   *  Output      : Boolean.
   *  Method type : POST     
   **/

  function setFavList(request,response)
  {

      // Data before sending to the server
      fs.appendFile('log',"\n URL :/setFavList - API NAME :setFavList  METHOD TYPE : POST" ,function()
      {
        // Once the API's details are logged now append the input and output information for the same file
        fs.appendFile('log',"\nINPUT:\n" ,function()
        {
          fs.appendFile('log',"customerid:"+request.body.customerid+"List Of vendors"+request.body.vendorArray,function()
          {
            // Connect to the DB and extract certain details
            // of the vendor
            async.forEachSeries(request.body.vendorArray,
              connection.query("INSERT INTO project.fav_list VALUES ("+request.body.customerid+","+request.body.vendorArray");",function(err, rows,result)
              {
                if(err)
                {
                  // Display the error message,if the connection fails
                  console.log(err.message);
                  // Once the API's details are logged now append the input and output information for the same file
                  fs.appendFile('log',"\nOUTPUT:\n" ,function()
                  {
                    fs.appendFile('log',"response:"+new Boolean(0)+"\n------------------------------------------------------------------------------",function(){response.send(new Boolean(0));}); 
                  });
                },function(){response.send(new Boolean(1));});
              });
            });
          });
        });
      }
 module.exports = setFavList;
