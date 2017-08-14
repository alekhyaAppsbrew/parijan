
   // Include the file responsible for
   // writing log file
   var fs = require('fs');

   /** logout() is used to logout
    *  the user
    *  Input:Nil  
    *  Output:A boolean     
    **/
  function logout(request,response)
  {
    
      if(request.session.userName)
      { 
        
        // If the session is active just 
        // destroy the session
        request.session.destroy(function(){

          fs.appendFile('log',"\n URL :/logout - API NAME :logout  METHOD TYPE : GET \nOUTPUT:true\n------------------------------------------------------------------------------" ,function()
          {
            // Sends 1 if properly logged out
            response.send( new Boolean(1));
          });

      });

      }
      else
      {
        fs.appendFile('log',"\n URL :/logout - API NAME :logout  METHOD TYPE : GET \nOUTPUT:false\n------------------------------------------------------------------------------" ,function()
        {
          // Sends 0 if not logged out
          response.send( new Boolean(0));
        });

      }

  } 
  
  
 module.exports=logout;
