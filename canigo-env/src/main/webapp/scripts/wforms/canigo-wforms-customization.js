// wForms - a javascript extension to web forms.
// Customization for canigo

//The Repeat behavior preserves the name attribute of radio inputs 
// accross repeated elements, effectively expanding the radio group. 
// Set to false to make repeated radio inputs independant.
wf.preserveRadioName = true; // default: true.

wf.showAlert = function (nbTotalErrors) {
	alert("My show alert");
    alert(self.arrErrorMsg[8].replace(?%%?,nbTotalErrors));
}

// The validation routine will display an alert box if there's an error, with the message in wf.arrErrorMsg[8]
wf.showAlertOnError = false; // default: true. 
// Error message displayed in the alert box.
wf.arrErrorMsg[8] = "%% error(s) detected. Your form has not been submitted yet.\nPlease check the information you provided."; // %% will be replaced by the actual number of errors.

// overwrite the default form submission handler with a custom one.
wf.functionName_formValidation = "customValidation";


}

//evt : onSubmit event
function customValidation(evt) {
	
	if(wf.formValidation(evt)) {	// call the default error management.

		// basic wForms Validation Ok... can do other stuff here
		// if validation not ok, use return wf.utilities.XBrowserPreventEventDefault(e);  
		
	} else {
		return wf.utilities.XBrowserPreventEventDefault(evt);  // will prevent the form from being submitted.
	}
}
