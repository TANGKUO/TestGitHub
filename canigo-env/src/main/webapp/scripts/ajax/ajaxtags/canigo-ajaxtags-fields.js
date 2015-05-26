var CanigoFieldTag = {
  Version: '1.0'
}

var CanigoTextFieldTag = {
  Version: '1.0'
}



/**
 * Function to obtain the index of a fieldName in a form
 */
function getFormIndex (form, fieldName) {
  var found = false;
  for (var i = 0; i < form.elements.length; i++)
    if ((found = form.elements[i].name == fieldName))
      break;
  return found ? i : -1;
}


/**
 * Extension of Ajax tag Base
 */
 
CanigoFieldTag.Base = function() {};
CanigoFieldTag.Base.prototype = (new AjaxJspTag.Base()).extend({
});


CanigoTextFieldTag.Base = function() {};
CanigoTextFieldTag.Base.prototype = (new CanigoFieldTag.Base()).extend({
});


/******************************************************************************
 * canigo Tooltips behaviour
 * Example of use  :
 * <script type="text/javascript">
 *   new CanigoTextFieldTag.Tooltip(
 *     {
 *           source: "subject",
 * 			 tooltipMessage: "message",
 *           tooltipTitleMessage: "title",
 * 			 tooltipOptions: "options"
 *     });
 * </script>
 ******************************************************************************/
CanigoFieldTag.Tooltip = Class.create();
CanigoFieldTag.Tooltip.prototype=(new CanigoFieldTag.Base()).extend({
 initialize: function(options) {
    this.setOptions(options);

    if (this.options.sourceElem) {
    	var element = this.options.sourceElem;

        // Obtain associated label with 'for' attribute equals to id of this element
		var labels = document.getElementsByTagName("label");			

			
		for (var i = labels.length; --i >= 0;) {
			var l = labels[i];
			
			var forName = this.getForAttributeOfLabel(l);
			if (forName) {
				

				if (forName==element.id) {
					this.options.sourceElem = l;
					// Put cursor as help
					l.style.cursor = "help";
					// Put an href containing label
					
					var element = this.options.sourceElem;
				  	var tooltipMessage = this.options.tooltipMessage;
				  	var tooltipTitleMessage = this.options.tooltipTitleMessage;
				 	var tooltipOptions = this.options.tooltipOptions;
					
					var callTooltip = "domTT_activate(this, event";
					if (tooltipTitleMessage && tooltipTitleMessage!="") {
						callTooltip = callTooltip + ",'caption','" + tooltipTitleMessage + "'";
					}
					
					if (tooltipMessage && tooltipMessage!="") {
						callTooltip = callTooltip + ",'content','" + tooltipMessage + "'";
					} 
				
					
				
					if (tooltipOptions && tooltipOptions!="") {
						callTooltip = callTooltip + "," + tooltipOptions;
					} else {
						callTooltip = callTooltip + ",'trail','x'";		
					}
				
					callTooltip = callTooltip + ");";	
					
					var callFunction = "on" + this.options.eventType + "=\"";
					callFunction = callFunction + callTooltip
					callFunction = callFunction + "\"";
					
					l.innerHTML = "<a class='tooltip' href=\"javascript:void(0)\"" + callFunction + ">" + l.innerHTML.toString() + "</a>";														
					//alert(l.innerHTML)
				}
			}
				
		}
    }    
    	
    
  },

  /* Depending on browser the DOM of attribute 'for' of label has been defined in different attribute? */
  getForAttributeOfLabel:function(label) {
  	var forLabel = label.getAttribute("htmlFor");
	if (!forLabel) {
  		forLabel = label.getAttribute("for");  		    	
  	}
 	return forLabel;
  },


  setOptions: function(options) {
    this.options = {
      sourceElem: $(options.source),
      eventType: options.eventType ? options.eventType : "mouseover"
    }.extend(options || {});
  }
});



/******************************************************************************
 * canigo Calendar behaviour
 * An image with icon will be generated
 * Example of use  :
 * <script type="text/javascript">
 *   new CanigoTextFieldTag.Calendar(
 *     {
 *           source: "source",
 * 			 datePattern: "dd/MM/yyyy"
 *     });
 * </script>
 ******************************************************************************/
CanigoTextFieldTag.Calendar = Class.create();
CanigoTextFieldTag.Calendar.prototype=(new CanigoTextFieldTag.Base()).extend({
 initialize: function(options) {
    this.setOptions(options);
    if (this.options.sourceElem) {
    
    	// EVC: added class attribute to img tag.
    	// First generate <img> tag with image
    	var sourceElemId = this.options.sourceElem.id;
    	var calendarId = sourceElemId + "-calendar";
    	var content = "<img src=\""+contextPath+"/images/calendars/calendar.gif\" class=\"calendarImageClass\" id=\"" +  calendarId + "\"";
    	content = content + " style=\"cursor:pointer;border:0px solid;\"";
    	content = content + "/>";
    	new Insertion.After(this.options.sourceElem,content);
    	
    	var dynarchDateFormat = this.getDynarchDateFormat(this.options.datePattern);
    	
    	var calendarCall = "Calendar.setup({";
    	calendarCall+= "inputField:\"" + this.options.sourceElem.id + "\",";
    	calendarCall+= "ifFormat:\"" + dynarchDateFormat + "\",";
    	calendarCall+= "button:\"" + calendarId + "\"";
    	calendarCall+= "});";
    	eval(calendarCall);    	
    }
  },


  // Function to return format expected by Dynarch versus SimpleDateFormat
  getDynarchDateFormat: function(datePattern) {
  	if (datePattern=='dd/MM/yyyy')
  		return '%d/%m/%Y';
  }, 

  setOptions: function(options) {
    this.options = {
      sourceElem: $(options.source),
      datePattern: options.datePattern ? options.dattePattern : "dd/MM/yyyy"      
    }.extend(options || {});
  }
});






