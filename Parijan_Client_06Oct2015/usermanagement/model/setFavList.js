   
   // Include the file responsible for 
   // mysql connection
   var mysql = require('../node_modules/mysql');
   var connection =require('./databaseConnection.js')();

   // Include the file responsible for
   // writing log file
   var fs = require('fs');
   
  /** setFavList() is used to return 
   *  boolean indicating whether the
   *  favorite list has been updated or
   *  not
   *  Input       : An array          
   *  Output      : Boolean
   *  Method type : POST      
   **/

  function setFavList(request,response)
  {
     // If the session is not active then
     // Send the api-status as false
     // and set msg as'login_error'
     if(!(request.session.userName))
     { 
       var responseToSend={};
       responseToSend.apiStatus=false;
       responseToSend.msg='login_error';
         
       // Append the same to the log file
       fs.appendFile('log',"\nAPI:setFavList\nOUTPUT:\n" ,function()
       {
         fs.appendFile('log',"response:"+JSON.stringify(responseToSend)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from setFavList Written to log file");

         // Send the response to the server
         response.send(responseToSend);}); 
       });
     }
     else
     {
       // Delete the previous fav_list entries for
       // the customer
       connection.query("DELETE FROM project.fav_list WHERE customerid = "+request.session.userName,function(err, rows,result){
     
     
         // Once the favorite list of the customer is 
         // known,insert the same into fav_list table
         // Data before sending to the server
         fs.appendFile('log',"\n URL :/seeFavourites - API NAME :setFavList  METHOD TYPE : POST" ,function()
         {
           // Once the API's details are logged now append the input and output information for the same file
           fs.appendFile('log',"\nINPUT:\n" ,function()
           {
             fs.appendFile('log',"vendorArray:"+request.body.vendorArray,function()
             {

                // Prepare the query statement
                var part1="REPLACE INTO project.fav_list VALUES";
                if(request.body.vendorArray==undefined)
                {
                  // Do Nothing if none of the vendors are selected
                  // it would later send a false,so do nothing here
                  // otherwise prepare the query
                }
                else
                {
                  request.body.vendorArray.forEach(function(item) {
                    part1=part1+" ('"+item+"','"+request.session.userName+"'),"
                  });
                }
               // Connect to the DB and insert the same in fav_list table
               connection.query(part1.slice(0,-1),function(err, rows,result)
               {
                  if(err)
                  {
                    // Once the API's details are logged now append the input and output information for the same file
                    fs.appendFile('log',"\nOUTPUT:\n" ,function()
                    {
                      fs.appendFile('log',"response:"+new Boolean(0)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from setFavList Written to log file");}); 
                      response.send(new Boolean(0));
                    });
                  }
                  else
                 { 

                   fs.appendFile('log',"\nOUTPUT:\n" ,function()
                   {
                     fs.appendFile('log',"response:"+new Boolean(1)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from setFavList Written to log file");}); 
                     response.send(new Boolean(1));
                   });
                 }
             });
         });
       });
     });
   });
 }
}
 module.exports = setFavList;
