
  /** unsetSession() is used to unset
   *  the session  
   *  Input : A reference to the request object  
  **/

  function unsetSession(request)
  {
     request.session.userName=undefined;   
    
  }
 module.exports =unsetSession;
