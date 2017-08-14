  /** TC_01             : To Check if the searchvendor page is the page that gets displyed by default.
   *
   *  PRE-CONDITIONS    : 1.Run the application.
   *                      2.Place this file's path in specs option in config file
   *                        that is required to run protractor.
   *                      3.Give the application's url in the baseUrl option in
   *                        in config file that is required to run protractor.
   *                      4.Run the command:
   *                        protractor [Path for the config file]
   **/ 
   describe('searchvendor page url is by default',function()
   {

                                        // Before running each test suite get a browser
                                        // instance and the url must be
                                        // ''
                                        // This url(http://localhost:3004/#/searchvendor) is given by default,that is given
                                        // any other invalid url will lead to the searchvendor
                                        // page
                                        beforeEach(function(){
                                                                browser.get('');
                                                             }
                                                  ); 

                                        it('Current Url must be http://localhost:3004/#/searchvendor',function(){
                                           browser.getCurrentUrl().then(function(url) 
                                                                     {
                                                                       expect(url).toBe("http://localhost:3004/#/searchvendor"); 
                                                                     });

                                           // Just enter some random text as the URL,but still
                                           // the current URL must be "http://localhost:3004/#/searchvendor" 
                                           browser.get('http://localhost:3004/#/tytgygt8998');
                                           browser.getCurrentUrl().then(function(url) 
                                                                   {
                                                                      expect(url).toBe("http://localhost:3004/#/searchvendor"); 
                                                                   });
                                                                                 
                                        });
   });

