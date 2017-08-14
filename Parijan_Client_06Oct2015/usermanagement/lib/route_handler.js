
  // Include model
  var get_List=require('../model/get_List');
  var checkSession=require('../model/checkSession');
  var validateUserWithoutview=require('../model/validateUserWithoutview');
  var unsetSession=require('../model/unsetSession');
  var getServiceTypeList=require('../model/getServiceTypeList');
  var getVendorDetails=require('../model/getVendorDetails');
  var getVendorList=require('../model/getVendorList');
  var generate_OTP=require('../model/generate_OTP');
  var validate_OTP=require('../model/validate_OTP');
  var getFavList=require('../model/getFavList');
  var displayVendorsList=require('../model/displayVendorsList');
  var setFavList=require('../model/setFavList');
  var getInboxData=require('../model/getInboxData');
  var sendServiceRequest=require('../model/sendServiceRequest');
  var getTransactionDetails=require('../model/getTransactionDetails');
  var getAddress=require('../model/getAddress');
  var logout=require('../model/logout');
  var getConfirmedVendors=require('../model/getConfirmedVendors');
  var openDispute=require('../model/openDispute');
  var cancelRequest=require('../model/cancelRequest');
  var sendEstimate=require('../model/sendEstimate');
  var getLoginStatus=require('../model/getLoginStatus');
  var rescheduleDeal=require('../model/rescheduleDeal');
  var cancelDeal=require('../model/cancelDeal');
  var vendors=require('../model/vendors');
  var bookVendor=require('../model/bookVendor');
  var generateInvoice=require('../model/generateInvoice');
  var getRatings=require('../model/getRatings');
  var makePayment=require('../model/makePayment');
 
  var userName;
  // Include the file responsible for 
  // mysql connection
  var mysql = require('../node_modules/mysql');
  var connection =require('../model/databaseConnection.js')();

  // Include the file responsible for
  // writing log file
  var fs = require('fs');

  // Define a method that must be exported
  // input the express object "app" 
  module.exports = function (app) 
  {
    
    // Once the login page is submitted
    // validate the login details   
    app.post('/login',function(request,response)
    {
     
      // Store the userName
      userName=request.body.userName;
       
      // Call the validate user function
      // by passing the username and
      // password entered
      validateUserWithoutview(request.body.userName,request.body.password,response,request);

      //getVendorList(request,response);

     

      
    });


    // Initially display the login page
    // without any status message
    app.get('/',function(request,response)
    {
      
      response.render('index.html', {messag:' '});
       
    });
    
    app.get('/getServiceTypeList',function(request,response)
    {
       getServiceTypeList(request,response);

    });
    app.post('/',function(request,response)
    {
     
      // Store the userName
      userName=request.body.userName;
       
      // Call the validate user function
      // by passing the username and
      // password entered
      validateUser(request.body.userName,request.body.password,response,request);

      
      
    });

    
    
    app.get('/logout',function(request,response)
    {

      // destroy the session before redirecting 
      // to login page ,that is if the user is
      // logged in
      logout(request,response);

    });

      app.get('/get_List',function(request,response)
    {
      var user=get_List(request,response);

    });

    app.post('/getServiceType',function(request,response)
    {
       getServiceType(request,response);

    });

     app.post('/getVendorDetails',function(request,response)
    {
       getVendorDetails(request,response);

    });
    
    app.get('/getVendorDetails',function(request,response)
    {
       response.render('getVendorDetails.html');

    });

    app.get('/getVendorList',function(request,response)
    {
      
      response.render('getVendorList.html');
       
    });

    app.post('/getVendorList',function(request,response)
    {
       getVendorList(request,response);

    });

    app.get('/generate_OTP',function(request,response)
    {
      // Display the form which allows the
      // customer to register
      response.render('generate_OTP.html');
       
    });

    app.post('/generate_OTP',function(request,response)
    {
      // Call the method that generates OTP
      generate_OTP(request,response);
    });
    
    app.get('/validate_OTP',function(request,response)
    {
      // Display the form which allows to
      // enter the OTP
      response.render('validate_OTP.html');
       
    });

    app.post('/validate_OTP',function(request,response)
    {
      // Call the method that validates OTP
      validate_OTP(request,response);
    });

    app.get('/getFavList',function(request,response)
    {
      response.render('getFavList.html');
       
    });
  
    app.post('/getFavList',function(request,response)
    {
      // Call the method that gets the favorite list
      getFavList(request,response);
    });

    app.get('/seeFavourites',function(request,response)
    {
      response.render('2.html');
       
    });

    app.get('/displayVendorsList',function(request,response)
    {
      // Call the method that gets the entire vendors list
      displayVendorsList(request,response);
    });

    app.post('/setFavList',function(request,response)
    {
      // Call the method that gets the entire vendors list
      setFavList(request,response);
    });
   
    app.get('/getInboxData',function(request,response)
    {
      // Render the html file which can be used to enter
      // Page size and Page Number
      response.render('getInboxData.html');
    });
    
    app.post('/getInboxData',function(request,response)
    {
      // Call getInboxData
      getInboxData(request,response);
    });
     
    app.get('/sendServiceRequest',function(request,response)
    {
      // Render the html file which can be used to 
      // select vendors
      response.render('sendServiceRequest.html');
    });


    app.post('/sendServiceRequest',function(request,response)
    {
      // Call sendServiceRequest
      sendServiceRequest(request,response);
    });

    app.get('/getTransactionDetails',function(request,response)
    {
      // Render the html file which can be used to 
      // select vendors
      response.render('getTransactionDetails.html');
    });

    app.post('/getTransactionDetails',function(request,response)
    {
      // Call getTransactionDetails
      getTransactionDetails(request,response);
    });

    app.get('/getAddress',function(request,response)
    {
      // Render the html file which can be used to 
      // enter Area Pin-Code
      response.render('getAddress.html');
    });
    
    app.post('/getAddress',function(request,response)
    {
      // Call getAddress
      getAddress(request,response);
    });
        
    app.get('/getConfirmedVendors',function(request,response)
    {
      // Render the html file which can be used to 
      // enter Transaction-Id
      response.render('getConfirmedVendors.html');
    });

    app.post('/getConfirmedVendors',function(request,response)
    {
      // Call getConfirmedVendors
      getConfirmedVendors(request,response);
    });

    app.get('/openDispute',function(request,response)
    {
      // Render the html file which can be used to 
      // enter Transaction-Id and Remarks
      response.render('openDispute.html');
    });

    app.post('/openDispute',function(request,response)
    {
      // Call openDispute
      openDispute(request,response);
    });

    app.get('/cancelRequest',function(request,response)
    {
      // Render the html file which can be used to 
      // enter Transaction-Id and Remarks
      response.render('cancelRequest.html');
    });

    app.post('/cancelRequest',function(request,response)
    {
      // Call cancelRequest
      cancelRequest(request,response);
    });

    app.get('/sendEstimate',function(request,response)
    {
      // Render the html file which can be used to 
      // enter Transaction-Id and Estimate-Amount
      response.render('sendEstimate.html');
    });

   app.post('/sendEstimate',function(request,response)
    {
      // Call sendEstimate
      sendEstimate(request,response);
    });

    app.get('/getLoginStatus',function(request,response)
    {
      // Get Login-status
      getLoginStatus(request,response);
    });

    app.get('/rescheduleDeal',function(request,response)
    {
      // Reschedule the deal
      response.render('rescheduleDeal.html');
    });

    app.post('/rescheduleDeal',function(request,response)
    {
      // Call rescheduleDeal
      rescheduleDeal(request,response);
    });

    app.get('/cancelDeal',function(request,response)
    {
      // Render the html file which can be used to 
      // enter Transaction-Id and reason
      response.render('cancelDeal.html');
    });

    app.post('/cancelDeal',function(request,response)
    {
      // Call cancelDeal
      cancelDeal(request,response);
    });

    app.get('/confirmDeal',function(request,response)
    {
      // Render the html file which can be used to 
      // enter Transaction-Id and Vendor-Id
      response.render('confirmDeal.html');
    });

    app.post('/confirmDeal',function(request,response)
    {
      // Call confirmDeal
      confirmDeal(request,response);
    });
    
    app.get('/bookVendor',function(request,response)
    {
      // Render the html file which can be used to 
      // book just one of the vendor
      response.render('bookOneVendor.html');
    });

    app.post('/vendors',function(request,response)
    {
      // Call vendors
      vendors(request,response);
    });

    app.post('/bookVendor',function(request,response)
    {
      // Call bookVendor
      bookVendor(request,response);
    });

    app.get('/generateInvoice',function(request,response)
    {
      // Render the html file which can be used to 
      // generate Invoice
      response.render('generateInvoice.html');
    });

    app.post('/generateInvoice',function(request,response)
    {
      // Call generateInvoice
      generateInvoice(request,response);
    });

    app.get('/getRatings',function(request,response)
    {
      // Render the html file which can be used to 
      // enter ratings
      response.render('getRatings.html');
    });


    app.post('/getRatings',function(request,response)
    {
      // Call getRatings
      getRatings(request,response);
    });

    app.get('/makePayment',function(request,response)
    {
      // Render the html file which can be used to 
      // enter ratings
      response.render('makePayment.html');
    });

    app.post('/makePayment',function(request,response)
    {
      // Call makePayment
      makePayment(request,response);
    });
   
     
  }
