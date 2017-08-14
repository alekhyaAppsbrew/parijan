'use strict';

/* Controllers */
var parijanControllers = angular.module('parijanControllers', ['ngStorage', 'ui.bootstrap']);

// create angular controller
parijanControllers.controller('RegisterUserCtrl', ['$scope', '$location', '$localStorage', '$sessionStorage', 'productService', function ($scope, $location, $localStorage, $sessionStorage, productService) {

  $scope.$storage = $localStorage;

  $scope.phoneNoList = [
    { number: 9765895201 },
    { number: 8084557382 }
  ];

  if($scope.$storage.firstname == 'done') {
    $location.path('/vendors');
  }

  // Skip the login page ONLY if already logged in.
  $scope.gotoSearchVendorPage = function(){
    productService.gotoSearchVendorPage();
  };

  // function to submit the form after all validation has occurred			
  $scope.submitForm = function () {

    // Set the 'submitted' flag to true
    $scope.submitted = true;

    if ($scope.userForm.$valid) {
      $scope.$storage.firstname = $scope.user.firstname;
      var response = productService.registerUser($scope.user.firstname, $scope.user.lastname, $scope.user.phoneNo.number, $scope.user.password);
    }
    else {
      alert("Please correct errors!");
    }
  };
}]);

// ValidateOTPCtrl: create angular controller
parijanControllers.controller('ValidateOTPCtrl', ['$scope', 'productService', function ($scope, productService) {

  // function to submit the form after all validation has occurred			
  $scope.submitForm = function () {
    // Set the 'submitted' flag to true
    $scope.submitted = true;

    if ($scope.validateOTPForm.$valid) {
      var response = productService.validateRegisterOTP($scope.user.otp);
    }
    else {
      alert("Please correct errors!");
    }
  };
}]);

// LoginCtrl: create angular controller
parijanControllers.controller('LoginCtrl', ['$scope', '$http', 'productService', function ($scope, $http, productService) {
  // function to submit the form after all validation has occurred			
  $scope.submitForm = function () {
    // Set the 'submitted' flag to true
    $scope.submitted = true;
    $scope.loginStatus = productService.performLogin($scope.user.firstname, $scope.user.password);
  };

  $scope.gotoRegistrationPage = function() {
    productService.gotoRegistrationPage();
  };
}]);

// SearchVendorCtrl: create angular controller
parijanControllers.controller('SearchVendorCtrl', ['$scope', '$location', 'productService', function ($scope, $location, productService) {
  //productService.gotoSearchVendorPage();
  productService.retrieveServiceType()
    .success(function(response){
    // Authenticated
    //alert("SearchVendorCtrl:retrieveServiceType: Success \n"+JSON.stringify(response));
    $scope.vendorTypeList = productService.getVendorTypeList();
  }).error(function() {
    // Not Authenticated
    //alert("SearchVendorCtrl:retrieveServiceType: Error " + getServiceTypeUrl);
    $scope.vendorTypeList = [];
  });


  $scope.gotoInbox = function () {
    productService.retrieveAndGoToInbox(1);
  };

  $scope.userLogout = function() {
    productService.performLogout();
  };

  // function to submit the form after all validation has occurred			
  $scope.submitForm = function () {
    // alert("Date="+$scope.vendor.date+"Time="+$scope.vendor.time+", pinCode="+$scope.vendor.pinCode);
    if ($scope.searchVendorForm.$valid) {
      productService.submitServiceType($scope.vendor.vendorType, $scope.vendor.area, $scope.vendor.pinCode, $scope.vendor.date, $scope.vendor.time);
    }
    else {
      alert("Please correct errors!");
    }
  };

}]);

// InboxCtrl: create angular controller
parijanControllers.controller('InboxCtrl', ['$scope', '$location', '$interval', 'productService', function ($scope, $location, $interval, productService) {

  // //--------------------------------------------------------------------------
  // //--- Interval test code START ---//
  // var c=0;
  // $scope.message="This DIV is refreshed "+c+" time.";
  // $interval(function(){
  //   $scope.message="This DIV is refreshed "+c+" time.";
  //   c++;

  //   productService.retrieveAndGoToInbox(1)
  //     .success(function(response){
  //     /// alert("Ctrl: Refresh success!");
  //     $scope.messages = productService.getInboxData();
  //   }).error(function() {
  //     // alert("Network Error");
  //   });

  //   // $scope.messages = productService.getInboxData();
  // },10000);

  // //--- Interval test code END ---//
  // //--------------------------------------------------------------------------

  $scope.messages = productService.getInboxData();

  $scope.getTransactionInfo = function(transactionId) {
    productService.getTransactionInfo(transactionId);
  };

}]);


