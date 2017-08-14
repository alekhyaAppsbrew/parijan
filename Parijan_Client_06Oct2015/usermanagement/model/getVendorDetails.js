   
   // Include the file responsible for 
   // mysql connection
   var mysql = require('../node_modules/mysql');
   var connection =require('./databaseConnection.js')();

   // Include the file responsible for
   // writing log file
   var fs = require('fs');
   
  /** getVendorDetails () is used to return 
   *  an entire row except vendor's contact details
   *  based on the given request input(which is vendor id)
   *  Input       : A reference to the request object which 
   *                contains vendor -id and a reference
   *                to the response object  
   *  Output      : It returns a row specific to the input 
   *  Method type : POST      
   **/

  function getVendorDetails(request,response)
  {

      // Data before sending to the server
      fs.appendFile('log',"\n URL :/getVendorDetails - API NAME :getVendorDetails  METHOD TYPE : POST" ,function()
      {
        // Once the API's details are logged now append the input and output information for the same file
        fs.appendFile('log',"\nINPUT:\n" ,function()
        {
          fs.appendFile('log',"vendorId:"+request.body.vendorId+"\nrequest.session.userName:"+request.session.userName,function()
          {
            // Connect to the DB and extract all the details(except for contact details)
            // of the vendor
            connection.query('SELECT vendorid,lastname,firstname,password,skill,pan,cost,thumbnailimage,regularimage,userRating FROM project.vendor WHERE vendorid ='+connection.escape(request.body.vendorId),function(err, rows,result)
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
                
                 // Connect to the Database to find out is in the
               // favorite list of the customer or not
               connection.query('SELECT vendorid FROM project.fav_list WHERE customerid ='+connection.escape(request.session.userName),function(err1,rowsFromFavlist,resul1)
              {
             
                // Prepare the Favorite list 
                for(var i in rows)
                {
              
                  rows[i].favlist=0;
                  
                  // Add the max_rating
                  rows[i].max_rating=5;

                  // For every tuple identify if the customer is in
                  // the favorite list or not that is if the
                  // vendor-id is found then it's index would
                  // be greater than zero, but if the indexOf
                  // should work,then the corresponding rows must
                  // be stringified
                  if(JSON.stringify(rowsFromFavlist).indexOf(rows[i].vendorid) >= 0)
                  {
                 
                     // Change the favlist attribute to 1
                     rows[i].favlist=1;
                   }  
                }
    
                // Once the API's details are logged now append the input and output information for the same file
                fs.appendFile('log',"\nOUTPUT:\n" ,function()
                {
                  fs.appendFile('log',"response:"+JSON.stringify(rows)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from getVendorDetails Written to log file");}); 
                });
               
               // Send the response to the server
               response.send(rows);
             });
           }
         });
       }); 
     });
   });
 }
 module.exports = getVendorDetails;
