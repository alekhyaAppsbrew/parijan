   
   // Include the file responsible for 
   // mysql connection
   var mysql = require('../node_modules/mysql');
   var connection =require('./databaseConnection.js')();

   // Include the file responsible for
   // writing log file
   var fs = require('fs');
   
  /** sendServiceRequest () is used to update
   *  the service-request details made by the 
   *  customer
   *  Input       : 1.vendorList[An array of vendor ids selected]
   *                2.service[Type of Service]
   *                3.date[Date of request]
   *                4.time[Time of request]
   *                5.areaPinCode[pincode given by the customer]
   *                6.address[Address given by the customer]
   *                7.area[Area(of work) as given by the customer]
   *                8.phoneNumber[phoneNumber(of work) as given by the customer]
   *                9.altPhoneNumber[altPhoneNumber(of work) as given by the customer]
   *                10.city[city(of work) as given by the customer]
   *  Output      : 1.API status
   *  Method type : POST      
   **/

  function sendServiceRequest(request,response)
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
      fs.appendFile('log',"\nAPI:sendServiceRequest\nOUTPUT:\n" ,function()
      {
        fs.appendFile('log',"response:"+JSON.stringify(responseToSend)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from sendServiceRequest Written to log file");

        // Send the response to the server
        response.send(responseToSend);}); 
      });
    }
    else
    {
      // Inserting all the request details into inboxData table 
      // Data before sending to the server
      fs.appendFile('log',"\n URL :/sendServiceRequest - API NAME :sendServiceRequest  METHOD TYPE : POST"+"\nINPUT:\n" ,function()
      {
        fs.appendFile('log',"vendorList:"+request.body.vendorList+"\ndate:"+request.body.date+"\ntime:"+request.body.time+"\nareaPinCode:"+request.body.areaPinCode+"\naddress:"+request.body.address+"\nservice:"+request.body.service+"\narea:"+request.body.area+"\nphoneNumber:"+request.body.phoneNumber+"\naltPhoneNumber:"+request.body.altPhoneNumber+"\ncity:"+request.body.city+"\ndescription:"+request.body.description,function()
        {

          var vendorListOld=[];
          var vendorListNew=[];
          var addressNew=[];
      
          // Prepare the new Address along with the pincode
          addressNew.push({address:request.body.address,areaPinCode:request.body.areaPinCode});
          
          vendorListOld= request.body.vendorList; 
          console.log(vendorListOld);

          // Prepare the vendorList
          for (var i in vendorListOld)
          {
            // Update the new vendorList with estimatedCost being NULL and bookedByVendor as '0'
            vendorListNew.push({vendorId: vendorListOld[i], estimatedCost: null,bookedByVendor:0,docImage:null});
          }
             
          // Connect to the DB and insert the service request details details
          // Auto generating the transaction-id in mysql
          connection.query("INSERT INTO project.inboxData (customerId,service,date,time,status,vendorList,areaPinCode,address,area,phoneNumber,altPhoneNumber,city,description) VALUES ('"+request.session.userName+"','"+request.body.service+"','"+request.body.date+"','"+request.body.time+"','SHORT_LISTED','"+JSON.stringify(vendorListNew)+"','"+request.body.areaPinCode+"','"+request.body.address+"','"+request.body.area+"','"+request.body.phoneNumber+"','"+request.body.altPhoneNumber+"','"+request.body.city+"','"+request.body.description+"');",function(err, rows,result)
          {
             if(err)
             {
               // If there is an error in DB connection then send false as API status
               console.log(err.message);
               // console.log(vendorList);

               // Once the API's details are logged now append the input and output information for the same file
               fs.appendFile('log',"\nOUTPUT:\n" ,function()
               {
                 fs.appendFile('log',"response:"+new Boolean(0)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from sendServiceRequest Written to log file");}); 
                 response.send(new Boolean(0));
               });
             }
           else
           {
              // Update the customer's address
              connection.query("UPDATE project.customer SET address=CONCAT(address,'\,','"+ JSON.stringify(addressNew)+"') WHERE mobilenumber='"+request.session.userName+"';",function(err)
              {
                // If there is an error in inserting send false as the API status
                if(err)
                {
                   // If there is an error in DB connection then send false as API status
                   console.log(err.message);
                   // Once the API's details are logged now append the input and output information for the same file
                   fs.appendFile('log',"\nOUTPUT:\n" ,function()
                   {
                      fs.appendFile('log',"response:"+new Boolean(0)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from sendServiceRequest Written to log file");}); 
                      response.send(new Boolean(0));
                   });
                 }
                 else
                 {
                    // Once the API's details are logged now append the input and output information for the same file
                    fs.appendFile('log',"\nOUTPUT:\n" ,function()
                    {
                      fs.appendFile('log',"response:"+new Boolean(1)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from sendServiceRequest Written to log file");}); 
                      response.send(new Boolean(1));
                    });  
                  }
                });
              }
            });
          }); 
        });
      }
    }
 module.exports = sendServiceRequest;