/** TC_02             : To Check the validity of text(that is the input given by the users).
  *
  *  PRE-CONDITIONS   : 1.Run the application.
  *                     2.Place this file's path in specs option in config file
  *                       that is required to run protractor.
  *                     3.Give the application's url in the baseUrl option in
  *                       in config file that is required to run protractor.
  *                     4.Run the command:
  *                       protractor [Path for the config file]
  **/ 
  describe('Register pages inputs',function()
                                     {

                                        // Before running each test suite get a browser
                                        // instance and the url must be
                                        // 'http://localhost:3004/#/register'
                                        // which is the register page
                                        beforeEach(function(){
                                                                browser.get('http://localhost:3004/#/register');
                                                             }
                                                  ); 

                                        it('Should not redirect',function(){
                                           // Click the Submit Button even without entering the required
                                           // input details
                                           element.all(by.css('.btn btn-primary-parijan')).click();
                                           
                                           // Even After clicking on submit button the Url should be the same
                                           // that is it shouldnt redirect
                                           browser.getCurrentUrl().then(function(url) 
                                                                     {
                                                                       expect(url).toBe("http://localhost:3004/#/register"); 
                                                                     });
                                           
                                                                                 
                                        });

                                       // Just give the necessary input for registeration then the Url must change to
                                       // 'http://localhost:3004/#/validateotp'
                                       it('Submit the form,redirect to validateOTP page',function(){
                                           // Create a reference for the inputs 
                                           var phoneNo=element(by.model('user.phoneNo'));
                                           var firstname=element(by.model('user.firstname'));
                                           var lastname=element(by.model('user.lastname'));
                                           var password=element(by.model('user.password'));
                                           var confirmPassword=element(by.model('user.confirmPassword'));
                                           var terms=element(by.model('user.terms'));

                                           // Give Values to the inputs
                                           var promise1 = element(by.css(('.form-group'))).all(by.tagName('option')).get(1).click();
                                           firstname.sendKeys('Narahari');
                                           lastname.sendKeys('Yelchuru');
                                           password.sendKeys('Yelchuru');
                                           confirmPassword.sendKeys('Yelchuru');
                                           terms.click();

                                           
                                           // Click the Submit Button even after entering the required
                                           // input details
                                           element(by.tagName('button')).click();

                                           browser.getCurrentUrl().then(function(url) 
                                                                     {
                                                                       expect(url).toBe("http://localhost:3004/#/validateotp"); 
                                                                     });
                                       });

                                       // Just prefix a string containing some special characters
                                       // to first name for registeration then the Url must change to
                                       // 'http://localhost:3004/#/validateotp'
                                       it('Submit the form(by prefixing special characters to firstName),redirect to validateOTP page',function(){
                                           // Create a reference for the inputs 
                                           var phoneNo=element(by.model('user.phoneNo'));
                                           var firstname=element(by.model('user.firstname'));
                                           var lastname=element(by.model('user.lastname'));
                                           var password=element(by.model('user.password'));
                                           var confirmPassword=element(by.model('user.confirmPassword'));
                                           var terms=element(by.model('user.terms'));

                                           // First prepare the prefix for the first name that
                                           // contains special characters
                                           var allowedChars = ".\+*?[^]$(){}=!<>|:-";
                                           var stringLength = 6;
                                           var randomstring = '';

                                           for (var i=0; i<stringLength; i++) {
                                             var rnum = Math.floor(Math.random() * allowedChars.length);
                                             randomstring += allowedChars.substring(rnum,rnum+1);
                                           }
                                           

                                           // Give Values to the inputs
                                           var promise1 = element(by.css(('.form-group'))).all(by.tagName('option')).get(1).click();
                                           firstname.sendKeys(randomstring+'Narahari');
                                           lastname.sendKeys('Yelchuru');
                                           password.sendKeys('Yelchuru');
                                           confirmPassword.sendKeys('Yelchuru');
                                           terms.click();

                                           
                                           // Click the Submit Button even after entering the required
                                           // input details
                                           element(by.tagName('button')).click();

                                           browser.getCurrentUrl().then(function(url) 
                                                                     {
                                                                       expect(url).toBe("http://localhost:3004/#/validateotp"); 
                                                                     });
                                       });

                                       // Just prefix a string containing some special characters
                                       //  to last name for registeration then the Url must change to
                                       // 'http://localhost:3004/#/validateotp'
                                       it('Submit the form(by prefixing special characters to lastName),redirect to validateOTP page',function(){
                                           // Create a reference for the inputs 
                                           var phoneNo=element(by.model('user.phoneNo'));
                                           var firstname=element(by.model('user.firstname'));
                                           var lastname=element(by.model('user.lastname'));
                                           var password=element(by.model('user.password'));
                                           var confirmPassword=element(by.model('user.confirmPassword'));
                                           var terms=element(by.model('user.terms'));

                                           // First prepare the prefix for the last name that
                                           // contains special characters
                                           var allowedChars = ".\+*?[^]$(){}=!<>|:-";
                                           var stringLength = 6;
                                           var randomstring = '';

                                           for (var i=0; i<stringLength; i++) {
                                             var rnum = Math.floor(Math.random() * allowedChars.length);
                                             randomstring += allowedChars.substring(rnum,rnum+1);
                                           }
                                           

                                           // Give Values to the inputs
                                           var promise1 = element(by.css(('.form-group'))).all(by.tagName('option')).get(1).click();
                                           firstname.sendKeys('Narahari');
                                           lastname.sendKeys(randomstring+'Yelchuru');
                                           password.sendKeys('Yelchuru');
                                           confirmPassword.sendKeys('Yelchuru');
                                           terms.click();

                                           
                                           // Click the Submit Button even after entering the required
                                           // input details
                                           element(by.tagName('button')).click();

                                           browser.getCurrentUrl().then(function(url) 
                                                                     {
                                                                       expect(url).toBe("http://localhost:3004/#/validateotp"); 
                                                                     });
                                       });

                                       // Just prefix a string containing some special characters
                                       //  to password for registeration then the Url must change to
                                       // 'http://localhost:3004/#/validateotp'
                                       it('Submit the form(by prefixing special characters to password),redirect to validateOTP page',function(){
                                           // Create a reference for the inputs 
                                           var phoneNo=element(by.model('user.phoneNo'));
                                           var firstname=element(by.model('user.firstname'));
                                           var lastname=element(by.model('user.lastname'));
                                           var password=element(by.model('user.password'));
                                           var confirmPassword=element(by.model('user.confirmPassword'));
                                           var terms=element(by.model('user.terms'));

                                           // First prepare the prefix for the password that
                                           // contains special characters
                                           var allowedChars = ".\+*?[^]$(){}=!<>|:-";
                                           var stringLength = 6;
                                           var randomstring = '';

                                           for (var i=0; i<stringLength; i++) {
                                             var rnum = Math.floor(Math.random() * allowedChars.length);
                                             randomstring += allowedChars.substring(rnum,rnum+1);
                                           }
                                           

                                           // Give Values to the inputs
                                           var promise1 = element(by.css(('.form-group'))).all(by.tagName('option')).get(1).click();
                                           firstname.sendKeys('Narahari');
                                           lastname.sendKeys('Yelchuru');
                                           password.sendKeys(randomstring+'Yelchuru');
                                           confirmPassword.sendKeys(randomstring+'Yelchuru');
                                           terms.click();

                                           
                                           // Click the Submit Button even after entering the required
                                           // input details
                                           element(by.tagName('button')).click();

                                           browser.getCurrentUrl().then(function(url) 
                                                                     {
                                                                       expect(url).toBe("http://localhost:3004/#/validateotp"); 
                                                                     });
                                       });

                                       // Enter only numbers for firstname and still it should
                                       // redirect to "http://localhost:3004/#/validateotp"
                                       it('Submit the form(Entering only numbers for firstname),redirect to validateOTP page',function(){
                                           // Create a reference for the inputs 
                                           var phoneNo=element(by.model('user.phoneNo'));
                                           var firstname=element(by.model('user.firstname'));
                                           var lastname=element(by.model('user.lastname'));
                                           var password=element(by.model('user.password'));
                                           var confirmPassword=element(by.model('user.confirmPassword'));
                                           var terms=element(by.model('user.terms'));

                                           // First prepare the string that  
                                           // contains only numbers
                                           var allowedChars = "0123456789";
                                           var stringLength = 6;
                                           var randomstring = '';

                                           for (var i=0; i<stringLength; i++) {
                                             var rnum = Math.floor(Math.random() * allowedChars.length);
                                             randomstring += allowedChars.substring(rnum,rnum+1);
                                           }
                                           

                                           // Give Values to the inputs
                                           var promise1 = element(by.css(('.form-group'))).all(by.tagName('option')).get(1).click();
                                           firstname.sendKeys(randomstring);
                                           lastname.sendKeys('Yelchuru');
                                           password.sendKeys('Yelchuru');
                                           confirmPassword.sendKeys('Yelchuru');
                                           terms.click();

                                           
                                           // Click the Submit Button even after entering the required
                                           // input details
                                           element(by.tagName('button')).click();

                                           browser.getCurrentUrl().then(function(url) 
                                                                     {
                                                                       expect(url).toBe("http://localhost:3004/#/validateotp"); 
                                                                     });
                                       });

                                       // Enter only numbers for lastname and still it should
                                       // redirect to "http://localhost:3004/#/validateotp"
                                       it('Submit the form(Entering only numbers for lastname),redirect to validateOTP page',function(){
                                           // Create a reference for the inputs 
                                           var phoneNo=element(by.model('user.phoneNo'));
                                           var firstname=element(by.model('user.firstname'));
                                           var lastname=element(by.model('user.lastname'));
                                           var password=element(by.model('user.password'));
                                           var confirmPassword=element(by.model('user.confirmPassword'));
                                           var terms=element(by.model('user.terms'));

                                           // First prepare the string that  
                                           // contains only numbers
                                           var allowedChars = "0123456789";
                                           var stringLength = 6;
                                           var randomstring = '';

                                           for (var i=0; i<stringLength; i++) {
                                             var rnum = Math.floor(Math.random() * allowedChars.length);
                                             randomstring += allowedChars.substring(rnum,rnum+1);
                                           }
                                           

                                           // Give Values to the inputs
                                           var promise1 = element(by.css(('.form-group'))).all(by.tagName('option')).get(1).click();
                                           firstname.sendKeys('Narahari');
                                           lastname.sendKeys(randomstring);
                                           password.sendKeys('Yelchuru');
                                           confirmPassword.sendKeys('Yelchuru');
                                           terms.click();

                                           
                                           // Click the Submit Button even after entering the required
                                           // input details
                                           element(by.tagName('button')).click();

                                           browser.getCurrentUrl().then(function(url) 
                                                                     {
                                                                       expect(url).toBe("http://localhost:3004/#/validateotp"); 
                                                                     });
                                       });

                                       // Enter only numbers for password and still it should
                                       // redirect to "http://localhost:3004/#/validateotp"
                                       it('Submit the form(Entering only numbers for password),redirect to validateOTP page',function(){
                                           // Create a reference for the inputs 
                                           var phoneNo=element(by.model('user.phoneNo'));
                                           var firstname=element(by.model('user.firstname'));
                                           var lastname=element(by.model('user.lastname'));
                                           var password=element(by.model('user.password'));
                                           var confirmPassword=element(by.model('user.confirmPassword'));
                                           var terms=element(by.model('user.terms'));

                                           // First prepare the string that  
                                           // contains only numbers
                                           var allowedChars = "0123456789";
                                           var stringLength = 6;
                                           var randomstring = '';

                                           for (var i=0; i<stringLength; i++) {
                                             var rnum = Math.floor(Math.random() * allowedChars.length);
                                             randomstring += allowedChars.substring(rnum,rnum+1);
                                           }
                                           

                                           // Give Values to the inputs
                                           var promise1 = element(by.css(('.form-group'))).all(by.tagName('option')).get(1).click();
                                           firstname.sendKeys('Narahari');
                                           lastname.sendKeys('Yelchuru');
                                           password.sendKeys(randomstring);
                                           confirmPassword.sendKeys(randomstring);
                                           terms.click();

                                           
                                           // Click the Submit Button even after entering the required
                                           // input details
                                           element(by.tagName('button')).click();

                                           browser.getCurrentUrl().then(function(url) 
                                                                     {
                                                                       expect(url).toBe("http://localhost:3004/#/validateotp"); 
                                                                     });
                                       });

                                       // Just try entering blank as first name then it should
                                       // alert
                                       it('Submit the form(Enter blank as first Name),redirect to validateOTP page',function(){
                                           // Create a reference for the inputs 
                                           var phoneNo=element(by.model('user.phoneNo'));
                                           var firstname=element(by.model('user.firstname'));
                                           var lastname=element(by.model('user.lastname'));
                                           var password=element(by.model('user.password'));
                                           var confirmPassword=element(by.model('user.confirmPassword'));
                                           var terms=element(by.model('user.terms'));

                                           // Give Values to the inputs
                                           var promise1 = element(by.css(('.form-group'))).all(by.tagName('option')).get(1).click();
                                           firstname.sendKeys('  ');
                                           lastname.sendKeys('Yelchuru');
                                           password.sendKeys('Yelchuru');
                                           confirmPassword.sendKeys('Yelchuru');
                                           terms.click();

                                           
                                           // Click the Submit Button even after entering the required
                                           // input details
                                           element(by.tagName('button')).click();

                                           // As the first name is blank,it should alert indicating the same
                                           var alertDialog = browser.switchTo().alert();
                                           expect(alertDialog.getText()).toEqual("Please correct errors!");
                                           alertDialog.accept(); 
                                       });

                                       // Just try entering blank as last name then it should
                                       // alert
                                       it('Submit the form(Enter blank as last Name),redirect to validateOTP page',function(){
                                           // Create a reference for the inputs 
                                           var phoneNo=element(by.model('user.phoneNo'));
                                           var firstname=element(by.model('user.firstname'));
                                           var lastname=element(by.model('user.lastname'));
                                           var password=element(by.model('user.password'));
                                           var confirmPassword=element(by.model('user.confirmPassword'));
                                           var terms=element(by.model('user.terms'));

                                           // Give Values to the inputs
                                           var promise1 = element(by.css(('.form-group'))).all(by.tagName('option')).get(1).click();
                                           firstname.sendKeys('Narahari');
                                           lastname.sendKeys('  ');
                                           password.sendKeys('Yelchuru');
                                           confirmPassword.sendKeys('Yelchuru');
                                           terms.click();

                                           
                                           // Click the Submit Button even after entering the required
                                           // input details
                                           element(by.tagName('button')).click();

                                           // As the last name is blank,it should alert indicating the same
                                           var alertDialog = browser.switchTo().alert();
                                           expect(alertDialog.getText()).toEqual("Please correct errors!");
                                           alertDialog.accept(); 
                                       });

                                       // Just try entering blank as password then it should
                                       // alert
                                       // TESTS
                                       /**
                                       it('Submit the form,redirect to validateOTP page',function(){
                                           // Create a reference for the inputs 
                                           var phoneNo=element(by.model('user.phoneNo'));
                                           var firstname=element(by.model('user.firstname'));
                                           var lastname=element(by.model('user.lastname'));
                                           var password=element(by.model('user.password'));
                                           var confirmPassword=element(by.model('user.confirmPassword'));
                                           var terms=element(by.model('user.terms'));

                                           // Give Values to the inputs
                                           var promise1 = element(by.css(('.form-group'))).all(by.tagName('option')).get(1).click();
                                           firstname.sendKeys('Narahari');
                                           lastname.sendKeys('Yelchuru');
                                           password.sendKeys('  ');
                                           confirmPassword.sendKeys('  ');
                                           terms.click();

                                           
                                           // Click the Submit Button even after entering the required
                                           // input details
                                           element(by.tagName('button')).click();

                                           // As the password is blank,it should alert indicating the same
                                           var alertDialog = browser.switchTo().alert();
                                           expect(alertDialog.getText()).toEqual("Please correct errors!");
                                           alertDialog.accept(); 
                                       });
                                       **/

                                       // Check for the tabs,that is if the user is able to move to 
                                       // the next input field in the form
                                       it('Checks For the Tab',function(){
                                           // Create a reference for the inputs 
                                           var firstname=element(by.model('user.firstname'));
                                           
                                           // Just enter TAB at the firstname's input field
                                           firstname.sendKeys(protractor.Key.TAB);
                                           browser.sleep(400);

                                           browser.actions().sendKeys(protractor.Key.TAB).perform();
                                           browser.sleep(400);

                                           browser.actions().sendKeys(protractor.Key.TAB).perform();
                                           browser.sleep(400);

                                           browser.actions().sendKeys(protractor.Key.TAB).perform();
                                           browser.sleep(400);

                                           browser.actions().sendKeys(protractor.Key.TAB).perform();
                                           browser.sleep(400);

                                           browser.actions().sendKeys(protractor.Key.TAB).perform();
                                           browser.sleep(400);
                                       });

                                       // Give input to every field except for phone Number,then
                                       // that is it should not re-direct to an another page,instead
                                       // there should be an alert box
                                       it('Submit the form without phone number,it shouldnt redirect ',function(){
                                           // Create a reference for the inputs 
                                           var firstname=element(by.model('user.firstname'));
                                           var lastname=element(by.model('user.lastname'));
                                           var password=element(by.model('user.password'));
                                           var confirmPassword=element(by.model('user.confirmPassword'));
                                           var terms=element(by.model('user.terms'));

                                           // Give Values to all the inputs
                                           // in the form except for phone number
                                           firstname.sendKeys('Narahari');
                                           lastname.sendKeys('Yelchuru');
                                           password.sendKeys('Yelchuru');
                                           confirmPassword.sendKeys('Yelchuru');
                                           terms.click();

                                           
                                           // Click the Submit Button even after entering the required
                                           // input details
                                           element(by.tagName('button')).click();
                   


                                           // As the phone number is not given,it should alert indicating the same
                                           var alertDialog = browser.switchTo().alert();
                                           expect(alertDialog.getText()).toEqual("Please correct errors!");
                                           alertDialog.accept(); 

                                           });
                                        
                                           // Give input to every field except for first name,then
                                           // that is it should not re-direct to an another page,instead
                                           // there should be an alert box
                                       it('Submit the form without first name,it shouldnt redirect ',function(){
                                           // Create a reference for the inputs 
                                           var phoneNo=element(by.model('user.phoneNo'));
                                           var lastname=element(by.model('user.lastname'));
                                           var password=element(by.model('user.password'));
                                           var confirmPassword=element(by.model('user.confirmPassword'));
                                           var terms=element(by.model('user.terms'));

                                           // Give Values to all the inputs
                                           // in the form except for first name
                                           var promise1 = element(by.css(('.form-group'))).all(by.tagName('option')).get(2).click();
                                           lastname.sendKeys('Yelchuru');
                                           password.sendKeys('Yelchuru');
                                           confirmPassword.sendKeys('Yelchuru');
                                           terms.click();

                                           
                                           // Click the Submit Button even after entering the required
                                           // input details
                                           element(by.tagName('button')).click();
                   


                                           // As the first name is not given,it should alert indicating the same
                                           var alertDialog = browser.switchTo().alert();
                                           expect(alertDialog.getText()).toEqual("Please correct errors!");
                                           alertDialog.accept(); 

                                           });

                                           // Give input to every field except for last name,then
                                           // that is it should not re-direct to an another page,instead
                                           // there should be an alert box
                                           it('Submit the form without last name,it shouldnt redirect ',function(){
                                             // Create a reference for the inputs 
                                             var phoneNo=element(by.model('user.phoneNo'));
                                             var firstname=element(by.model('user.firstname'));
                                             var password=element(by.model('user.password'));
                                             var confirmPassword=element(by.model('user.confirmPassword'));
                                             var terms=element(by.model('user.terms'));

                                             // Give Values to all the inputs
                                             // in the form except for last name
                                             var promise1 = element(by.css(('.form-group'))).all(by.tagName('option')).get(2).click();
                                             firstname.sendKeys('Narahari');
                                             password.sendKeys('Yelchuru');
                                             confirmPassword.sendKeys('Yelchuru');
                                             terms.click();

                                           
                                             // Click the Submit Button even after entering the required
                                             // input details
                                             element(by.tagName('button')).click();
                   


                                             // As the last name is not given,it should alert indicating the same
                                             var alertDialog = browser.switchTo().alert();
                                             expect(alertDialog.getText()).toEqual("Please correct errors!");
                                             alertDialog.accept(); 

                                           });

                                           // Give input to every field except for password,
                                           // that is it should not re-direct to an another page,instead
                                           // there should be an alert box
                                           it('Submit the form without password,it shouldnt redirect ',function(){
                                             // Create a reference for the inputs 
                                             var phoneNo=element(by.model('user.phoneNo'));
                                             var firstname=element(by.model('user.firstname'));
                                             var lastname=element(by.model('user.lastname'));
                                             var confirmPassword=element(by.model('user.confirmPassword'));
                                             var terms=element(by.model('user.terms'));

                                             // Give Values to all the inputs
                                             // in the form except for password
                                             var promise1 = element(by.css(('.form-group'))).all(by.tagName('option')).get(1).click();
                                             firstname.sendKeys('Narahari');
                                             lastname.sendKeys('Yelchuru');
                                             confirmPassword.sendKeys('Yelchuru');
                                             terms.click();

                                           
                                             // Click the Submit Button even after entering the required
                                             // input details
                                             element(by.tagName('button')).click();
                   


                                             // As the password is not given,it should alert indicating the same
                                             var alertDialog = browser.switchTo().alert();
                                             expect(alertDialog.getText()).toEqual("Please correct errors!");
                                             alertDialog.accept(); 

                                           });

                                           // Give input to every field except for confirm password,
                                           // that is it should not re-direct to an another page,instead
                                           // there should be an alert box
                                           it('Submit the form without confirm password,it shouldnt redirect ',function(){
                                             // Create a reference for the inputs 
                                             var phoneNo=element(by.model('user.phoneNo'));
                                             var firstname=element(by.model('user.firstname'));
                                             var lastname=element(by.model('user.lastname'));
                                             var password=element(by.model('user.password'));
                                             var terms=element(by.model('user.terms'));

                                             // Give Values to all the inputs
                                             // in the form except for confirm password
                                             var promise1 = element(by.css(('.form-group'))).all(by.tagName('option')).get(1).click();
                                             firstname.sendKeys('Narahari');
                                             lastname.sendKeys('Yelchuru');
                                             password.sendKeys('Yelchuru');
                                             terms.click();

                                           
                                             // Click the Submit Button even after entering the required
                                             // input details
                                             element(by.tagName('button')).click();
                   


                                             // As the confirm password is not given,it should alert indicating the same
                                             var alertDialog = browser.switchTo().alert();
                                             expect(alertDialog.getText()).toEqual("Please correct errors!");
                                             alertDialog.accept(); 

                                           });

                                           // Give a value to password,and give a different value to the confirm
                                           // password and check if an alert pops up
                                           it('Check for confirm password ',function(){
                                             // Create a reference for the inputs 
                                             var phoneNo=element(by.model('user.phoneNo'));
                                             var firstname=element(by.model('user.firstname'));
                                             var lastname=element(by.model('user.lastname'));
                                             var password=element(by.model('user.password'));
                                             var confirmPassword=element(by.model('user.confirmPassword'));
                                             var terms=element(by.model('user.terms'));

                                             // Give Values to all the inputs
                                             // in the form except for confirm password
                                             var promise1 = element(by.css(('.form-group'))).all(by.tagName('option')).get(1).click();
                                             firstname.sendKeys('Narahari');
                                             lastname.sendKeys('Yelchuru');
                                             password.sendKeys('Yelchuru');
                                             confirmPassword.sendKeys('ghgh');
                                             terms.click();

                                           
                                             // Click the Submit Button even after entering the required
                                             // input details
                                             element(by.tagName('button')).click();
                   


                                             // As the confirm password is not given,it should alert indicating the same
                                             var alertDialog = browser.switchTo().alert();
                                             expect(alertDialog.getText()).toEqual("Please correct errors!");
                                             alertDialog.accept(); 

                                           });

                                           // Give input to every field except for terms,
                                           // that is it should not re-direct to an another page,instead
                                           // there should be an alert box
                                           it('Submit the form without terms,it shouldnt redirect ',function(){
                                             // Create a reference for the inputs 
                                             var phoneNo=element(by.model('user.phoneNo'));
                                             var firstname=element(by.model('user.firstname'));
                                             var lastname=element(by.model('user.lastname'));
                                             var password=element(by.model('user.password'));

                                             // Give Values to all the inputs
                                             // in the form except for terms
                                             var promise1 = element(by.css(('.form-group'))).all(by.tagName('option')).get(1).click();
                                             firstname.sendKeys('Narahari');
                                             lastname.sendKeys('Yelchuru');
                                             password.sendKeys('Yelchuru');

                                           
                                             // Click the Submit Button even after entering the required
                                             // input details
                                             element(by.tagName('button')).click();
                   


                                             // As the terms is not given,it should alert indicating the same
                                             var alertDialog = browser.switchTo().alert();
                                             expect(alertDialog.getText()).toEqual("Please correct errors!");
                                             alertDialog.accept(); 

                                           });

                                           // Give a random text to firstName
                                           it('Giving random string as value to first-name',function(){
                                             /** Code to generate a random string
                                             /* The following block generates a random email string */
                                             var allowedChars = "abcdefghiklmnopqrstuvwxyz";
                                             var stringLength = 6;
                                             var randomstring = '';

                                             for (var i=0; i<stringLength; i++) {
                                               var rnum = Math.floor(Math.random() * allowedChars.length);
                                               randomstring += allowedChars.substring(rnum,rnum+1);
                                             }

                                             // Create a reference for the inputs 
                                             var phoneNo=element(by.model('user.phoneNo'));
                                             var firstname=element(by.model('user.firstname'));
                                             var lastname=element(by.model('user.lastname'));
                                             var password=element(by.model('user.password'));
                                             var confirmPassword=element(by.model('user.confirmPassword'));
                                             var terms=element(by.model('user.terms'));

                                             // Give Values to the inputs
                                             var promise1 = element(by.css(('.form-group'))).all(by.tagName('option')).get(1).click();
                                             firstname.sendKeys(randomstring);
                                             lastname.sendKeys('Yelchuru');
                                             password.sendKeys('Yelchuru');
                                             confirmPassword.sendKeys('Yelchuru');
                                             terms.click();

                                           
                                             // Click the Submit Button even after entering the required
                                             // input details
                                             element(by.tagName('button')).click();

                                             browser.getCurrentUrl().then(function(url) 
                                                                     {
                                                                       expect(url).toBe("http://localhost:3004/#/validateotp"); 
                                                                     });

                                             
                                           });

                                           // Give a random text to lastName
                                           it('Giving random string as value to last-name',function(){
                                             /** Code to generate a random string
                                             /* The following block generates a random email string */
                                             var allowedChars = "abcdefghiklmnopqrstuvwxyz";
                                             var stringLength = 6;
                                             var randomstring = '';

                                             for (var i=0; i<stringLength; i++) {
                                               var rnum = Math.floor(Math.random() * allowedChars.length);
                                               randomstring += allowedChars.substring(rnum,rnum+1);
                                             }

                                             // Create a reference for the inputs 
                                             var phoneNo=element(by.model('user.phoneNo'));
                                             var firstname=element(by.model('user.firstname'));
                                             var lastname=element(by.model('user.lastname'));
                                             var password=element(by.model('user.password'));
                                             var confirmPassword=element(by.model('user.confirmPassword'));
                                             var terms=element(by.model('user.terms'));

                                             // Give Values to the inputs
                                             var promise1 = element(by.css(('.form-group'))).all(by.tagName('option')).get(1).click();
                                             firstname.sendKeys('Yelchuru');
                                             lastname.sendKeys(randomstring);
                                             password.sendKeys('Yelchuru');
                                             confirmPassword.sendKeys('Yelchuru');
                                             terms.click();

                                           
                                             // Click the Submit Button even after entering the required
                                             // input details
                                             element(by.tagName('button')).click();

                                             browser.getCurrentUrl().then(function(url) 
                                                                     {
                                                                       expect(url).toBe("http://localhost:3004/#/validateotp"); 
                                                                     });

                                             
                                           });

                                           // Give a random text to password
                                           it('Giving random string as value to password',function(){
                                             /** Code to generate a random string
                                             /* The following block generates a random email string */
                                             var allowedChars = "abcdefghiklmnopqrstuvwxyz";
                                             var stringLength = 6;
                                             var randomstring = '';

                                             for (var i=0; i<stringLength; i++) {
                                               var rnum = Math.floor(Math.random() * allowedChars.length);
                                               randomstring += allowedChars.substring(rnum,rnum+1);
                                             }

                                             // Create a reference for the inputs 
                                             var phoneNo=element(by.model('user.phoneNo'));
                                             var firstname=element(by.model('user.firstname'));
                                             var lastname=element(by.model('user.lastname'));
                                             var password=element(by.model('user.password'));
                                             var confirmPassword=element(by.model('user.confirmPassword'));
                                             var terms=element(by.model('user.terms'));

                                             // Give Values to the inputs
                                             var promise1 = element(by.css(('.form-group'))).all(by.tagName('option')).get(1).click();
                                             firstname.sendKeys('Yelchuru');
                                             lastname.sendKeys('Yelchuru');
                                             password.sendKeys(randomstring);
                                             confirmPassword.sendKeys(randomstring);
                                             terms.click();

                                           
                                             // Click the Submit Button even after entering the required
                                             // input details
                                             element(by.tagName('button')).click();

                                             browser.getCurrentUrl().then(function(url) 
                                                                     {
                                                                       expect(url).toBe("http://localhost:3004/#/validateotp"); 
                                                                     });

                                             
                                           });
});

