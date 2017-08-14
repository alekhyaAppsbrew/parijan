INSTALL
-------
 Download and copy the archive 'usermanagement.tar' to install area(Example '~/INSTALL' ).

RUN
-------
 1. Start server that runs on port 3004.
    Goto location '~/INSTALL/usermanagement/' and use node to run app.js
      > cd ~/INSTALL/usermanagement/
      > node app.js 
 
 2. Launch Parijan Client webpage.
    Open browser and goto URL 'http://localhost:3004/#/searchvendor'
      a. Search Vendors is the default/home page of the application
      b. Inbox icon next to 'Search Vendors' will redirect to user Inbox page through login page
         (Example: username=676, password=p )
      c. Logout icon at RHS closes server session for the user.

ABOUT
-------
usermanagement/
  |
  |-- lib/              - Contains route_handler.js contains rout handler for server APIs
  |
  |-- model/            - Contains js file related to server APIs
  |
  |-- node_modules/     - Contain node related js files
  |
  |-- views/            - UI used for testing server
  |
  |-- ParijanClientApp/ - Parijan client pages
  |
  |-- test/             - contains protractor tests
  |
  |-- package.json      - for node package installation
  |
  |-- app.js            - Main app js file used to start the server
  |
  |-- project.sql       - SQL DB dump of table "project"
