
   // Include the file responsible for
   // writing log file
   var fs = require('fs');

   /** getLoginStatus() is used to get
    *  the log-in status
    *  Input:Nil  
    *  Output:1.Login-Status:
    *           a)true,If any user has loged-in 
    *           b)false,If any user hasn't loged-in
    *
    **/
  function getLoginStatus(request,response)
  {
    
      if(request.session.userName)
      { 
        // If the session is active just 
        // send true
        fs.appendFile('log',"\n URL :/getLoginStatus - API NAME :getLoginStatus  METHOD TYPE : GET \nOUTPUT:true\n------------------------------------------------------------------------------" ,function()
          {
            // Sends 1 if a session is active
            response.send( new Boolean(1));
          });
      }
      else
      {
        fs.appendFile('log',"\n URL :/getLoginStatus - API NAME :getLoginStatus  METHOD TYPE : GET \nOUTPUT:false\n------------------------------------------------------------------------------" ,function()
        {
          // Sends 0 if a session is not active
          response.send( new Boolean(0));
        });

      }

  } 
  
  
 module.exports=getLoginStatus;