parijanControllers.controller('TxnDetailCtrl', ['$scope', '$routeParams', 'productService', function($scope, $routeParams, productService) {

  $scope.transaction = productService.getTransactionDetails();

  $scope.btnAtcion = (($scope.transaction.myRatings != null) ? "Pay Vendor" : "View Invoice");

  $scope.bookDeal = function(transactionId, vendorId) {
    productService.bookDeal(transactionId, vendorId);
  };

  $scope.gotoRescheduleTxnPage = function () {
    productService.gotoRescheduleTxnPage($scope.transaction.transactionId);
  };

  $scope.sendRatingsOrPay = function() {
    alert("sendRatingsOrPay $scope.btnAtcion = " + $scope.btnAtcion );
    // TODO
    // productService.submitRatings($scope.transaction.transactionId, $scope.transaction.myRatings);
  };

  $scope.submitRatings = function() {
    alert("Submit my rating " + $scope.transaction.myRatings + " / " + $scope.transaction.maxRatings);
    // TODO
    // productService.submitRatings($scope.transaction.transactionId, $scope.transaction.myRatings);
  };

  $scope.gotoPaymentPage = function() {
    alert("Redirecting to payment page...");
    // TODO
    // productService.gotoPaymentPage($scope.transaction.transactionId);
  };

  $scope.gotoCancelDisputePage = function(action) {
    productService.gotoCancelDisputePage(action, $scope.transaction.transactionId, $scope.transaction.service);
  };


}]);

// VendorListCtrl: create angular controller
parijanControllers.controller('VendorListCtrl', ['$scope', 'productService', function ($scope, productService) {
  $scope.selection = productService.getSelectedVendors();
  $scope.names = productService.getVendors();

  $scope.getVendorInfo = function (vendorId) {
    productService.retrieveVendorDetails(vendorId);
  };

  //------------------------
  // list of selected vendorid
  //$scope.selection=[];

  // toggle selection for a given employee by name
  $scope.toggleSelection = function toggleSelection(vendorid) {
    var idx = $scope.selection.indexOf(vendorid);
    // is currently selected
    if (idx > -1) {
      $scope.selection.splice(idx, 1);
    }
    // is newly selected
    else {
      $scope.selection.push(vendorid);
    }
  };
  //------------------------

  /*
  $scope.gotoCancelTxnPage = function () {
  };
  */

  $scope.submitForm = function (transactionId) {
    // Set the 'submitted' flag to true
    $scope.submitted = true;
    //alert("Check link: http://www.programming-free.com/2014/05/angularjs-retrieve-multiple-checkbox-selected-options.html");
    productService.gotoBookServicePage($scope.selection);
  };

}]);

parijanControllers.controller('VendorDetailCtrl', ['$scope', '$routeParams', 'productService', function($scope, $routeParams, productService) {
  $scope.phoneId = $routeParams.phoneId;
  $scope.vendor = productService.getVendorDetails();

  $scope.updateVendordetails = function(imageUrl) {
    $scope.vendor = productService.getVendorDetails();
  };
}]);

parijanControllers.controller('CancelOrDisputeCtrl', ['$scope', '$routeParams', 'productService', function($scope, $routeParams, productService) {
  $scope.transaction = JSON.parse($routeParams.transaction);

  $scope.submitForm = function() {
    $scope.submitted = true;
    if ($scope.transactionForm.$valid) {
      productService.sendAction($scope.transaction);
    }
    else {
      alert("Please correct errors!");
    }
  };
}]);

parijanControllers.controller('BookServiceCtrl', ['$scope', '$routeParams', 'productService', function($scope, $routeParams, productService) {
  // $scope.phoneId = $routeParams.phoneId;
  $scope.serviceRequestData = productService.getServiceRequestDetails();

  // $scope.updateVendordetails = function(imageUrl) {
  //  $scope.vendor = productService.getVendorDetails();
  // };


  $scope.submitForm = function () {
    $scope.submitted = true;
    productService.submitServiceRequest($scope.serviceRequestData);
  };

}]);

// creating custom directive
parijanControllers.directive('ngCompare', function () {
  return {
    require: 'ngModel',
    link: function (scope, currentEl, attrs, ctrl) {
      var comparefield = document.getElementsByName(attrs.ngCompare)[0]; //getting first element
      var compareEl = angular.element(comparefield);

      //current field key up
      currentEl.on('keyup', function () {
        if (compareEl.val() != "") {
          var isMatch = currentEl.val() === compareEl.val();
          ctrl.$setValidity('compare', isMatch);
          scope.$digest();
        }
      });

      //Element to compare field key up
      compareEl.on('keyup', function () {
        if (currentEl.val() != "") {
          var isMatch = currentEl.val() === compareEl.val();
          ctrl.$setValidity('compare', isMatch);
          scope.$digest();
        }
      });
    }
  }
});