/** TC_03             : To Check for Search vendors page
  *
  *  PRE-CONDITIONS   : 1.Run the application.
  *                     2.Place this file's path in specs option in config file
  *                       that is required to run protractor.
  *                     3.Give the application's url in the baseUrl option in
  *                       in config file that is required to run protractor.
  *                     4.Run the command:
  *                       protractor [Path for the config file]
  **/ 
  describe('Search-Vendor Page',function()
  {
     // Before running each test suite get a browser
     // instance and the url must be
     // 'http://localhost:3004/#/searchvendor'
     // which is the search page which specifies the
     // the type of the vendor(filter)
     beforeEach(function(){
                             browser.get('http://localhost:3004/#/searchvendor');

                             // Function getNames
                             var phoneNameColumn = element.all(by.repeater('vendorType in vendorTypeList').column('vendor.vendorType'));
     });

     // This page should contain a drop-down 
     it('Check for Page,that should contain a drop down menu',function(){
       expect(element(by.model('vendor.vendorType') ).isDisplayed()).toBeTruthy();
     });

     // This page should contain a button 
     it('Check for Page,that should contain a button',function(){
       expect(element(by.tagName('button') ).isDisplayed()).toBeTruthy();
     });

     // Link for the same
     // https://github.com/angular/protractor/issues/480
    /** it('By default,the drop down menu should display select',function(){
       // Check if by default select appears in the drop-down    
       expect(element(by.model('vendor.vendorType')).$('option[1]').getText()).toEqual('Select');
       expect(element(by.tagName('option')).getText()).toEqual('Select');
     });**/


     // Check the size of the drop down menu,
     // Testing drop-down has an issue
     // Link for the same
     // https://github.com/angular/protractor/issues/480
    /** it('Check the size of the drop down menu',function(){
       // Check if by default select appears in the drop-down    
       //expect(element(by.model('vendor.vendorType')).$('option:checked').getSize()).toEqual(3);
       expect(element(by.model('vendor.vendorType')).$('option:checked').getText()).toEqual('Select');
       element(by.cssContainingText('select option','Actor')).click();
       //  expect(element(by.model('model_name')).$('option:checked').getText()).toEqual('xxxxxx
     });     **/
   });

  /** TC_04             : To Check for otp validation page
   *
   *  PRE-CONDITIONS   : 1.Run the application.
   *                     2.Place this file's path in specs option in config file
   *                       that is required to run protractor.
   *                     3.Give the application's url in the baseUrl option in
   *                       in config file that is required to run protractor.
   *                     4.Run the command:
   *                       protractor [Path for the config file]
   **/ 
   describe('Validate-OTP Page',function()
  {
     beforeEach(function(){
                               browser.get('http://localhost:3004/#/validateotp');                       
                          });

     // No data should alert for errors 
     it('Not giving any input to the otp text box should alert',function(){
       // Create a reference for the inputs 
       var otp=element(by.model('user.otp'));

       // Let the input be null
       otp.sendKeys('');

       // Click the Send Button even after entering the required
       // input details
       element(by.tagName('button')).click();


       // As the otp is not given,it should alert indicating the same
       var alertDialog = browser.switchTo().alert();
       expect(alertDialog.getText()).toEqual("Please correct errors!");
       alertDialog.accept(); 
     });

     // Give an input to the otp text box and it should alert
     // Invalid OTP!
     it('Not giving valid input to the otp text box should alert',function(){
       // Create a reference for the inputs 
       var otp=element(by.model('user.otp'));

       // Let the input be some 5 digit number
       otp.sendKeys('67453');

       // Click the Send Button even after entering the required
       // input details
       element(by.tagName('button')).click();


       // As the otp is not given,it should alert indicating the same
       var alertDialog = browser.switchTo().alert();
       expect(alertDialog.getText()).toEqual("Invalid OTP!");
       alertDialog.accept(); 
     });

     // No data should alert for errors 
     it('Not giving any input to the otp text box should alert',function(){
       // Create a reference for the inputs 
       var otp=element(by.model('user.otp'));

       // Let the input be null
       otp.sendKeys('');

       // Click the Send Button even after entering the required
       // input details
       element(by.tagName('button')).click();


       // As the otp is not given,it should alert indicating the same
       var alertDialog = browser.switchTo().alert();
       expect(alertDialog.getText()).toEqual("Please correct errors!");
       alertDialog.accept(); 
     });
 
     // Boundary test
     it('To check for the limit that can be given to the text box',function(){
       // Create a reference for the inputs 
       var otp=element(by.model('user.otp'));

       // Let the input be null
       otp.sendKeys('45778234657');

       // Click the Send Button even after entering the required
       // input details
       element(by.tagName('button')).click();


       // As the otp is not given,it should alert indicating the same
       var alertDialog = browser.switchTo().alert();
       expect(alertDialog.getText()).toEqual("Invalid OTP!");
       alertDialog.accept(); 
     });

     // No data should alert for errors 
     it('Not giving any input to the otp text box should alert',function(){
       // Create a reference for the inputs 
       var otp=element(by.model('user.otp'));

       // Let the input be null
       otp.sendKeys('');

       // Click the Send Button even after entering the required
       // input details
       element(by.tagName('button')).click();


       // As the otp is not given,it should alert indicating the same
       var alertDialog = browser.switchTo().alert();
       expect(alertDialog.getText()).toEqual("Please correct errors!");
       alertDialog.accept(); 
     });
   });
   
  /** TC_05              : To Check for log-in page
   *
   *  PRE-CONDITIONS     : 1.Run the application.
   *                       2.Place this file's path in specs option in config file
   *                         that is required to run protractor.
   *                       3.Give the application's url in the baseUrl option in
   *                         in config file that is required to run protractor.
   *                       4.Run the command:
   *                         protractor [Path for the config file]
   **/ 
   describe('login Page',function()
  {
     beforeEach(function(){
                               browser.get('http://localhost:3004/#/login');                       
                          });

     // Give the correct user-Name and password
     it('Just check if the URL changes if login is performed correctly',function(){
       //user.password,user.firstname
       var firstname=element(by.model('user.firstname'));
       var password=element(by.model('user.password'));

       // Give correct user-name and password
       firstname.sendKeys('676');
       password.sendKeys('p');

       // Click on submit button
       element(by.tagName('button')).click();
       
       browser.getCurrentUrl().then(function(url) 
       {
         expect(url).toBe("http://localhost:3004/#/searchvendor"); 
       });
     
     });

     // Give the correct user-Name and password,
     // enter key should work as submit
     it('Just check if the URL changes if login is performed correctly(By clicking on ENTER Key rather than the Submit button )',function(){
       //user.password,user.firstname
       var firstname=element(by.model('user.firstname'));
       var password=element(by.model('user.password'));

       // Give correct user-name and password
       firstname.sendKeys('676');
       password.sendKeys('p');

       // Click on the enter
       browser.actions().sendKeys(protractor.Key.ENTER).perform();
       
       browser.getCurrentUrl().then(function(url) 
       {
         expect(url).toBe("http://localhost:3004/#/searchvendor"); 
       });
     });

     // Give blank for userName and password,which should'nt
     // redirect
     it('Just check if the URL doesnt change if first-name and last-name are given as blank',function(){
       //user.password,user.firstname
       var firstname=element(by.model('user.firstname'));
       var password=element(by.model('user.password'));

       // Give correct user-name and password
       firstname.sendKeys('');
       password.sendKeys('');

       // Click on submit button
       element(by.tagName('button')).click();
       
       // It should not re-direct to search-vendor
       // page
       browser.getCurrentUrl().then(function(url) 
       {
         expect(url).toBe("http://localhost:3004/#/login"); 
       });
     });

     // Using the TAB for log-in
     // Give the correct user-Name and password
     it('Check for TAB',function(){
       //user.password,user.firstname
       var firstname=element(by.model('user.firstname'));
       var password=element(by.model('user.password'));

       // Give correct user-name and password
       firstname.sendKeys('676');
       password.sendKeys('p');

       // Stay on the user-name text box and click
       // TAB,so that the focus changes to the next
       // text box
       firstname.sendKeys(protractor.Key.TAB);
       browser.sleep(3000); // 3s to take a look ;)

       // Again click on TAB now it should point to the 
       // next element which is button
       browser.actions().sendKeys(protractor.Key.TAB).perform();
       browser.sleep(3000); // 3s to take a look ;)

       // Click on submit button
       element(by.tagName('button')).click();
       
       browser.getCurrentUrl().then(function(url) 
       {
         expect(url).toBe("http://localhost:3004/#/searchvendor"); 
       });
     
     });

     // Enter a valid username and invalid password
     it('Enter a correct userName and invalid password',function(){
       //user.password,user.firstname
       var firstname=element(by.model('user.firstname'));
       var password=element(by.model('user.password'));
     
       // Give valid username and invalid password
       firstname.sendKeys('676');
       password.sendKeys('p1');

       // Click on submit button
       element(by.tagName('button')).click();      

       // It should alert "Login Error!\nInvalid username or password."
       var alertDialog = browser.switchTo().alert();
       expect(alertDialog.getText()).toEqual("Login Error!\nInvalid username or password.");
       alertDialog.accept();
    });

    // Enter a invalid username and valid password
    it('Enter a invalid userName and correct password',function(){
      //user.password,user.firstname
      var firstname=element(by.model('user.firstname'));
      var password=element(by.model('user.password'));
     
      // Give invalid username and valid password
      firstname.sendKeys('6761');
      password.sendKeys('p');

      // Click on submit button
      element(by.tagName('button')).click();      

      // It shouldn't re-direct to the search-vendor page 
      // and should alert
      var alertDialog = browser.switchTo().alert();
      expect(alertDialog.getText()).toEqual("Login Error!\nInvalid username or password.");
      alertDialog.accept();
    });

    // Enter a blank username and blank password
    it('Enter a invalid userName and correct password',function(){
      //user.password,user.firstname
      var firstname=element(by.model('user.firstname'));
      var password=element(by.model('user.password'));
     
      // Give blank username and blank password
      firstname.sendKeys('');
      password.sendKeys('');

      // Click on submit button
      element(by.tagName('button')).click();      

      // URL should not be re-directed
      browser.getCurrentUrl().then(function(url) 
      {
         expect(url).toBe("http://localhost:3004/#/login"); 
      });
    });

    // Enter a blank username and valid password
    it('Enter a blank username and valid password',function(){
      //user.password,user.firstname
      var firstname=element(by.model('user.firstname'));
      var password=element(by.model('user.password'));
     
      // Give blank username and valid password
      firstname.sendKeys('');
      password.sendKeys('p');

      // Click on submit button
      element(by.tagName('button')).click();

      browser.sleep(5000);      

      // It shouldn't re-direct to the search-vendor page 
      // and should alert
      var alertDialog = browser.switchTo().alert();
      expect(alertDialog.getText()).toEqual("Login Error!\nInvalid username or password.");
      alertDialog.accept();
    });

    // Enter a valid username and blank password
    it('Enter a valid username and blank password',function(){
      //user.password,user.firstname
      var firstname=element(by.model('user.firstname'));
      var password=element(by.model('user.password'));
     
      // Give blank username and valid password
      firstname.sendKeys('676');
      password.sendKeys('');

      // Click on submit button
      element(by.tagName('button')).click();

      browser.sleep(5000);      

      // It shouldn't re-direct to the search-vendor page 
      // and should alert
      var alertDialog = browser.switchTo().alert();
      expect(alertDialog.getText()).toEqual("Login Error!\nInvalid username or password.");
      alertDialog.accept();
    });

    // Enter a invalid username and invalid password
    it('Enter a invalid username and invalid password',function(){
      //user.password,user.firstname
      var firstname=element(by.model('user.firstname'));
      var password=element(by.model('user.password'));
     
      // Give blank username and valid password
      firstname.sendKeys('6761');
      password.sendKeys('p1');

      // Click on submit button
      element(by.tagName('button')).click();

      browser.sleep(5000);      

      // It shouldn't re-direct to the search-vendor page 
      // and should alert
      var alertDialog = browser.switchTo().alert();
      expect(alertDialog.getText()).toEqual("Login Error!\nInvalid username or password.");
      alertDialog.accept();
    });

    // Check if case-sensitivity is handled well
    it('To Check the case-sensitivity',function(){
      var firstname=element(by.model('user.firstname'));
      var password=element(by.model('user.password'));
     
      // Give blank username and valid password
      firstname.sendKeys('676');
      password.sendKeys('P');

      // Click on submit button
      element(by.tagName('button')).click();

      // It shouldn't re-direct to the search-vendor page 
      // and should alert
      var alertDialog = browser.switchTo().alert();
      expect(alertDialog.getText()).toEqual("Login Error!\nInvalid username or password.");
      alertDialog.accept();
    });

    // Check if log-in page appears after logging-out and clicking 
    // on the back button of the browser driver.navigate().back();
    it('Check if on selecting back button (after logging out) if the user is not signed in',function(){
      // First log-in
      var firstname=element(by.model('user.firstname'));
      var password=element(by.model('user.password'));

      // Give blank username and valid password
      firstname.sendKeys('676');
      password.sendKeys('p');

      // Click on submit button
      element(by.tagName('button')).click();

      // Log-out
      //element(by.css('.pull-right glyphicon glyphicon-log-out')).click();
      //element(by.tagName('span')).get(1).click();
      element.all(by.css('.pull-right glyphicon glyphicon-log-out')).click();
      
      browser.sleep(400);

      browser.navigate().back();

      // URL should be log-in page
      browser.getCurrentUrl().then(function(url) 
      {
         expect(url).toBe("http://localhost:3004/#/login"); 
      });
    });

      it('Check if log-in screen appears after logging out',function(){
        // First log-in
        var firstname=element(by.model('user.firstname'));
        var password=element(by.model('user.password'));

        // Give blank username and valid password
        firstname.sendKeys('676');
        password.sendKeys('p');

        // Click on submit button
        element(by.tagName('button')).click();

        // Log-out
        //element(by.css('.pull-right glyphicon glyphicon-log-out')).click();
        //element(by.tagName('span')).get(1).click();
        element.all(by.css('.pull-right glyphicon glyphicon-log-out')).click();
      
        browser.sleep(400);
 
        // URL should be log-in page
        // TESTS:after logging-out searchvendor page appears
        // and not log-in page
        // TESTS:Other browsers
        //       URL manipulation
        // TESTS:multipleaccounts from samenIP
        browser.getCurrentUrl().then(function(url) 
        {
           expect(url).toBe("http://localhost:3004/#/searchvendor"); 
        });
      });
      /**TESTS:PASTE is working on pasword text-box
      // Copy pasting the password must not be allowed
      it('Check for an alert message if password is pasted',function(){
        // elem.send_keys(Keys.CONTROL, 'c') #copy
        // elem.send_keys(Keys.CONTROL, 'v') #paste 8084557382

        // First log-in
        var firstname=element(by.model('user.firstname'));
        var password=element(by.model('user.password'));

        // Give blank username and valid password
        // Here though userName and password are
        // same still that should result in login
        // error
        // elm.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, "v"));
        firstname.sendKeys('8084557382');
        // firstname.sendkeys(browser.Key.CONTROL, 'c'); 
        firstname.sendKeys(protractor.Key.CONTROL, 'a');
        firstname.sendKeys(protractor.Key.CONTROL, 'c');
        browser.sleep(400);
        // password.sendkeys(browser.Key.CONTROL, 'v');
        password.sendKeys(protractor.Key.CONTROL, 'v');

        // Click on submit button
        element(by.tagName('button')).click();

       // It shouldn't re-direct to the search-vendor page 
      // and should alert
      var alertDialog = browser.switchTo().alert();
      expect(alertDialog.getText()).toEqual("Login Error!\nInvalid username or password.");
      alertDialog.accept();

      });**/
    // Dont log-in,but try all the urls possible
    /**TESTS
    it('Check for an alert message if a user doesnt log-in',function(){
      browser.get('http://localhost:3004/#/validateotp');

      // It should an alert that displays log-in error or redirect to the log-in page
      browser.getCurrentUrl().then(function(url) 
      {
         expect(url).toBe("http://localhost:3004/#/login"); 
      });

      browser.get('http://localhost:3004/#/inbox');

      // It should an alert that displays log-in error or redirect to the log-in page
      browser.getCurrentUrl().then(function(url) 
      {
         expect(url).toBe("http://localhost:3004/#/login"); 
      });

      browser.get('http://localhost:3004/#/vendors');

      // It should an alert that displays log-in error or redirect to the log-in page
      browser.getCurrentUrl().then(function(url) 
      {
         expect(url).toBe("http://localhost:3004/#/login"); 
      });
      
    });**/    
  });

  /** TC_06              : To Check for search-vendor page
   *
   *  PRE-CONDITIONS     : 1.Run the application.
   *                       2.Place this file's path in specs option in config file
   *                         that is required to run protractor.
   *                       3.Give the application's url in the baseUrl option in
   *                         in config file that is required to run protractor.
   *                       4.Run the command:
   *                         protractor [Path for the config file]
   **/

   /** For the Vendor-List page to work
       first the skill must be chosen
       from search-vendor page,Since there
       is an issue in protractor for
       drop-down
       https://github.com/angular/protractor/issues/480
  describe('Vendor-List page Page',function()
  {
     beforeEach(function(){
                               browser.get('http://localhost:3004/#/vendors');                       
                          });

    it('should contain 104 vendors', function() {

      var vendorList = element.all(by.repeater('row in names'));
      var query = element(by.model('query'));


      expect(vendorList.count()).toBe(104);
    });
  });**/

  /** TC_06              : To Check for inbox page
   *
   *  PRE-CONDITIONS     : 1.Run the application.
   *                       2.Place this file's path in specs option in config file
   *                         that is required to run protractor.
   *                       3.Give the application's url in the baseUrl option in
   *                         in config file that is required to run protractor.
   *                       4.Run the command:
   *                         protractor [Path for the config file]
   **/
  describe('Inbox Page',function()
  {

   beforeEach(function(){
     // First Log-in for the list to work
     browser.get('http://localhost:3004/#/login');

     // Enter correct user-Name and password
     //user.password,user.firstname
     var firstname=element(by.model('user.firstname'));
     var password=element(by.model('user.password'));

     // Give correct user-name and password
     firstname.sendKeys('676');
     password.sendKeys('p');

     // Click on submit button
     element(by.tagName('button')).click();
   });

   // Transaction list view
   it('Transaction list view', function() {

     // Go to the Search-vendor page
     browser.get("http://localhost:3004/#/searchvendor");

     browser.sleep(400);

    // Get the inbox page
    element(by.tagName('span')).click();
     

    var transactionList = element.all(by.repeater('row in messages'));
    var query = element(by.model('query'));

    // There are two transactions of that user
    expect(transactionList.count()).toBe(10);

    // If the String 'Actor' is entered in search box
    // the list should contain only 8 records of
    // inbox
    query.sendKeys('Actor');
    expect(transactionList.count()).toBe(8);

    // Clear the search box entry
    query.clear();
    
    // Again send "sentRequest",the list should
    // contain only 5 records
    query.sendKeys('sentRequest');
    expect(transactionList.count()).toBe(6);

    // Clear the search box entry
    query.clear();
    
    // Again send "receivedQuotation",the list should
    // contain only 1 record
    query.sendKeys('receivedQuotation');
    expect(transactionList.count()).toBe(2);

    browser.sleep(4000);

     query.clear();

    // Click on the icon that takes to the 
    // transaction-detail page
    element(by.tagName('span')).click();

    browser.sleep(400);

    // URL should not be re-directed
    browser.getCurrentUrl().then(function(url) 
    {
      expect(url).toBe("http://localhost:3004/#/inbox/:%5Bobject%20Object%5D"); 
    });

    browser.sleep(2000);

    // The vendor List in the transaction details
    // should include 2 vendors as per the database.
    var vendorList = element.all(by.repeater('vendor in transaction.vendorList'));
    expect(vendorList.count()).toBe(1);

    // Vendor names must be Venkat Kanduri and Anusha Kanduri
    element.all(by.tagName('span')).then(function(posts) {
      var firstElement = posts[0];
      expect(firstElement.getText()).toEqual('Matilda Ruso');
   });
});
   
   it('Should display the correct image', function() {

     // Go to the Search-vendor page
     browser.get("http://localhost:3004/#/searchvendor");

     browser.sleep(400);

     // Get the inbox page
     element(by.tagName('span')).click();

     var transactionList = element.all(by.repeater('row in messages'));

     // Click on the third element
     element.all(by.tagName('span')).then(function(posts) {
       var thirdElement = posts[2];
       thirdElement.click();
     });
 
      // This is the correct src for docImage:"../img/estimate_5395.jpg"
      expect(element(by.tagName('img')).getAttribute('ng-src')).toMatch("../img/estimate_5393.jpg");
      browser.sleep(4000);
   });
});

