   
   // Include the file responsible for 
   // mysql connection
   var mysql = require('../node_modules/mysql');
   var connection =require('./databaseConnection.js')();

   // Include the file responsible for
   // writing log file
   var fs = require('fs');
   
  /** getTransactionDetails () is used to return 
   *  entire details of a single transaction
   *  whose transaction id is taken as input
   *  Input       : 1.transactionId
   *  Output      : 1.API status
   *                2.Json Array containing details(depends on the status) of the transaction whose ID is taken as input
   *  Method type : POST      
   **/

  function getTransactionDetails(request,response)
  {

      // Prepare the query statement
      var part1 ='SELECT * FROM project.inboxData WHERE transactionId =';
      var part2 =request.body.transactionId;
      part3=part1+"'"+part2+"'"+';';

      // Data before sending to the server
      fs.appendFile('log',"\n URL :/getTransactionDetails - API NAME :getTransactionDetails  METHOD TYPE : POST" ,function()
      {
        // Once the API's details are logged now append the input and output information for the same file
        fs.appendFile('log',"\nINPUT:\n" ,function()
        {
          fs.appendFile('log',"transactionId:"+request.body.transactionId+"\n",function()
          {
            // First update the readStatus of the transaction
            connection.query("UPDATE project.inboxData SET readStatus=1 WHERE transactionId='"+request.body.transactionId+"';",function(err1, rows1,result1)
            {
               if(err1)
              {
                // Display the error message,if the connection fails
                console.log(err1.message);
                
                // Once the API's details are logged now append the input and output information for the same file
                fs.appendFile('log',"\nOUTPUT:\n" ,function()
                {
                  fs.appendFile('log',"response:"+new Boolean(0)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from getTransactionDetails Written to log file");

                    // Send the response to the server
                    response.send(new Boolean(0));
                  
                  });
                });
              }
            else
            {
              // Connect to the DB and extract certain details
              // of the transaction
              connection.query(part3,function(err, rows,result)
              {
                if(err)
                {
                  // Display the error message,if the connection fails
                  console.log(err.message);
                
                  // Once the API's details are logged now append the input and output information for the same file
                  fs.appendFile('log',"\nOUTPUT:\n" ,function()
                  {
                    fs.appendFile('log',"response:"+new Boolean(0)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from getTransactionDetails Written to log file");

                      // Send the response to the server
                      response.send(new Boolean(0));
                  
                    });
                  });
               }
               else
               {

                  var vendorList=JSON.parse(rows[0].vendorList);
                  // Take only the vendor-ids
                  for(var i in vendorList)
                  {
                    vendorList[i]=vendorList[i].vendorId;
                  }          

                  // Replace [] with() so that IN clause in mysql works
                  vendorList = (JSON.stringify(vendorList)).replace("[", "("); 
                  vendorList = vendorList.replace("]", ")");

                  connection.query("SELECT CONCAT(firstname, ' ', lastname) AS vendorName,vendorid AS vendorId,userRating,cost AS wage FROM project.vendor WHERE vendorid IN"+vendorList,function(err, rowsMapping,result){

                      // Connect to the Database to find out is in the
                      // favorite list of the customer or not
                      connection.query('SELECT vendorid FROM project.fav_list WHERE customerid ='+connection.escape(request.session.userName),function(err1,rowsFromFavlist,resul1)
                      {
             
                        // Prepare the Favorite list 
                        for(var i in rowsMapping)
                        {
              
                          rowsMapping[i].isFavourite=0;

                          // Add the max_rating
                          rowsMapping[i].maxRatings=5;

                          // Add the bookedByVendor
                          rowsMapping[i].bookedByVendor=JSON.parse(rows[0].vendorList)[i].bookedByVendor;
                          rowsMapping[i].estimate=JSON.parse(rows[0].vendorList)[i].estimatedCost;


                          // For every tuple identify if the customer is in
                          // the favorite list or not that is if the
                          // vendor-id is found then it's index would
                          // be greater than zero, but if the indexOf
                          // should work,then the corresponding rows must
                          // be stringified
                          if(JSON.stringify(rowsFromFavlist).indexOf(rowsMapping[i].vendorId) >= 0)
                          {
                 
                             // Change the favlist attribute to 1
                             rowsMapping[i].isFavourite=1;
                           }  
                         }
                         // Once the API's details are logged now append the input and output information for the same file
                         fs.appendFile('log',"\nOUTPUT:\n" ,function()
                         {
                           var responseToSend={};
                           responseToSend.transactionData=rows[0];
 
                           // Delete vendor-List
                          delete responseToSend.transactionData.vendorList;
 
                          // JSON.parse is used because Json stringify cant be used twice
                          responseToSend.transactionData.vendors=rowsMapping;
                          responseToSend.apiStatus=true;

                          // Based on the status,the docImage value must be changed,receiptReceived
                          if(responseToSend.transactionData.status=='SHORT_LISTED')
                          {
                             // Delete the remarks for status "SHORT_LISTED"
                             delete responseToSend.transactionData.remarks;

                             // Delete the docImage for status "SHORT_LISTED"
                             delete responseToSend.transactionData.docImage;

                             // Delete the disputeStatus for status "SHORT_LISTED"
                             delete responseToSend.transactionData.disputeStatus;

                             // Delete the myRatings for status "SHORT_LISTED"
                             delete responseToSend.transactionData.myRatings;
                           }
                           else if(responseToSend.transactionData.status=='BOOKED')
                           {
                             // Delete the remarks for status "BOOKED"
                             delete responseToSend.transactionData.remarks;

                              // Delete the docImage for status "BOOKED"
                              delete responseToSend.transactionData.docImage;
                    
                              // Delete the disputeStatus for status "BOOKED"
                              delete responseToSend.transactionData.disputeStatus;
           
                               // Delete the myRatings for status "BOOKED"
                               delete responseToSend.transactionData.myRatings;

                               // In "BOOKED" status vendors array is deleted
                               // before deleting, the details present(except bookedByVendor) must 
                               // be copied directly to response
                               responseToSend.transactionData.vendorName=responseToSend.transactionData.vendors[0].vendorName;
                               responseToSend.transactionData.vendorId=responseToSend.transactionData.vendors[0].vendorId;
                               responseToSend.transactionData.userRating=responseToSend.transactionData.vendors[0].userRating;
                               responseToSend.transactionData.wage=responseToSend.transactionData.vendors[0].wage;
                               responseToSend.transactionData.isFavourite=responseToSend.transactionData.vendors[0].isFavourite;
                               responseToSend.transactionData.maxRatings=responseToSend.transactionData.vendors[0].maxRatings;
                               responseToSend.transactionData.estimate=responseToSend.transactionData.vendors[0].estimate;
                               delete responseToSend.transactionData.vendors;

                               // Just randomly assign 0 or 1 to timeElapsed
                               // Correct way of assigning a random number is
                               // Math.floor(Math.random()*(max-min+1)+min);
                               responseToSend.transactionData.timeElapsed=Math.floor(Math.random()*(2)+0);;
                             }
                             else if(responseToSend.transactionData.status=='WORK_COMPLETED')
                             {
                               // Delete the docImage for status "WORK_COMPLETED"
                               // and prepare a new one
                               delete responseToSend.transactionData.docImage;

                               // Delete the areaPinCode for status "WORK_COMPLETED"
                              delete responseToSend.transactionData.areaPinCode;

                              // Delete the address for status "WORK_COMPLETED"
                              delete responseToSend.transactionData.address;

                              // Delete the area for status "WORK_COMPLETED"
                              delete responseToSend.transactionData.area;
                    
                              // Delete the phoneNumber for status "WORK_COMPLETED"
                              delete responseToSend.transactionData.phoneNumber;

                              // Delete the altPhoneNumber for status "WORK_COMPLETED"
                              delete responseToSend.transactionData.altPhoneNumber;

                              // Delete the city for status "WORK_COMPLETED"
                             delete responseToSend.transactionData.city;

                             // Delete the disputeStatus for status "WORK_COMPLETED"
                             delete responseToSend.transactionData.disputeStatus;

                             // Delete the description for status "WORK_COMPLETED"
                             delete responseToSend.transactionData.description;

                             // Delete the vendors for status "WORK_COMPLETED"
                             delete responseToSend.transactionData.vendors;

                             // Add maxRatings
                             responseToSend.transactionData.maxRatings=5;

                             // Check if ratings are null
                             if(responseToSend.transactionData.myRatings==null)
                             {
                                responseToSend.transactionData.docImage="img/invoice_thumbnail_"+responseToSend.transactionData.transactionId+".jpg";
                             }
                             else
                             {
                                responseToSend.transactionData.docImage="img/invoice_"+responseToSend.transactionData.transactionId+".jpg";
                             }
                   
                           }

                           else if(responseToSend.transactionData.status=='TXN_COMPLETED')
                           {
                             // Delete the docImage for status "TXN_COMPLETED"
                             // and prepare a new one
                             delete responseToSend.transactionData.docImage;

                             // Delete the areaPinCode for status "TXN_COMPLETED"
                             delete responseToSend.transactionData.areaPinCode;

                             // Delete the address for status "TXN_COMPLETED"
                             delete responseToSend.transactionData.address;

                             // Delete the area for status "TXN_COMPLETED"
                             delete responseToSend.transactionData.area;
                    
                             // Delete the phoneNumber for status "TXN_COMPLETED"
                            delete responseToSend.transactionData.phoneNumber;

                            // Delete the altPhoneNumber for status "TXN_COMPLETED"
                            delete responseToSend.transactionData.altPhoneNumber;

                            // Delete the city for status "TXN_COMPLETED"
                            delete responseToSend.transactionData.city;

                            // Delete the disputeStatus for status "TXN_COMPLETED"
                            delete responseToSend.transactionData.disputeStatus;

                            // Delete the description for status "TXN_COMPLETED"
                            delete responseToSend.transactionData.description;

                            // Delete the vendors for status "TXN_COMPLETED"
                            delete responseToSend.transactionData.vendors;

                            // Add maxRatings
                            responseToSend.transactionData.maxRatings=5;

                            responseToSend.transactionData.docImage="img/receipt_"+responseToSend.transactionData.transactionId+".jpg";

                            // Just randomly assign 0 or 1 to timeElapsed
                            // Correct way of assigning a random number is
                            // Math.floor(Math.random()*(max-min+1)+min);
                            responseToSend.transactionData.timeElapsed=Math.floor(Math.random()*(2)+0);;
                          }

                          else if(responseToSend.transactionData.status=='DISPUTE')
                          {
                            // Add raisedBy
                            responseToSend.transactionData.raisedBy="User";

                            // In "DISPUTE" status vendors array is deleted
                            // before deleting, the details present(except bookedByVendor) must 
                            // be copied directly to response
                            responseToSend.transactionData.vendorName=responseToSend.transactionData.vendors[0].vendorName;
                            responseToSend.transactionData.vendorId=responseToSend.transactionData.vendors[0].vendorId;
                            responseToSend.transactionData.userRating=responseToSend.transactionData.vendors[0].userRating;
                            responseToSend.transactionData.wage=responseToSend.transactionData.vendors[0].wage;
                            responseToSend.transactionData.isFavourite=responseToSend.transactionData.vendors[0].isFavourite;
                            responseToSend.transactionData.maxRatings=responseToSend.transactionData.vendors[0].maxRatings;
                            responseToSend.transactionData.estimate=responseToSend.transactionData.vendors[0].estimate;
                            delete responseToSend.transactionData.vendors;
                            responseToSend.transactionData.docImage="img/receipt_"+responseToSend.transactionData.transactionId+".jpg";

                            // Delete the disputeStatus,myRatings and description for status "DISPUTE"
                            delete responseToSend.transactionData.disputeStatus;
                            delete responseToSend.transactionData.myRatings;
                          }

                          // CANCEL
                          else if(responseToSend.transactionData.status=='CANCEL')
                          {
                            // Add cancelledBy
                            responseToSend.transactionData.raisedBy="User";

                            delete responseToSend.transactionData.disputeStatus;
                            delete responseToSend.transactionData.myRatings;
                            delete responseToSend.transactionData.docImage;
                          }

                          fs.appendFile('log',"response:"+JSON.stringify(responseToSend)+"\n------------------------------------------------------------------------------",function(){console.log("OUTPUT from getTransactionDetails Written to log file");

                          // Send the response to the server
                          response.send(responseToSend);}); 
                        });
                      });
                    });
                  }
                });
              }
            });
          });
        });
      });
    }
 module.exports = getTransactionDetails;
