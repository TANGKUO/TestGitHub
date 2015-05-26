var AjaxCanigo = {}

/******************************************************************************/
/* Behaviour for required fields                                              */
/******************************************************************************/

AjaxCanigo.Required = Class.create();
AjaxCanigo.Required.prototype={
	initialize:function(element){
		this.element=$(element);
		if(!this.element || !this.element.id){		
			return;
		}
		
		// Obtain associated label with 'for' attribute equals to id of this element
		var labels = document.getElementsByTagName("label");
		for (var i = labels.length; --i >= 0;) {
			var l = labels[i];
			var forName = this.getForAttributeOfLabel(l);
			if (forName) {
				if (forName==element.id) {
				    var parent1 = l.parentNode;
				    
				    if (parent1.className!="wrapper") {			
				        //alert("Etiqueta sin * puesto "+l.getAttribute("for"));	       				   
						var wrapper = document.createElement("span");
						wrapper.className="wrapper";
						
						var span = document.createElement("span");
						span.innerHTML = "*&nbsp;";
						span.className="required";
						//for(var i in span) if(i.indexOf("set")!=-1)alert(i)
						//l.insertBefore(span,l.childNodes[0]);
						var parent = l.parentNode;
						parent.removeChild(l);
						wrapper.appendChild(span);
						wrapper.appendChild(l);
						parent.appendChild(wrapper);
					}
					else {
					   //alert("Etiqueta sin * puesto "+l.getAttribute("for"));	       				   
					}
					
					//l.appendChild(span);
					//l.innerHTML = "<span class='required'>*</span>&nbsp;" + l.innerHTML.toString();
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
	
	onChange:function(event){
	},
	
	validate:function(event){
	}
};


/******************************************************************************/
/* Behaviour for autotab after entered characters to maxLength                */
/******************************************************************************/

AjaxCanigo.Autotab = Class.create();
AjaxCanigo.Autotab.prototype={
	initialize:function(element){
		this.element=$(element);
		// If not maxLength property or element not obtained return
		if(!this.element || !this.element.maxLength){
			return;
		}
		
		this.onKeyPressed=function(event){
		
		 	if(Event.element(event)){
		       switch(event.keyCode) {
			       case Event.KEY_RETURN:
			       case Event.KEY_ESC:
			       case Event.KEY_BACKSPACE:
			       case Event.KEY_TAB:
			       case Event.KEY_RIGHT:
			       case Event.KEY_LEFT:
			       case Event.KEY_DELETE:
			         return;
			       case Event.KEY_UP:
			         if(navigator.appVersion.indexOf('AppleWebKit')>0) Event.stop(event);
			         	return;
			       case Event.KEY_DOWN:
			         if(navigator.appVersion.indexOf('AppleWebKit')>0) Event.stop(event);
			         	return;
			      default:
			      	var element = this.element;
			      	
			      	// If length of value is equal or greater? to maxLength set focus
			      	// on next component
					if(element.value.length >= element.maxLength) {
						//element.value = element.value.slice(0, element.maxLength);
						if(element.selectionStart==0 && element.selectionEnd==element.maxLength){
							return;
						}
						
						if(element.form){
							// get next index (see function 'getIndex')
							var index = (this.getIndex()+1) % (element.form.length);
							try {
								element.form[index].focus();
							}	catch(e){
								alert(e);
							}
						}
						
						// Stop managing event to others
						Event.stop(event);
				        return;
			      } // end of 'if(element.value.length >= element.maxLength) {'
				} // end of 'switch(event.keyCode){'
			} // end of 'if(Event.element(event)){'
		} // end of 'this.onKeyPressed=function(event){'
	
		// Add observer and call function if keypressed
		Event.observe(this.element, "keypress", this.onKeyPressed.bindAsEventListener(this));
	} // end of 'initialize:function(element){'
	
	,
	
	// Obtain next index of component
	getIndex: function(){
		for (var i=0;i < this.element.form.length;i++){
			if (this.element.form[i] == this.element){
				return i;
			}
		}
	}
	
	
	,
	onKeyPress:function(event){
		this.onKeyPressed(event);
	}
};

/******************************************************************************/
/* End of Behaviour for autotab after entered characters to maxLength         */
/******************************************************************************/


/******************************************************************************/
/* Behaviours for automatic conversions                                       */
/******************************************************************************/

AjaxCanigo.UpperCase = Class.create();
AjaxCanigo.UpperCase.prototype={
	
	initialize:function(element){
		this.element=$(element);
		Event.observe(this.element, "change", this.onChange.bindAsEventListener(this));
	}
	,
	onChange:function(event) {
		if(this.element.value){
			this.element.value = this.element.value.toUpperCase();
		}
	}
};

AjaxCanigo.LowerCase = Class.create();
AjaxCanigo.LowerCase.prototype={
	
	initialize:function(element){
		this.element=$(element);
		Event.observe(this.element, "change", this.onChange.bindAsEventListener(this));
	}
	,
	onChange:function(event) {
		if(this.element.value){
			this.element.value = this.element.value.toLowerCase();
		}
	}
};


AjaxCanigo.Trim = Class.create();
AjaxCanigo.Trim.prototype={
	
	initialize:function(element){
		this.element=$(element);
		Event.observe(this.element, "change", this.onChange.bindAsEventListener(this));
	}
	,
	onChange:function(event) {
		if(this.element.value){
			this.element.value = this.element.value.replace(/^\s*|\s*$/g,"");
		}
	}
};


/******************************************************************************/
/* Behaviour for select value of component in focus							  */
/******************************************************************************/
AjaxCanigo.SelectOnFocus=Class.create();
AjaxCanigo.SelectOnFocus.prototype={
	initialize:function(element){
		this.element=$(element);
		Event.observe(this.element, "focus", this.onFocus.bindAsEventListener(this));
	}
	,
	
	onFocus:function(event){
			this.element.select();
	}
};



var canigoRules = {
	'input.autotab' : function(element){
			new AjaxCanigo.Autotab(element);
		},
	'input.required' : function(element){
			new AjaxCanigo.Required(element);
		},		
	'input.uppercase' : function(element){
			new AjaxCanigo.UpperCase(element);
		},
	'input.lowercase' : function(element){
			new AjaxCanigo.LowerCase(element);
		},		
	'input.trim' : function(element){
			new AjaxCanigo.Trim(element);
		},		
	'input.selectOnFocus' : function(element){
			new AjaxCanigo.SelectOnFocus(element);
		},		
	'select.required' : function(element){
			new AjaxCanigo.Required(element);
		},	
	'textarea.required' : function(element){
			new AjaxCanigo.Required(element);
		}	
	};
	
	
Behaviour.register(canigoRules);
//Behaviour.apply();