// To Check for the vendor list control
  /** TC_07              : To Check for the vendor list control
   *
   *  PRE-CONDITIONS     : 1.Run the application.
   *                       2.Place this file's path in specs option in config file
   *                         that is required to run protractor.
   *                       3.Give the application's url in the baseUrl option in
   *                         in config file that is required to run protractor.
   *                       4.Run the command:
   *                         protractor [Path for the config file]
   **/
   describe('Vendor Page',function()
   {
     beforeEach(function(){
       // First Log-in for the list to work
       browser.get('http://localhost:3004/#/login');

       // Enter correct user-Name and password
       //user.password,user.firstname
       var firstname=element(by.model('user.firstname'));
       var password=element(by.model('user.password'));

       // Give correct user-name and password
       firstname.sendKeys('676');
       password.sendKeys('p');

       // Click on submit button
       element(by.tagName('button')).click();
     });
     it('Vendor List',function(){
       
     // Go to the Search-vendor page
     browser.get("http://localhost:3004/#/searchvendor");

    
     // Link for the same
     // https://github.com/angular/protractor/issues/480
     /**var vendorType = element.all(by.repeater('vendorType in vendorTypeList'));
     expect(element(by.tagName('option'))).toBe(4);**/


     });
   });
   
  /** TC_07              : To Check for validate-otp page
   *
   *  PRE-CONDITIONS     : 1.Run the application.
   *                       2.Place this file's path in specs option in config file
   *                         that is required to run protractor.
   *                       3.Give the application's url in the baseUrl option in
   *                         in config file that is required to run protractor.
   *                       4.Run the command:
   *                         protractor [Path for the config file]
   **/
   describe('Validate-otp page',function()
   {
     beforeEach(function(){
       browser.get('http://localhost:3004/#/validateotp');
     });

     // Not giving any input,should result in an
     // alert stating "Please correct errors!"
     it('Check for the alert when nothing is entered as otp',function(){
       // Click on submit button
       element(by.tagName('button')).click();

       // As the otp is blank,it should alert indicating the same
       var alertDialog = browser.switchTo().alert();
       expect(alertDialog.getText()).toEqual("Please correct errors!");
       alertDialog.accept();

     });

     // Not giving a valid otp,should result in an
     // alert stating "Invalid OTP!"
     it('Check for the alert when invalid otp is entered',function(){
       // Enter a six digit number
       var otp=element(by.model('user.otp'));
       otp.sendKeys('897054');

       // Click on submit button
       element(by.tagName('button')).click();

       // As the otp is blank,it should alert indicating the same
       var alertDialog = browser.switchTo().alert();
       expect(alertDialog.getText()).toEqual("Invalid OTP!");
       alertDialog.accept();
     });

     // If the correct otp is entered,then there should
     // be re-direction to searchvendor page
     it('Check for the redirection when the correct otp is entered',function(){
       // First log-in
       browser.get('http://localhost:3004/#/login');

       var firstname=element(by.model('user.firstname'));
       var password=element(by.model('user.password'));

       // Give correct user-name and password
       firstname.sendKeys('456');
       password.sendKeys('sdf');

       // Click on submit button of log-in page
       element(by.tagName('button')).click();

       browser.get('http://localhost:3004/#/validateotp');
       

       var otp=element(by.model('user.otp'));
       otp.sendKeys('91084');

       // Click on submit button
       element(by.tagName('button')).click();


       var alertDialog = browser.switchTo().alert();
       expect(alertDialog.getText()).toEqual("You have successfully logged out");
       alertDialog.accept();

       // As the otp is blank,it should alert indicating the same
       browser.getCurrentUrl().then(function(url) 
       {
         expect(url).toBe("http://localhost:3004/#/login"); 
       });
     });


  // Just prefix a string containing some special characters
  // and give the same as otp,it should alert
  // ""
  // First prepare the prefix for the first name that
  // contains special characters
  it('Just Prefix some random characters,which should alert as "Please correct errors!"',function()
  {
    var allowedChars = ".\+*?[^]$(){}=!<>|:-";
    var stringLength = 6;
    var randomstring = '';

    for (var i=0; i<stringLength; i++) 
    {
      var rnum = Math.floor(Math.random() * allowedChars.length);
      randomstring += allowedChars.substring(rnum,rnum+1);
    }

    // Enter a six digit number
    var otp=element(by.model('user.otp'));
    otp.sendKeys(randomstring+'897054');

    // Click on submit button
    element(by.tagName('button')).click();

    // As the otp is blank,it should alert indicating the same
    var alertDialog = browser.switchTo().alert();
    expect(alertDialog.getText()).toEqual("Please correct errors!");
    alertDialog.accept();
  });

  // Check for the tabs,that is if the user is able to move to 
  // the next input field in the form
  it('Checks For the Tab',function()
  {
    // Create a reference for the inputs 
    var otp=element(by.model('user.otp'));
                                           
    // Just enter TAB at the firstname's input field
    otp.sendKeys(protractor.Key.TAB);
    browser.sleep(400);
    browser.actions().sendKeys(protractor.Key.TAB).perform();
    browser.sleep(400);
  });

  // Give a random text to otp
  it('Giving random string as value to otp',function(){
    // Code to generate a random string
    // The following block generates a random email string 
    var allowedChars = "abcdefghiklmnopqrstuvwxyz";
    var stringLength = 6;
    var randomstring = '';

    for (var i=0; i<stringLength; i++) {
      var rnum = Math.floor(Math.random() * allowedChars.length);
      randomstring += allowedChars.substring(rnum,rnum+1);
    }

    // Create a reference for the inputs 
    var otp=element(by.model('user.otp'));
    otp.sendKeys(randomstring);

    // Click on submit button
    element(by.tagName('button')).click();

    // As the otp contains string,it should alert indicating the same
    var alertDialog = browser.switchTo().alert();
    expect(alertDialog.getText()).toEqual("Please correct errors!");
    alertDialog.accept();
  });
});
  
  // Tests Based on API

  /** TC_08              : To Check the API getServiceTypeList
   *
   *  PRE-CONDITIONS     : 1.Run the application.
   *                       2.Place this file's path in specs option in config file
   *                         that is required to run protractor.
   *                       3.Give the application's url in the baseUrl option in
   *                         in config file that is required to run protractor.
   *                       4.Run the command:
   *                         protractor [Path for the config file]
   **/
   describe('getServiceTypeList API ',function()
   {
     beforeEach(function(){
       browser.get('http://localhost:3004/#/searchvendor');
     });

     // Get the values in the drop-down
     it('Check the values in the drop-down',function(){
       // First element in skill is Technical Writer
       expect(element.all(by.tagName('option')).get(1).getText()).toEqual("Technical Writer");

       // Second element in skill is Programmer
       expect(element.all(by.tagName('option')).get(2).getText()).toEqual("Programmer");

       // Third element in skill is Soft Skills Trainer
       expect(element.all(by.tagName('option')).get(3).getText()).toEqual("Soft Skills Trainer");

       // Fourth element in skill is Actor
       expect(element.all(by.tagName('option')).get(4).getText()).toEqual("Actor");
     });
   });

  /** TC_09               : To Check the API getVendorList
   *
   *  PRE-CONDITIONS      : 1.Run the application.
   *                        2.Place this file's path in specs option in config file
   *                          that is required to run protractor.
   *                        3.Give the application's url in the baseUrl option in
   *                          in config file that is required to run protractor.
   *                        4.Run the command:
   *                          protractor [Path for the config file]
   **/
   describe('getVendorList API ',function()
   {
     beforeEach(function(){
       browser.get('http://localhost:3004/#/searchvendor');
     });
     
     it('Check For the vendors having the skill"Technical Writer"',function(){
       element.all(by.tagName('option')).get(1).click();

       // vendor.pinCode
       var areaPincode=element(by.model('vendor.pinCode'));
       areaPincode.sendKeys('560078');

       // vendor.date
       var date=element(by.model('vendor.date'));
       date.sendKeys('1992-01-22');

       // 12:05:30
       // vendor.time
       var time=element(by.model('vendor.time'));
       time.sendKeys('12:05:30');

       // Click the Submit Button even after entering the required
       // input details
      element(by.tagName('button')).click();

       // Check if the number of vendors in the vendor-list is 10
       var vendorList = element.all(by.repeater('row in names'));
       expect(vendorList.count()).toBe(10);
       
       browser.sleep(400);

       // Click on the icon that is present in the right side
       // that will re-direct to
        element(by.css('.pull-right')).click();

        browser.sleep(400);

       // URL should not be re-directed
       browser.getCurrentUrl().then(function(url) 
       {
         expect(url).toBe("http://localhost:3004/#/vendors/:%5Bobject%20Object%5D"); 
       });
     });
   });

  /** TC_10               : To Check the API getInboxData
   *
   *  PRE-CONDITIONS      : 1.Run the application.
   *                        2.Place this file's path in specs option in config file
   *                          that is required to run protractor.
   *                        3.Give the application's url in the baseUrl option in
   *                          in config file that is required to run protractor.
   *                        4.Run the command:
   *                          protractor [Path for the config file]
   **/
   describe('getInboxData API ',function()
   {
     beforeEach(function(){
       // The user must log -in for the getInboxData to work
       browser.get('http://localhost:3004/#/login');
     });

     it('Check for the customer 676896845',function(){

       var firstname=element(by.model('user.firstname'));
       var password=element(by.model('user.password'));

       // Give correct user-name and password
       firstname.sendKeys('676896845');
       password.sendKeys('password');

       // Click on submit button of log-in page
       element(by.tagName('button')).click();

      // Click on the inbox-button to acess the mails
      element(by.tagName('span')).click();

      // Check if the number of mails was 1
      var inboxList = element.all(by.repeater('row in messages'));

      // There are two transactions of that user
      expect(inboxList.count()).toBe(1);
     });
   
     it('Check for the customer 676',function(){

       var firstname=element(by.model('user.firstname'));
       var password=element(by.model('user.password'));

       // Give correct user-name and password
       firstname.sendKeys('676');
       password.sendKeys('p');

       // Click on submit button of log-in page
       element(by.tagName('button')).click();

      // Click on the inbox-button to acess the mails
      element(by.tagName('span')).click();

      // Check if the number of mails was 10
      var inboxList = element.all(by.repeater('row in messages'));

      // There are two transactions of that user
      expect(inboxList.count()).toBe(10);
     });

     it('Check for the customer 23',function(){

       var firstname=element(by.model('user.firstname'));
       var password=element(by.model('user.password'));

       // Give correct user-name and password
       firstname.sendKeys('23');
       password.sendKeys('e3r');

       // Click on submit button of log-in page
       element(by.tagName('button')).click();

      // Click on the inbox-button to acess the mails
      element(by.tagName('span')).click();

      // Check if the number of mails was 1
      var inboxList = element.all(by.repeater('row in messages'));

      // There are two transactions of that user
      expect(inboxList.count()).toBe(1);
     });

     it('Check for the customer 676896868',function(){

       var firstname=element(by.model('user.firstname'));
       var password=element(by.model('user.password'));

       // Give correct user-name and password
       firstname.sendKeys('676896868');
       password.sendKeys('password');

       // Click on submit button of log-in page
       element(by.tagName('button')).click();

      // Click on the inbox-button to acess the mails
      element(by.tagName('span')).click();

      // Check if the number of mails was 5
      var inboxList = element.all(by.repeater('row in messages'));

      // There are two transactions of that user
      expect(inboxList.count()).toBe(5);
     });
   });
   
  /** TC_11               : To Check the API getServiceTypeList
   *
   *  PRE-CONDITIONS      : 1.Run the application.
   *                        2.Place this file's path in specs option in config file
   *                          that is required to run protractor.
   *                        3.Give the application's url in the baseUrl option in
   *                          in config file that is required to run protractor.
   *                        4.Run the command:
   *                          protractor [Path for the config file]
   **/
   describe('getServiceTypeList API ',function()
   {
     beforeEach(function(){
       // Go to the searchvendor page
       browser.get('http://localhost:3004/#/searchvendor');
     });
     // Check if the correct services are displayed in the drop-down menu
     // Get the values in the drop-down
     it('Giving random string as value to otp',function(){
       // First element in skill is Technical Writer
       expect(element.all(by.tagName('option')).get(1).getText()).toEqual("Technical Writer");

       // Second element in skill is Programmer
       expect(element.all(by.tagName('option')).get(2).getText()).toEqual("Programmer");

       // Third element in skill is Soft Skills Trainer
       expect(element.all(by.tagName('option')).get(3).getText()).toEqual("Soft Skills Trainer");

       // Fourth element in skill is Actor
       expect(element.all(by.tagName('option')).get(4).getText()).toEqual("Actor");
     });
   });

  /** TC_12               : To Check the API getTransactionDetails
   *
   *  PRE-CONDITIONS      : 1.Run the application.
   *                        2.Place this file's path in specs option in config file
   *                          that is required to run protractor.
   *                        3.Give the application's url in the baseUrl option in
   *                          in config file that is required to run protractor.
   *                        4.Run the command:
   *                          protractor [Path for the config file]
   **/
   describe('getTransactionDetails API ',function()
   {
     beforeEach(function(){
       // Go to the searchvendor page
       browser.get('http://localhost:3004/#/login');
     });
    
     it('Check getTransactionDetails',function()
     {
       // First log-in
       var firstname=element(by.model('user.firstname'));
       var password=element(by.model('user.password'));

       // Give correct user-name and password
       firstname.sendKeys('676');
       password.sendKeys('p');

       // Click on submit button of log-in page
       element(by.tagName('button')).click();

       // Click on the inbox-button to acess the mails
       element(by.tagName('span')).click();

       // Click on the first mail
       element(by.css('.pull-right')).click();

       // URL should not be re-directed
       browser.getCurrentUrl().then(function(url) 
       {
         expect(url).toBe("http://localhost:3004/#/inbox/:%5Bobject%20Object%5D"); 
       });

       // Now check for the vendor name,i.e if they are the same
       // Check if the number of mails was 5
       var inboxList = element.all(by.repeater('vendor in transaction.vendorList'));
       expect(element(by.tagName('span')).getText()).toBe("Matilda Ruso");
       
     });
   });
  
  /** TC_13               : To Check the API getVendorDetails
   *
   *  PRE-CONDITIONS      : 1.Run the application.
   *                        2.Place this file's path in specs option in config file
   *                          that is required to run protractor.
   *                        3.Give the application's url in the baseUrl option in
   *                          in config file that is required to run protractor.
   *                        4.Run the command:
   *                          protractor [Path for the config file]
   **/
   describe('getVendorDetails API ',function()
   {
     beforeEach(function(){
       // First log-in
       browser.get("http://localhost:3004/#/searchvendor");
       });

     it('',function(){
       // Enter the details of the vendor to be searched
       element.all(by.tagName('option')).get(2).click();

       // vendor.pinCode
       var areaPincode=element(by.model('vendor.pinCode'));
       areaPincode.sendKeys('560078');

       // vendor.date
       var date=element(by.model('vendor.date'));
       date.sendKeys('1992-01-22');

       // vendor.time
       var time=element(by.model('vendor.time'));
       time.sendKeys('12:05:30');

       // Click the Submit Button even after entering the required
       // input details
       element(by.tagName('button')).click();

       // Check if the number of vendors in the vendor-list is 10
       var vendorList = element.all(by.repeater('row in names'));
       expect(vendorList.count()).toBe(10);
       
       browser.sleep(400);

       // Click on the icon that is present in the right side
       // that will re-direct to
        element(by.css('.pull-right')).click();

        browser.sleep(400);

       // URL should not be re-directed
       browser.getCurrentUrl().then(function(url) 
       {
         expect(url).toBe("http://localhost:3004/#/vendors/:%5Bobject%20Object%5D"); 
       });
     })
   });
