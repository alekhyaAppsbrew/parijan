   
   // Include the file responsible for 
   // mysql connection
   var mysql = require('../node_modules/mysql');
   var connection =require('./databaseConnection.js')();

   // Include the file responsible for
   // writing log file
   var fs = require('fs');
   
  /** getServiceTypeList() is used to return 
   *  unique array based on role 
   *  Input       : A reference to the response object  
   *  Output      : It just returns a unique arrray as response for now  
   *  Method type : POST      
   **/

  function getServiceTypeList(request,response)
  {
       // Data before sending to the server
       fs.appendFile('log',"\n URL :/getServiceTypeList - API NAME :getServiceTypeList  METHOD TYPE : GET" ,function()
       {
         // Once the API's details are logged now append the input and output information for the same file
         fs.appendFile('log',"\nINPUT:\n" ,function()
         {
           fs.appendFile('log',"NO INPUT FOR THIS MODULE",function()
           {
              // Connect to the DB and extract an unique array which contains vendor's skill
              connection.query("SELECT DISTINCT skill  FROM project.vendor ",function(err, rows,result)
              {
                if(err)
                {
                  // Display the error message,if the connection fails
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
                    array.push(rows[i].skill);
                  }

                  // Once the API's details are logged now append the input and output information for the same file
                  fs.appendFile('log',"\nOUTPUT:\n" ,function()
                  {
                    fs.appendFile('log',"response:"+JSON.stringify(array)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from getServiceTypeList Written to log file");}); 
                  });

                  response.send(array);
         
                }
              });
           }); 
         });
       });
     }
 module.exports =getServiceTypeList;
