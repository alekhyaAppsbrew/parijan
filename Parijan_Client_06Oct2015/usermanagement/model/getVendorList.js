   
   // Include the file responsible for 
   // mysql connection
   var mysql = require('../node_modules/mysql');
   var connection =require('./databaseConnection.js')();

   // Include the file responsible for
   // writing log file
   var fs = require('fs');
   
  /** getVendorList () is used to return 
   *  certain vendor details of those whose skill set matches
   *  the skills entered by the customer
   *  Input       : 1.skill 
   *                2.areaPinCode
   *                3.date
   *                4.time
   *                5.numberOfRows
   *  Output      : It returns a rows
   *  Method type : POST      
   **/

  function getVendorList(request,response)
  {

      // Prepare the query statement
      var part1 ='SELECT vendorid,lastname,firstname,cost,thumbnailimage,userRating FROM project.vendor WHERE skill =';
      var part2 =request.body.skill;
      /**var part3 ='AND ';
      var part4 ='areaPinCode =';
      var part5 =request.body.areaPinCode;
      var part6 ='AND date =';
      var part7 =request.body.date;
      var part8 ='AND time =';
      var part9 =request.body.time;**/
      var part10 =' LIMIT ';
      var part11 =request.body.numberOfRows;
      //part12=part1+"'"+part2+"'"+part3+part4+"'"+part5+"'"+part6+"'"+part7+"'"+part8+"'"+part9+"'"+part10+part11+';';
      part12=part1+"'"+part2+"'"+part10+part11+';';

      // Data before sending to the server
      fs.appendFile('log',"\n URL :/getVendorList - API NAME :getVendorList  METHOD TYPE : POST" ,function()
      {
        // Once the API's details are logged now append the input and output information for the same file
        fs.appendFile('log',"\nINPUT:\n" ,function()
        {
          fs.appendFile('log',"skill:"+request.body.skill+"\nnumberOfRows:"+request.body.numberOfRows+"\nrequest.session.userName:"+request.session.userName+"\nDebug_areaPinCode:"+request.body.areaPinCode+"  NOTE:areaPinCode was ignored for Debug Purposes"+"\ndate:"+request.body.date+"\ntime:"+request.body.time,function()
          {
            // Connect to the DB and extract certain details
            // of the vendor
            connection.query(part12,function(err, rows,result)
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
                fs.appendFile('log',"response:"+JSON.stringify(rows)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from getVendorList Written to log file");}); 
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
 module.exports = getVendorList;
