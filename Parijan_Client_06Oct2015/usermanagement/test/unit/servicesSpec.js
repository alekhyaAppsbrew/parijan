
  'use strict';

  // Specs for retrieveAreaFromPincode
  describe('retrieveAreaFromPincode', function() {
    // Include the services
    var localStorage,location,http,productService,sessionStorage;
    beforeEach(module('parijanServices'));
    // inject ValidateOTPCtrl(Its scope,service method that it uses so that it can be spied on) for every test case
      beforeEach(inject(function(_productService_,_$localStorage_,_$location_,_$httpBackend_,_$sessionStorage_) {
       localStorage=_$localStorage_;
        location=_$location_;
        http=_$httpBackend_;

        // Define the service object
        productService = _productService_;

        sessionStorage=_$sessionStorage_;

        // Spy on alert message
        spyOn(window, 'alert');

        // Spy on location.path
        spyOn(location, 'path');
      }));
      
      it("Check For pincode 12345 which is Chennai's",function() {
        expect(productService.retrieveAreaFromPincode('12345')).toBe("Chennai");
      });
      it("Check For pincode 1234 which is Delhi's",function() {
        expect(productService.retrieveAreaFromPincode('1234')).toBe("Delhi");
      });
      it("Check For pincode 12345 which is Chennai's",function() {
        expect(productService.retrieveAreaFromPincode('12345')).toBe("Chennai");
      });
      it("Check For pincode 123 which is Mumbai's",function() {
        expect(productService.retrieveAreaFromPincode('123')).toBe("Mumbai");
      });
      it("Check For pincode 12345 which is Chennai's",function() {
        expect(productService.retrieveAreaFromPincode('12345')).toBe("Chennai");
      });
      it("Given any other pincode,then the city will be considered as Bangalore",function() {
        expect(productService.retrieveAreaFromPincode(' ')).toBe("Bangalore");
      });
      it("Check For pincode 12345 which is Chennai's",function() {
        expect(productService.retrieveAreaFromPincode('12345')).toBe("Chennai");
      });
      it("Given any other pincode,then the city will be considered as Bangalore",function() {
        expect(productService.retrieveAreaFromPincode('rtrty')).toBe("Bangalore");
      });
      it("Check For pincode 12345 which is Chennai's",function() {
        expect(productService.retrieveAreaFromPincode('12345')).toBe("Chennai");
      });
      it("Given any other pincode,then the city will be considered as Bangalore",function() {
        expect(productService.retrieveAreaFromPincode('\0')).toBe("Bangalore");
      });
      it("Check For pincode 12345 which is Chennai's",function() {
        expect(productService.retrieveAreaFromPincode('12345')).toBe("Chennai");
      });
      it("Given any other pincode,then the city will be considered as Bangalore",function() {
        expect(productService.retrieveAreaFromPincode('rtyrty56756')).toBe("Bangalore");
      });
      it("Check For pincode 12345 which is Chennai's",function() {
        expect(productService.retrieveAreaFromPincode('12345')).toBe("Chennai");
      });
      it("Given any other pincode,then the city will be considered as Bangalore",function() {
        expect(productService.retrieveAreaFromPincode('*&^#@')).toBe("Bangalore");
      });

      // Check for an alert if bookDeal is called
      it("Check for an alert if bookDeal is called",function() {
        productService.bookDeal(1234,123);
        expect(window.alert).toHaveBeenCalledWith('1234: Confirm deal with 123');
      });
      it("Check for an alert if bookDeal is called",function() {
        productService.bookDeal("rtryr",123);
        expect(window.alert).toHaveBeenCalledWith('rtryr: Confirm deal with 123');
      });
      it("Check for an alert if bookDeal is called",function() {
        productService.bookDeal(1234,123);
        expect(window.alert).toHaveBeenCalledWith('1234: Confirm deal with 123');
      });
      it("Check for an alert if bookDeal is called",function() {
        productService.bookDeal(123,"rtryr");
        expect(window.alert).toHaveBeenCalledWith('123: Confirm deal with rtryr');
      });
      it("Check for an alert if bookDeal is called",function() {
        productService.bookDeal(1234,123);
        expect(window.alert).toHaveBeenCalledWith('1234: Confirm deal with 123');
      });
      it("Check for an alert if bookDeal is called",function() {
        productService.bookDeal("^*%$#",123);
        expect(window.alert).toHaveBeenCalledWith('^*%$#: Confirm deal with 123');
      });
      it("Check for an alert if bookDeal is called",function() {
        productService.bookDeal(1234,123);
        expect(window.alert).toHaveBeenCalledWith('1234: Confirm deal with 123');
      });
      it("Check for an alert if bookDeal is called",function() {
        productService.bookDeal(123,"^*%$#");
        expect(window.alert).toHaveBeenCalledWith('123: Confirm deal with ^*%$#');
      });
      it("Check for an alert if bookDeal is called",function() {
        productService.bookDeal(1234,123);
        expect(window.alert).toHaveBeenCalledWith('1234: Confirm deal with 123');
      });
      it("Check for an alert if bookDeal is called",function() {
        productService.bookDeal(' ',"124");
        expect(window.alert).toHaveBeenCalledWith(' : Confirm deal with 124');
      });
      it("Check for an alert if bookDeal is called",function() {
        productService.bookDeal(1234,123);
        expect(window.alert).toHaveBeenCalledWith('1234: Confirm deal with 123');
      });
      it("Check for an alert if bookDeal is called",function() {
        productService.bookDeal('124'," ");
        expect(window.alert).toHaveBeenCalledWith('124: Confirm deal with  ');
      });
      it("Check for an alert if bookDeal is called",function() {
        productService.bookDeal(1234,123);
        expect(window.alert).toHaveBeenCalledWith('1234: Confirm deal with 123');
      });
      it("Check for an alert if bookDeal is called",function() {
        productService.bookDeal(1234,123);
        expect(window.alert).toHaveBeenCalledWith('1234: Confirm deal with 123');
      });
      it("Check for an alert if bookDeal is called",function() {
        productService.bookDeal("rtryr",123);
        expect(window.alert).toHaveBeenCalledWith('rtryr: Confirm deal with 123');
      });
      it("Check for an alert if bookDeal is called",function() {
        productService.bookDeal(1234,123);
        expect(window.alert).toHaveBeenCalledWith('1234: Confirm deal with 123');
      });
      it("Check for an alert if bookDeal is called",function() {
        productService.bookDeal("rtryr1","rtryr2");
        expect(window.alert).toHaveBeenCalledWith('rtryr1: Confirm deal with rtryr2');
      });
      it("Check for an alert if bookDeal is called",function() {
        productService.bookDeal(1234,123);
        expect(window.alert).toHaveBeenCalledWith('1234: Confirm deal with 123');
      });
      it("Check if getTransactionInfo is defined",function() {
        expect(productService.getTransactionInfo).toBeDefined();
      });
      // Check for POST when getTransactionInfo is called
      it("Check for POST when getTransactionInfo is called",function() {
         productService.getTransactionInfo("12345");
         
         // Expect a POST 
         http.expectPOST('http://localhost:3004/getTransactionDetails', {"transactionId":"12345"}).respond(201, '');
         http.flush();
        // Expect the alert to not have been called with NETWORK_ERROR
        expect(window.alert).toHaveBeenCalledWith("Network Error!");
      });
       /** These tests can be checked only with end-to-end tests
      // Check for the string returned for status SHORT_LISTED
      it("Check for POST when getTransactionInfo is called",function() {
         productService.getTransactionInfo("5431");
         
         // Expect a POST 
         http.expectPOST('http://localhost:3004/getTransactionDetails', {"transactionId":"5431"}).respond(201, '');
         http.flush();
        // Expect the alert to not have been called with NETWORK_ERROR
        expect(window.alert).toHaveBeenCalledWith('Network Error!');
      });
      // Check for the string returned for status CANCEL
       it("Check for POST when getTransactionInfo is called",function() {
         productService.getTransactionInfo("5440");
         
         // Expect a POST 
         http.expectPOST('http://localhost:3004/getTransactionDetails', {"transactionId":"5440"}).respond(201, '');
         http.flush();
        // Expect the alert to not have been called with NETWORK_ERROR
        expect(window.alert).not.toHaveBeenCalledWith('Network Error!');
      });
      // Check for the string returned for status WORK_COMPLETED
      it("Check for POST when getTransactionInfo is called",function() {
         productService.getTransactionInfo("5443");
         
         // Expect a POST 
         http.expectPOST('http://localhost:3004/getTransactionDetails', {"transactionId":"5443"}).respond(201, '');
         http.flush();
        // Expect the alert to not have been called with NETWORK_ERROR
        expect(window.alert).not.toHaveBeenCalledWith('srTransaction = {"transactionData":{"customerId":"676","transactionId":5443,"service":"Soft Skills Trainer","date":"2015-03-11T18:30:00.000Z","time":"12:05:30","status":"WORK_COMPLETED","remarks":null,"myRatings":2,"readStatus":"1","maxRatings":5,"docImage":"img/invoice_5443.jpg"},"apiStatus":true}');
      });
      // Check for the string returned for status BOOKED
      it("Check for POST when getTransactionInfo is called",function() {
         productService.getTransactionInfo("5444");
         
         // Expect a POST 
         http.expectPOST('http://localhost:3004/getTransactionDetails', {"transactionId":"5444"}).respond(201, '');
         http.flush();
        // Expect the alert to not have been called with NETWORK_ERROR /** 
        expect(window.alert).not.toHaveBeenCalledWith('srTransaction = {"transactionData":{"customerId":"676","transactionId":5444,"service":"Actor","date":"2015-03-11T18:30:00.000Z","time":"12:04:09","status":"BOOKED","areaPinCode":"560078","address":"NO 104","area":"Jayanagar","phoneNumber":"123132","altPhoneNumber":"34534532","city":"Bangalore","description":null,"readStatus":"1","vendorName":"Jeniffer Aniston","vendorId":"sve01167","userRating":2,"wage":"106$ per hour","isFavourite":0,"maxRatings":5,"estimate":"20$","timeElapsed":1},"apiStatus":true}');
      });
      // Check for the string returned for status TXN_COMPLETED
      it("Check for POST when getTransactionInfo is called",function() {
         productService.getTransactionInfo("5445");
         
         // Expect a POST 
         http.expectPOST('http://localhost:3004/getTransactionDetails', {"transactionId":"5445"}).respond(201, '');
         http.flush();
        // Expect the alert to not have been called with NETWORK_ERROR
        expect(window.alert).not.toHaveBeenCalledWith('srTransaction = {"transactionData":{"customerId":"676","transactionId":5445,"service":"Actor","date":"2015-03-11T18:30:00.000Z","time":"12:04:09","status":"TXN_COMPLETED","remarks":null,"myRatings":5,"readStatus":"1","maxRatings":5,"docImage":"img/receipt_5445.jpg","timeElapsed":1},"apiStatus":true}');
      });
      // Check for the string returned for status DISPUTE
      it("Check for POST when getTransactionInfo is called",function() {
         productService.getTransactionInfo("5446");
         
         // Expect a POST 
         http.expectPOST('http://localhost:3004/getTransactionDetails', {"transactionId":"5446"}).respond(201, '');
         http.flush();
        // Expect the alert to not have been called with NETWORK_ERROR
        expect(window.alert).not.toHaveBeenCalledWith('srTransaction = {"transactionData":{"customerId":"676","transactionId":5446,"service":"Actor","date":"2015-03-11T18:30:00.000Z","time":"12:04:09","status":"DISPUTE","remarks":"Work is not done properly","areaPinCode":"560071","address":"n","area":"J.P.Nagar","phoneNumber":"56656","altPhoneNumber":"232","city":"Bangalore","docImage":"img/receipt_5446.jpg","description":"The vendor has to come only at mentioned timings","readStatus":"1","raisedBy":"User","vendorName":"Jeniffer Aniston","vendorId":"sve01167","userRating":2,"wage":"106$ per hour","isFavourite":0,"maxRatings":5,"estimate":"20$"},"apiStatus":true}');
      });**/
      // retrieveAndGoToInbox
      it("Check for the function retrieveAndGoToInbox",function() {
      // Call retrieveAndGoToInbox
      localStorage={loggedIn:false};
      productService.retrieveAndGoToInbox(10);

      // Set $localStorage.loggedIn to false
      //localStorage={loggedIn:false};

      // Expect location.path to have been called
      expect(location.path).toHaveBeenCalledWith('/login');
      expect(productService.getVendors).toBeDefined();
      });


      // submitServiceRequest
      it("Check for the function submitServiceRequest",function() {
        productService.submitServiceRequest("325w4");
        expect(window.alert).toHaveBeenCalled()

        // SET localStorage.loggedIn FALSE
        localStorage={loggedIn:false};

        // Expect location.path to have been called
        expect(location.path).toHaveBeenCalledWith('/login');

        // Expect srGotoHomePage to be false
        // expect(srGotoHomePage).toBe(false);
         
      });
  });

