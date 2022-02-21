import isEmail from 'validator/lib/isEmail';

function FixUpEmail(email) {

    if(isEmail(email)===false){

        return false
    }
    else{
        email = email.toLowerCase();
        let arr = email.split('@');
        let domain = arr[1];
        let preFix = arr[0];
        
        if(domain ==='gmail.com'){ 

          function testReplace(sentence) {

            return sentence.replace(/["."]/g, "");
          }
          let fixed =  testReplace(preFix)

          return fixed+"@"+domain  
        }  
        return email
      }
    
}
export default FixUpEmail