
   // Include the file responsible for 
   // mysql connection
   var mysql = require('../node_modules/mysql');
   var connection =require('./databaseConnection.js')();

   // Include the file responsible for
   // writing log file
   var fs = require('fs');
   
  /** generate_OTP is used to register
   *  customer and generate OTP
   *  Input : A reference to the response object  
   *  Output: A json object which contains
   *          customer-details along with the OTP
   *          generated
   **/

  function generate_OTP(request,response)
  {
    // Generate OTP(A random 5 digit number)
    // The smallest 5 digit number is 10000, the largest is 99999, or 10000+89999.
    // Return a random number between 0 and 89999, and add it to the minimum.
    var otp=10000+Math.round(Math.random()*90000);
 
    // Data before sending to the server
    fs.appendFile('log',"\n URL :/generate_OTP - API NAME :generate_OTP  METHOD TYPE : POST"+"\nINPUT:\n" ,function()
    {
      fs.appendFile('log',"firstname:"+request.body.firstname+"\nlastname:"+request.body.lastname+"\nmobilenumber:"+request.body.mobilenumber+"\npassword:"+request.body.password,function()
      {
        // Connect to the DB and insert the customer details
        connection.query("INSERT INTO project.customer (mobilenumber,lastname,firstname,password,otp) VALUES ('"+request.body.mobilenumber+"','"+request.body.lastname+"','"+request.body.firstname+"','"+request.body.password+"','"+otp+"');",function(err, rows,result)
        {
          // Prepare the object that must be sent as response
          var output = {otp:otp, mobilenumber:request.body.mobilenumber};

          // Start the session 
          request.session.userName =request.body.mobilenumber;

          if(err)
          {
            // Display the error message,if the connection fails
            console.log(err.message);
            response.send(err.message);
            response.end();
          }
          else
          {
          
            // Once the API's details are logged now append the input and output information for the same file
            fs.appendFile('log',"\nOUTPUT:\n" ,function()
            {
              fs.appendFile('log',"response:"+JSON.stringify(output)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from generate_OTP Written to log file");}); 
            });
            response.send(output);
          }
        });
      }); 
    });
  }
 module.exports =generate_OTP;
