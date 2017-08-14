'use strict';

/* Services */
// localhost: "http://10.0.2.2:3004"
//var parijanSerUrl = "http://192.168.43.47:3004";
var parijanSerUrl = "http://localhost:3004";

var loginUrl = parijanSerUrl + "/login";
var getServiceTypeUrl = parijanSerUrl + "/getServiceTypeList";
var getVendorListUrl = parijanSerUrl + "/getVendorList";
var getVendorDetailsUrl = parijanSerUrl + "/getVendorDetails";
var sendServiceRequestUrl = parijanSerUrl + "/sendServiceRequest";
var registerUserUrl = parijanSerUrl + "/generate_OTP";
var validateOTPUrl = parijanSerUrl + "/validate_OTP";
var getInboxDataUrl = parijanSerUrl + "/getInboxData";
var getTransactionDetailsUrl = parijanSerUrl + "/getTransactionDetails";
var getAreaFromPincodeUrl = parijanSerUrl + "/getAreaFromPincode";

var homePage = '/searchvendor';

var numberOfRows = 10;
var gPageSize = 10;
var NETWORK_ERROR = "Network Error!";

var parijanServices = angular.module('parijanServices', ['ngResource', 'ngStorage']);


parijanServices.service('productService', ['$http', '$location', '$localStorage', '$sessionStorage', function($http, $location, $localStorage, $sessionStorage) {
  var srGotoHomePage = true;
  var vendorList = [];
  var vendorTypeList = [];
  var vendorInfo;
  var srSearchVendorCriteria = {};
  var srSelectedVendors = [];

  var srInbox;
  var srTransaction;

  var getVendors = function(){
    return vendorList;
  }

  var getSelectedVendors = function(){
    return srSelectedVendors;
  }

  var chkStatusAndGotoLoginPage = function() {
    if(!$localStorage.loggedIn) {
      srGotoHomePage = true;
      $location.path('/login');
    }
  };

  var gotoRegistrationPage = function() {
    $location.path('/register');
  };

  var logoutUser = function() {
    if($localStorage.loggedIn) {
      // logout call to server
      $localStorage.loggedIn = false;
      $localStorage.username = '';
      alert("You have successfully logged out");
    } else {
      alert("You are not logged in!");
    }
  };

  var performLogout = function(){
    logoutUser();
    // $location.path('/login');
    $location.path(homePage);
  };

  var registerUser = function(firstname, lastname, mobilenumber, password) {
    $http.post(registerUserUrl, {firstname : firstname, lastname : lastname, mobilenumber : mobilenumber, password : password})
      .success(function(response) {
      $location.path('/validateotp');
    }).error(function() {
      alert(NETWORK_ERROR);
      return false;
    });
  };

  var validateRegisterOTP = function(otp){
    $http.post(validateOTPUrl, {otp : otp})
      .success(function(response) {
      if(response) {
        logoutUser();
        gotoSearchVendorPage();
      } else {
        alert("Invalid OTP!");
        $location.path('/validateotp');
      }
    }).error(function() {
      alert(NETWORK_ERROR);
      return false;
    });
  };

  var retrieveServiceType = function() {
    var promise = $http.get(getServiceTypeUrl)
    .success(function(response) {
      vendorTypeList = response;
    }).error(function() {
      alert(NETWORK_ERROR);
    });
    return promise;
  };

  var gotoSearchVendorPage = function() {
    if($localStorage.loggedIn) {
      $http.get(getServiceTypeUrl)
        .success(function(response) {
        vendorTypeList = response;
        $location.path(homePage);
      }).error(function() {
        alert(NETWORK_ERROR);
      });
    } else {
      srGotoHomePage = true;
      $location.path('/login');
    }
  };

  var performLogin = function(userName, password) {
    $http.post(loginUrl, {userName : userName, password : password})
      .success(function(response) {
      if(response) {
        $localStorage.loggedIn = true;
        $localStorage.username = userName;
        // Goto VendorList Page // srSelectedVendors
        if(srGotoHomePage) {
          $location.path(homePage);
        } else {
          $location.path('/vendors');
        }
      } else {
        alert("Login Error!\nInvalid username or password.");
        $localStorage.loggedIn = false;
        $localStorage.username = '';
        $location.path('/login');
      }
      return response;
    }).error(function() {
      alert(NETWORK_ERROR);
      $location.path('/login');
      return false;
    });
  }

  var getVendorTypeList = function() {
    return vendorTypeList;
  };

  var submitServiceType = function(skill, area, areaPinCode, date, time) {
    srSelectedVendors = [];
    // getAreaFromPincodeUrl - Do a POST call to server to get City
    var city = "Bangalore";
    if(areaPinCode == "12345") {
      city = "Chennai";
    } else if(areaPinCode == "1234"){
      city = "Delhi";
    } else if(areaPinCode == "123"){
      city = "Mumbai";
    }

    // TODO: Include Area to POST call
    srSearchVendorCriteria = {skill: skill, area: area, areaPinCode: areaPinCode, date: date, time: time, city: city};
    //alert("srSearchVendorCriteria = "+JSON.stringify(srSearchVendorCriteria));
    $http.post(getVendorListUrl, {skill : skill, numberOfRows : numberOfRows, areaPinCode:areaPinCode, date: date, time: time})
      .success(function(response) {
      vendorList = response;
      $location.path('/vendors');
      return response;
    }).error(function() {
      alert(NETWORK_ERROR);
    });
  };

  var retrieveVendorDetails = function(vendorId){
    $http.post(getVendorDetailsUrl, {vendorId : vendorId})
      .success(function(response) {
      vendorInfo = response[0];
      $location.path('/vendors/:'+vendorInfo);
      return response;
    }).error(function() {
      alert(NETWORK_ERROR);
    });
  }

  var gotoBookServicePage = function(selectedVendors) {
    srSelectedVendors = selectedVendors;

    //------------------------------------------------------------------------------------------------
    // sendServiceRequestUrl

    // return promise;
    //------------------------------------------------------------------------------------------------
    if(!$localStorage.loggedIn) {
      srGotoHomePage = false; // Retrun to vendors page after login
      $location.path('/login');
    } else {
      alert("Moving to bookservice");
      $location.path('/bookservice');

      /*
      //alert("Sent service request to vendors: "+srSelectedVendors);
      var address = "addr_line1"; // TODO: get this data from ContactDetailsPage
      var promise = $http.post(sendServiceRequestUrl, {vendorList : selectedVendors, service : srSearchVendorCriteria.skill, date : srSearchVendorCriteria.date, time : srSearchVendorCriteria.time, areaPinCode : srSearchVendorCriteria.areaPinCode, address: address})
      .success(function(response) {
        alert("You just made a service request to "+selectedVendors.length+" "+srSearchVendorCriteria.skill 
              + "\nCheck Inbox to know the status");
        srSelectedVendors = [];
        srSearchVendorCriteria = {};
        $location.path(homePage);
        return promise;
      }).error(function() {
        alert(NETWORK_ERROR);
        $location.path(homePage);
        return promise;
      });
*/
    }
  };

  var gotoRescheduleTxnPage = function(transactionId) {
    // srSelectedVendors = selectedVendors;

    //------------------------------------------------------------------------------------------------
    // sendServiceRequestUrl

    // return promise;
    //------------------------------------------------------------------------------------------------
    if(!$localStorage.loggedIn) {
      srGotoHomePage = false; // Retrun to vendors page after login
      $location.path('/login');
    } else {
      alert("Moving to Re-schedule page");
      $location.path('/bookservice');

      /*
      //alert("Sent service request to vendors: "+srSelectedVendors);
      var address = "addr_line1"; // TODO: get this data from ContactDetailsPage
      var promise = $http.post(sendServiceRequestUrl, {vendorList : selectedVendors, service : srSearchVendorCriteria.skill, date : srSearchVendorCriteria.date, time : srSearchVendorCriteria.time, areaPinCode : srSearchVendorCriteria.areaPinCode, address: address})
      .success(function(response) {
        alert("You just made a service request to "+selectedVendors.length+" "+srSearchVendorCriteria.skill 
              + "\nCheck Inbox to know the status");
        srSelectedVendors = [];
        srSearchVendorCriteria = {};
        $location.path(homePage);
        return promise;
      }).error(function() {
        alert(NETWORK_ERROR);
        $location.path(homePage);
        return promise;
      });
*/
    }
  };

  var gotoCancelDisputePage = function(action, transactionId, service) {
    if(!$localStorage.loggedIn) {
      srGotoHomePage = true; // Retrun to vendors page after login
      $location.path('/login');
    } else {
      var transaction = {choice: action, transactionId: transactionId, service: service};
      $location.path('/cancelordispute/'+JSON.stringify(transaction));
    }
  };

  var sendAction = function(transaction) {
    if(!$localStorage.loggedIn) {
      srGotoHomePage = true; // Retrun to vendors page after login
      $location.path('/login');
    } else {
      alert("TODO: Server request for '"+transaction.choice+"' for reason :\n" + transaction.reason);
      $location.path(homePage);
    }
  };

  var getVendorDetails = function(){
    return vendorInfo;
  }

  var getServiceRequestDetails = function() {
    // alert("ser: getServiceRequestDetails");

    var serviceRequestData = {};
    serviceRequestData = {
      vendorList : srSelectedVendors,
      service : srSearchVendorCriteria.skill,
      area : srSearchVendorCriteria.area,
      areaPinCode : srSearchVendorCriteria.areaPinCode,
      date : srSearchVendorCriteria.date,
      time : srSearchVendorCriteria.time,
      phoneNumber : $localStorage.username,
      altPhoneNumber : '',
      address1: '',
      city: srSearchVendorCriteria.city
    };
    return serviceRequestData;
  };

  var submitServiceRequest = function(serviceRequestData) {
    // alert("ser: submit service request. serviceRequestData="+JSON.stringify(serviceRequestData));
    if(!$localStorage.loggedIn) {
      srGotoHomePage = false; // Retrun to vendors page after login
      $location.path('/login');
    } else {
      var address = "addr_line1"; // TODO: get this data from ContactDetailsPage
      var promise = $http.post(sendServiceRequestUrl, {vendorList : serviceRequestData.vendorList, service : serviceRequestData.service, date : serviceRequestData.date, time : serviceRequestData.time, area : serviceRequestData.area, areaPinCode : serviceRequestData.areaPinCode, phoneNumber : serviceRequestData.phoneNumber, altPhoneNumber : serviceRequestData.altPhoneNumber, address: serviceRequestData.address1, city:  serviceRequestData.city})
      .success(function(response) {
        alert("You just made a service request to "+srSelectedVendors.length+" "+srSearchVendorCriteria.skill 
              + "\nCheck Inbox to know the status");
        srSelectedVendors = [];
        srSearchVendorCriteria = {};
        $location.path(homePage);
        return promise;
      }).error(function() {
        alert(NETWORK_ERROR);
        $location.path(homePage);
        return promise;
      });

    }
  };

  var retrieveAndGoToInbox = function(pageNo) {
    // alert("SER:: retrieveAndGoToInbox - "+pageNo);
    if(!$localStorage.loggedIn) {
      srGotoHomePage = true;
      $location.path('/login');
      return;
    }
    /*
    var msgList = '[{"transactionId":"kta01163","service":"Carpenter","Date":"22/01/1992","Time":"10:30 AM","Status":"SentRequest","docImage":"img/estimate_001.jpg"},{"transactionId":"kta01167","service":"Plumber","Date":"2/01/1995","Time":"9:00 AM","Status":"SentRequest","docImage":"img/estimate_001.jpg"},{"transactionId":"kta01168","service":"Maid","Date":"2/01/1995","Time":"2:30 PM","Status":"SentRequest","docImage":"img/estimate_001.jpg"},{"transactionId":"kta01169","service":"TV Mechanic","Date":"26/01/1995","Time":"3:00 PM","Status":"SentRequest","docImage":"img/estimate_001.jpg"},{"transactionId":"kta01170","service":"Washing Machine Service","Date":"26/01/1995","Time":"11:00 AM","Status":"PaymentPending","docImage":"img/invoice_001.jpg"},{"transactionId":"kta01171","service":"Carpenter","Date":"26/01/1995","Time":"2:00 PM","Status":"TxnComplete","docImage":"img/receipt_001.jpg"}]';
    srInbox = JSON.parse(msgList);
    $location.path('/inbox');
    */

    var promise = $http.post(getInboxDataUrl, {pageSize : gPageSize, pageNumber : pageNo})
    .success(function(response) {
      if(response.apiStatus) {
        srInbox = response.inboxData;
        //alert("srInbox = "+ JSON.stringify(srInbox));
        $location.path('/inbox');
      } else {
        alert(NETWORK_ERROR); // Unable to fetch inbox data
      }
      return promise;
    }).error(function() {
      alert(NETWORK_ERROR);
    });
    return promise;
  };

  var getInboxData = function(){
    return srInbox;
  };

  var getTransactionInfo = function(transactionId) {
    // alert("SER: getTransactionInfo("+transactionId+")");
    // DEBUG DATA
    var debug_inboxDataStr = '{ "5429":{"transactionData":{"customerId":"676","transactionId":5429,"service":"Programmer","date":"2015-05-02T18:30:00.000Z","time":"00:00:00","status":"SHORT_LISTED","remarks":null,"areaPinCode":"560071","address":"gsbvb jja iiw","estimatedCost":null,"trueCost":null,"area":"jayanagar","phoneNumber":"676","altPhoneNumber":"331666","city":"Bangalore","vendors":[{"vendorName":"Venkat Kanduri","vendorId":"sve01164","userRating":4,"cost":"76$ per hour","isFavourite":1,"maxRatings":5,"bookedByVendor":1},{"vendorName":"Venkat Kanduri","vendorId":"sve01196","userRating":5,"cost":"76$ per hour","isFavourite":0,"maxRatings":5,"bookedByVendor":0},{"vendorName":"V K","vendorId":"sve01198","userRating":2,"cost":"76$ per hour","isFavourite":0,"maxRatings":5,"bookedByVendor":0}],"docImage":""},"apiStatus":true}, "5428":{"transactionData":{"customerId":"676","transactionId":5428,"service":"Programmer","date":"2015-07-01T18:30:00.000Z","time":"00:00:00","status":"BOOKED","remarks":null,"areaPinCode":"1234","address":"#20/36; 1st main","estimatedCost":null,"trueCost":null,"area":"area","phoneNumber":"676","altPhoneNumber":"99965214580","city":"Delhi","vendorName":"V K","vendorId":"sve01198","userRating":2,"cost":"76$ per hour","isFavourite":0,"maxRatings":5,"bookedByVendor":1,"docImage":""},"apiStatus":true}, "5427":{"transactionData":{"customerId":"676","transactionId":5427,"service":"Soft Skills Trainer","date":"2015-04-30T18:30:00.000Z","time":"00:00:00","status":"WORK_COMPLETED","myRatings":"","docImage":"img/invoice_thumbnail_5427.jpg"},"apiStatus":true}, "5426":{"transactionData":{"customerId":"676","transactionId":5426,"service":"Programmer","date":"2015-04-30T18:30:00.000Z","time":"00:00:00","status":"TXN_COMPLETED","remarks":null,"areaPinCode":"567084","address":"#24/35; 4th cross; 10th Main","estimatedCost":null,"trueCost":null,"area":"Doddaballapura","phoneNumber":"676","altPhoneNumber":"4508761005","city":"Bangalore","vendors":[{"vendorName":"Venkat Kanduri","vendorId":"sve01196","userRating":5,"cost":"76$ per hour","isFavourite":0,"maxRatings":5,"bookedByVendor":1}],"docImage":"img/receipt_5426.jpg"},"apiStatus":true}, "5425":{"transactionData":{"customerId":"676","transactionId":5425,"service":"Programmer","date":"2015-04-30T18:30:00.000Z","time":"00:00:00","status":"DISPUTE", "raisedBy":"User","remarks":"Did not come for work. Not receiving phone calls.","areaPinCode":"560081","address":"#1003; Radiant Spencer; Kammasandra Main Road","estimatedCost":null,"trueCost":null,"area":"Electronic City","phoneNumber":"676","altPhoneNumber":"9965310807","city":"Bangalore","vendorName":"Venkat Kanduri","vendorId":"sve01195","userRating":4,"cost":"76$ per hour","isFavourite":0,"maxRatings":5,"bookedByVendor":0,"docImage":"img/receipt_5425.jpg"},"apiStatus":true}, "5424":{"transactionData":{"customerId":"676","transactionId":5424,"service":"Actor","date":"2015-04-30T18:30:00.000Z","time":"00:00:00","status":"CANCELLED", "cancelledBy":"User","remarks":"Estimated cost is very high","areaPinCode":"520080","address":"#1101; 11th Floor; Greater Noida Expressway; Sector 129","estimatedCost":null,"trueCost":null,"area":"Noida","phoneNumber":"676","altPhoneNumber":"9905871050","city":"Bangalore","vendors":[{"vendorName":"Sanjay Dutt","vendorId":"sve01166","userRating":2,"cost":"106$ per hour","isFavourite":0,"maxRatings":5,"bookedByVendor":0},{"vendorName":"Jeniffer Aniston","vendorId":"sve01167","userRating":1,"cost":"106$ per hour","isFavourite":0,"maxRatings":5,"bookedByVendor":1}]},"apiStatus":true}, "5423":{"transactionData":{"customerId":"676","transactionId":5423,"service":"Soft Skills Trainer","date":"2015-04-30T18:30:00.000Z","time":"00:00:00","status":"WORK_COMPLETED","myRatings":3,"docImage":"img/invoice_5423.jpg"},"apiStatus":true}, "5422":{"transactionData":{"customerId":"676","transactionId":5422,"service":"Technical Writer","date":"2015-04-30T18:30:00.000Z","time":"00:00:00","status":"BOOKED","remarks":null,"areaPinCode":"123456","address":"Koramangala","estimatedCost":null,"trueCost":null,"area":"Koramangala","phoneNumber":"676","altPhoneNumber":"9986152690","city":"Bangalore","vendors":[{"vendorName":"Ruso Tibueue","vendorId":"sve01172","userRating":3,"cost":"100$ per hour","isFavourite":0,"maxRatings":5,"bookedByVendor":0}],"docImage":""},"apiStatus":true}, "5410":{"transactionData":{"customerId":"676","transactionId":5410,"service":"Actor","date":"1992-01-21T18:30:00.000Z","time":"12:04:09","status":"WORK_COMPLETED","myRatings":4,"docImage":"img/invoice_5410.jpg"},"apiStatus":true} }';
    var debug_inboxDataJson = JSON.parse(debug_inboxDataStr);

    // getTransactionDetailsUrl
    var promise = $http.post(getTransactionDetailsUrl, {transactionId : transactionId})
    .success(function(response) {
      if(response.apiStatus) {
        srTransaction = response.transactionData;

        // alert("debug_inboxDataJson["+transactionId+"] = "+ JSON.stringify(debug_inboxDataJson[transactionId]));
        //alert("srTransaction = "+ JSON.stringify(srTransaction));

        $location.path('/inbox/:'+srTransaction);
      } else {
        alert(NETWORK_ERROR); // Unable to fetch inbox data
      }
      return promise;
    }).error(function() {
      alert(NETWORK_ERROR);
    });
    return promise;

    /*
    for(var i=0; i<srInbox.length; i++) {
      if(srInbox[i].transactionId == transactionId) {
        srTransaction = srInbox[i];
        $location.path('/inbox/:'+srTransaction);
      }
    }
    */
  };

  var getTransactionDetails = function() {
    return srTransaction;
  };

  var bookDeal = function(transactionId, vendorId) {
    // bookDealUrl - POST
    alert(transactionId + ": Confirm deal with " + vendorId);
  };

  var retrieveAreaFromPincode = function(areaPincode) {
    // getAreaFromPincodeUrl - Do a POST call to server to get City
    var city;
    if(areaPincode == '12345') {
      city = "Chennai"
    } else if(areaPincode == '1234'){
      city = "Delhi"
    } else if(areaPincode == '123'){
      city = "Mumbai"
    } else {
      city = "Bangalore"
    }
    return city;
  };

  return {
    chkStatusAndGotoLoginPage: chkStatusAndGotoLoginPage,
    gotoRegistrationPage: gotoRegistrationPage,
    getVendors: getVendors,
    getSelectedVendors: getSelectedVendors,
    registerUser: registerUser,
    validateRegisterOTP: validateRegisterOTP,
    performLogin: performLogin,
    performLogout: performLogout,
    retrieveServiceType: retrieveServiceType,
    gotoSearchVendorPage: gotoSearchVendorPage,
    getVendorTypeList: getVendorTypeList,
    submitServiceType: submitServiceType,
    retrieveVendorDetails: retrieveVendorDetails,
    gotoBookServicePage: gotoBookServicePage,
    gotoRescheduleTxnPage: gotoRescheduleTxnPage,
    gotoCancelDisputePage: gotoCancelDisputePage,
    sendAction: sendAction,
    getServiceRequestDetails: getServiceRequestDetails,
    submitServiceRequest: submitServiceRequest,
    getVendorDetails: getVendorDetails,
    retrieveAndGoToInbox: retrieveAndGoToInbox,
    getInboxData: getInboxData,
    getTransactionInfo: getTransactionInfo,
    getTransactionDetails: getTransactionDetails,
    bookDeal: bookDeal,
    retrieveAreaFromPincode: retrieveAreaFromPincode
  };

}]);
