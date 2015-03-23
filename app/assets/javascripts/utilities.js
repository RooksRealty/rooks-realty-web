var Utilities = Utilities || {};

 Utilities.helpers = {
   formatPhoneNumber: function(phoneNumber) {
     if(phoneNumber) {
		var numbers = phoneNumber.replace(/\D/g, ''),
	        char = {0:'(',3:') ',6:'-'};
	    phoneNumber = '';
	    for (var i = 0; i < numbers.length; i++) {
	        phoneNumber += (char[i]||'') + numbers[i];
	    }
	    return phoneNumber;
	 }
   }
 };
