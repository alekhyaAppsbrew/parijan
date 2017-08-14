
  /** checkSession() is used to see
   *  if the session is active or not 
   *  Input : A reference to the request object  
   *  Output: A json object which contains
   *          user-details is sent as response
  **/

  function checkSession(session)
  {
     if(session==undefined)
     {
     
       // If the session is undefined return 0
       return 0;

     }
     else
     {

       // If the session is undefined return 0
       return 1;
     
     }
    
   }
 module.exports =checkSession;
