var bean;
//var validated = false;
var isProcessing = false;

// EVC: added deny to press submit button more than once.
var _lastClickingElem;
var _disabledElem;

document.onclick = saveClickingElem;

// EVC: added deny to press submit button more than once.
function saveClickingElem(e){

	if(e==undefined){// IE
		_lastClickingElem = event.srcElement;
	}else{
		_lastClickingElem = e.target;
	}

}

var CanigoFormTag = {
  Version: '1.0'
}

//
Hashtable.prototype.hash = null;
Hashtable.prototype.keys = null;
Hashtable.prototype.location = null;

function Hashtable(){
	this.hash = new Array();
	this.keys = new Array();

	this.location = 0;
}
Hashtable.prototype.get = function (key){
	return this.hash[key];
}
    
Hashtable.prototype.put = function (key, value){
	if (value == null)
		return null;

	if (this.hash[key] == null)
		this.keys[this.keys.length] = key;

	this.hash[key] = value;
}
Hashtable.prototype.length = function (){
	return this.keys.length;
}
//declare an instance
var itemsForm = new Hashtable();
var itemsSubmit = new Hashtable();

// EVC: added to store className attribute for each field.
var itemsClassNames = new Hashtable();

//

/**
 * Prototype of String to add upper case of first letter of each word
 */
String.prototype.toProperCase = function(){
  return this.replace(/\w+/g,function(s){
    return s.charAt(0).toUpperCase() + s.substr(1);
  })
}

/**
 * Extension of Ajax tag Base
 */
 
CanigoFormTag.Base = function() {};
CanigoFormTag.Base.prototype = (new AjaxJspTag.Base()).extend({
});


/******************************************************************************
 * canigo Validation behaviour
 ******************************************************************************/
function setFocus(objectid) {

    // EVC: modified to fix tinyMCE focus bug.
	if(document.getElementById(objectid)) {
		try{
			if(document.getElementById(objectid).tagName == 'TEXTAREA'){
				document.getElementById(objectid).parentNode.getElementsByTagName('iframe')[0].contentWindow.focus();
			}else{
				document.getElementById(objectid).focus();	
			}
			
		}catch(e){
			document.getElementById(objectid).focus();		
		}	
	}
}

function errorHandling(error){
	window.alert("Error sending request to server" + error);
}


function callbackValidateForm(dataFromServer,dataFromBrowser,valMessageMode,valMsgFunction,errorPanelStyleId) {
	
    //alert("callbackValidateForm");
    // Obtain sourceForm of previous call to callback
    var sourceForm = $(dataFromBrowser['sourceForm']);
    
    var messageMode = valMessageMode;
    var messageFunction = valMsgFunction;
	var errors = dataFromServer;
    var errorPanelId=errorPanelStyleId;
  
    DWRUtil.removeAllOptions('errorList');
  	
	if (eval(errors.errorCount)>0) {
		//validated = false;

		Element.show($('errorsZone'));	
		// EVC: Fixed errorsZone focus bug.
		document.documentElement.scrollTop=0;	
		DWRUtil.setValue('errorCount',errors.errorCount);
		//document.title= document.title + '(' + errors.errorCount + ' errors detected' +  ')';

		i=0;
		
		if (messageMode!='null'){
		   messageMode = messageMode.toUpperCase();
		   if (messageMode.indexOf("PANEL")>=0){
		         //si informan otra zona de errores => errorPanelStyleId informado 
		         if (errorPanelId!='null'&&errorPanelId!=""){
		            Element.show($(errorPanelId));	
		         }else{
		             Element.show($('errorsZone'));	
		    	 }
		         for (i=0;i<eval(errors.errorCount);i++) {
				    error = errors.allErrors[i];
					// Message to show to each error
					defaultMessage = error.defaultMessage;
					fieldName = error.field;						
					fieldNameError = fieldName + "Error";
					
					// Process how to show field names
					processReply(false, fieldName, fieldNameError, defaultMessage);	
					
					// Show errors in errorList div
					errorRow = "<a href='javascript:void(0)' onclick=\" setFocus('" + fieldName + "')\" >" + defaultMessage + "</a>";
					DWRUtil.addOptions('errorList',[errorRow]);	    
				}
			}
			if (messageMode.indexOf("WINDOW")>=0){
		    	    var totsErrors="Errors";
		    	    for (i=0;i<eval(errors.errorCount);i++) {
		    	     	
				        error = errors.allErrors[i];
					   // Message to show to each error
					   defaultMessage = error.defaultMessage;
					   fieldName = error.field;						
					   totsErrors= totsErrors+"\n * "+defaultMessage+"\n ";
					} 
				    alert(totsErrors);   
			}  
				     
		    if (messageMode.indexOf("FIELDS")>=0){
		       
		         for (i=0;i<eval(errors.errorCount);i++) {
		              
			         error = errors.allErrors[i];
			          // Message to show to each error
					  defaultMessage = error.defaultMessage;
					
					  fieldName = error.field;						
					  var validationFieldMessageMode="";
					
					  if (itemsForm.get(fieldName)!=null){   
					      
			              validationFieldMessageMode=itemsForm.get(fieldName);
			              var tool ="";
			              if (itemsForm.get(fieldName+"Tooltip")!=null){
			                  tool = itemsForm.get(fieldName+"Tooltip");
			              }  
			              
			              var iconStyleId ="";
			              if (itemsForm.get(fieldName+"Icon")!=null){  
			              	  iconStyleId = itemsForm.get(fieldName+"Icon");
			              }
			              
			              var textErrorStyleId = "";
			              if (itemsForm.get(fieldName+"Text")!=null){  
			              	 textErrorStyleId = itemsForm.get(fieldName+"Text");
			              }
			              
			              var errorClass = "";
			              if (itemsForm.get(fieldName+"errorClass")!=null){  
			              	  errorClass = itemsForm.get(fieldName+"errorClass");
			              }
			             
			              if (valMsgFunction!='null'&valMsgFunction!=""){
			                 eval(valMsgFunction+'(\"'+validationFieldMessageMode+'\",\"'+tool+'\",\"'+iconStyleId+'\",\"'+textErrorStyleId+'\",\"'+errorClass+'\")');
			              }else{
						     showErroresFields(validationFieldMessageMode,tool,iconStyleId,textErrorStyleId,errorClass);
					     }
					  }
				   }
			    }
		}else{
			
		       //si informan otra zona de errores => errorPanelStyleId informado 
		         if (errorPanelId!='null'&&errorPanelId!=""){
		            Element.show($(errorPanelId));	
		         }else{
		             Element.show($('errorsZone'));	
		    	 }	
			    
			    for (i=0;i<eval(errors.errorCount);i++) {
			    
					error = errors.allErrors[i];
					// Message to show to each error
					defaultMessage = error.defaultMessage;
					fieldName = error.field;						
					
					fieldNameError = fieldName + "Error";
					
					// Process how to show field names
					processReply(false, fieldName, fieldNameError, defaultMessage);	
					
					// Show errors in errorList div
					
					errorRow = "<a href='javascript:void(0)' onclick=\" setFocus('" + fieldName + "')\" >" + defaultMessage + "</a>";
					DWRUtil.addOptions('errorList',[errorRow]);	
				}	
		}	
		// EVC: added deny to press submit button more than once.
		_disabledElem.disabled=false;
	}else {
		// Do a submit 
		if (sourceForm) {
			// Set validated to true in order to bypass validation and do submit without checkings
			//validated = true;
			sourceForm.submit();
		}
	
	}
}
 
 
 
function processReply(valid, id, errid, error) {
    if (valid) {
    	if ($(errid)) {
	        DWRUtil.setValue(errid, "");
	    }
        /*$(id).style.color = "black";*/
    }
    else
    {
	    if ($(errid)) {
	        DWRUtil.setValue(errid, error);
	    }
        /*$(id).style.color = "red";*/
    }
}

function validateFormDynamic(form) {
	
}
 
/******************************************************************************
 * Code to validate on client
 ******************************************************************************/
CanigoFormTag.ClientValidation = Class.create();
CanigoFormTag.ClientValidation.prototype=(new AjaxJspTag.Base()).extend({

  initialize: function(options) {    
    this.setOptions(options);
    this.attachBehaviors(this.options.sourceElem, this.options.eventType, this.actionElem, this);
  },

  actionElem: function(e) {  
 	// Generate return validateValidatorName()
  	// Example: return validateAccount(this)
  	
  	var javascriptFunction;
  	var functionName = "validate" + this.options.validatorName.toProperCase();
  	//var form = $(this.options.sourceElem);
  	//var formName = form.name;
	//javascriptFunction = functionName + "($('" + formName + "'));";  	
	javascriptFunction = functionName + "($('" + this.options.sourceName + "'));";
  	var submitValidated = eval(javascriptFunction);
  	if (!submitValidated)
  		Event.stop(e);
  },
  	
   setOptions: function(options) {
    this.options = {
      sourceElem: $(options.source),
      sourceName: options.source,
      validatorName: options.validatorName,
      eventType: options.eventType ? options.eventType : "submit"      
    }.extend(options || {});
  }
});

/******************************************************************************
 * Code to validate on server
 ******************************************************************************/
CanigoFormTag.ServerValidation = Class.create();
CanigoFormTag.ServerValidation.prototype=(new AjaxJspTag.Base()).extend({

  initialize: function(options) {    
    this.setOptions(options);
    this.attachBehaviors(this.options.sourceElem, this.options.eventType, this.actionElemClicked, this);
	// EVC: added to store className attribute for each field.
    //this.setItemsClassName(this.options.sourceElem);    
  },

  // EVC: added to store className attribute for each field.
  setItemsClassName: function(sourceForm) {

		   
	    // Obtain all components in form
	  	if (sourceForm) {
	  		// form expected
	  		list = sourceForm.elements;				
	  		 
	  		if (list){
  		  		j=0;
				for (i=0;i<list.length;i++){	  		  	
					var element = list[i];
					
					if (element.name) {
					  
						//comprovem si tenim camps amb validacio onSubmit
						if (itemsSubmit.get(element.name)!=null){  
							//if(itemsClassNames.get(element.name)==null)
								itemsClassNames.put(element.name,element.className);
			            	j++;
			            }  
				    }				  		
				}
			}
	  	}	 

	    return false;           
  },

  // Create bean with values to send to validation service
  validateForm: function(sourceForm,validatorName,className,validationFormMessageMode,validationMessageFunction,errorPanelStyleId,indicator) {

     	 //si informan otra zona de errores => errorPanelStyleId informado 
	   if (errorPanelStyleId!='null'&&errorPanelStyleId!=""){
	       Element.hide($(errorPanelStyleId));	
	   }else{
	       Element.hide($('errorsZone'));	
	   }		
	   
	   DWREngine.setErrorHandler(errorHandling);
	    
	   var myJSONObject= {"camps":[]};
	  
	    // Obtain all components in form
	  	if (sourceForm) {
	  		// form expected
	  		list = sourceForm.elements;				
	  		 
	  		if (list){
  		  		bean = new Object();
  		  		j=0;
				for (i=0;i<list.length;i++){	  		  	
					var element = list[i];
					
					if (element.name) {
					  
						//comprobamos si hay campos con validacion onSubmit
						if (itemsSubmit.get(element.name)!=null){  
						
						    // EVC: added to quit validation error styleClass
						    if ($(element.name+"IconError")!=null)
								Element.hide($(element.name+"IconError"));
								
							if ($(element.name+"TextError"))
								Element.hide($(element.name+"TextError"));
							  
						    if(itemsClassNames.get(element.name)!=null){
						    	$$(element.name)[0].className=itemsClassNames.get(element.name);
						    }else{
						    	//$$(element.name)[0].className=" ";
						    }
						    

						    var camp=$$(element.name)[0];
							var campValue = camp.value;
		
	    					//para eliminar el tooltip
	   						camp.onmouseover=null;
	   						
							var dependentFields ="";
						
						    if (itemsSubmit.get(element.name+"DependentFields")!="null")	
						    	dependentFields =itemsSubmit.get(element.name+"DependentFields");			
			
		   				    myJSONObject.camps[j]={"nomCamp": element.name,"nomValue": $$(element.name)[0].value, "validacio": itemsSubmit.get(element.name),"errorKey": itemsSubmit.get(element.name+"ErrorKey"),"dependentFields": dependentFields};
			            	j++;
			            }  
//						if (!element.name.startsWith("__") ) {
						  bean[element.name] = '""';
//						}
				    }				  		
				}
			}
	  	}
	  	
		var strJson;
		
		if (myJSONObject.length!=0)
		   strJson= myJSONObject.toJSONString();
		else
		   strJson="";
		   
		DWRUtil.getValuesName(bean);

		//bean.
		
		//alert($$("__Metadata.accounts.itemsClass__").value);
      //  alert(bean["Metadata.accounts.itemsClass__"]);
		
	   // if (validatorName) {		  
	        var dataFromBrowser = new Object();
		 	dataFromBrowser['sourceForm'] = sourceForm;
		 	
		 	if (indicator!='null'){
		 		Element.show(indicator);
		 	}

		 	//alert("Sending request");
		 	//nous atributs validacio
	        webValidationService.getWebValidationResults(className,validatorName,bean,strJson,
		 	{
		 		callback:function(dataFromServer) {
		 		    if (indicator!='null')
		 			    Element.hide(indicator);
		 			callbackValidateForm(dataFromServer,dataFromBrowser,validationFormMessageMode,validationMessageFunction,errorPanelStyleId);
		 		},
	 		timeout:5000
	 	   });
	     
	       
	    //} 
	    
	    return false;           
  },

  actionElemClicked: function(e) {  

	    // DWR calling
	   //if (!validated) {
	   
	   	   // EVC: added deny to press submit button more than once.
	   	   _lastClickingElem.disabled=true;
	   	   _disabledElem = _lastClickingElem;
	   	   
	      //this.validateForm(this.options.sourceElem,this.options.validatorName)
		   this.validateForm(this.options.sourceElem,this.options.validatorName,this.options.className,this.options.validationFormMessageMode,this.options.validationMessageFunction,this.options.errorPanelStyleId,this.options.indicator);   
		   Event.stop(e);
   	   //}
   	   //else {
   	      //alert("Form validated");
   	   //}
  },
  	
  setOptions: function(options) {

    this.options = {
      sourceElem: $(options.source),
      validatorName: $(options.validatorName),
      //nous atributs validacio
      className: options.className,
      validationFormMessageMode: $(options.validationFormMessageMode),
      validationMessageFunction: $(options.validationMessageFunction),
      errorPanelStyleId: $(options.errorPanelStyleId),
      indicator: $(options.indicator),
      //
      eventType: options.eventType ? options.eventType : "submit"      
    }.extend(options || {});
  }
});


//Funcio de validacio camp a camp	
function validateField(validacions,fieldName,fieldValue,validationFieldMessageMode,sourceErrorTooltip,iconStyleId,textErrorStyleId,errorClass,validationMessageFunction,dependentFields,errorKey,indicator){
	
		if ($(iconStyleId)!=null)
			Element.hide($(iconStyleId));
			
		if ($(textErrorStyleId))
			Element.hide($(textErrorStyleId));
		
		$$(fieldName)[0].className=" ";
	   
		var camp=$$(fieldName)[0];
		var campValue = camp.value
		
	    //para eliminar el tooltip
	    camp.onmouseover=null;
	    
	    var jSonCampsDep = {"campsDependents":[]};
	    
	    if (dependentFields!="null"&&dependentFields!=""){	
		    //var tokens = dependentFields.tokenize(",", " ", true);
		    var tokens = dependentFields.split(",");
			for(var i=0; i<tokens.length; i++){
		  	    var nomCamp = tokens[i];
		  	   	var valueCamp = ($$(nomCamp)[0]).value;
		  	   	//alert("camp depenent:"+nomCamp+":"+valueCamp);
		  	   	jSonCampsDep.campsDependents[i]={"nomCamp": nomCamp,"valueCamp":valueCamp}
		  	}    
		}
	     
        if (indicator!='null')
		 	Element.show(indicator);
		
		webValidationService.getWebValidationResultsTextField(validacions,fieldName,campValue,errorKey,jSonCampsDep.toJSONString(),{
		 		callback:function(dataFromServer,valFieldMessageMode,srcErrorTooltip,iconId,textErrorId,eClass,valMsgFunction) {
		 		    if (indicator!='null')
		 			    Element.hide(indicator);
		 			callbackValidateField(dataFromServer,validationFieldMessageMode,sourceErrorTooltip,iconStyleId,textErrorStyleId,errorClass,validationMessageFunction);
		 		},
	 		timeout:5000
	 	}); 
			
}

//Funcio de presentacio de camps errors		
//dataFormServer: dades del servidor indican els camps erronis 
//validationFieldMessageMode: els modes de mostrar els errors
//sourceErrorTooltip: camp en el que volen el tolltip
//validationMessageFunction: funcio propia de presentacio dels errors 
function callbackValidateField(dataFromServer,validationFieldMessageMode,sourceErrorTooltip,iconStyleId,textErrorStyleId,errorClass,validationMessageFunction) {

	var errors = dataFromServer;
	var validationProperties = validationFieldMessageMode;
	var sourceTooltip= sourceErrorTooltip;
	var valMsgFunction= validationMessageFunction ;
	
	if (eval(errors.errorCount)>0) {
		//validated = false;
		
			i=0;
			for (i=0;i<eval(errors.errorCount);i++) {
				error = errors.allErrors[i];
				
				// Message to show to each error
				defaultMessage = error.defaultMessage;
				fieldName = error.field;	
				
				if (valMsgFunction!='null'&&valMsgFunction!=""){
		    		eval(valMsgFunction+'(\"'+validationProperties+'\",\"'+sourceTooltip+'\",\"'+iconStyleId+'\",\"'+textErrorStyleId+'\",\"'+errorClass+'\")');
				}else{
					showErroresFields(validationProperties,sourceTooltip,iconStyleId,textErrorStyleId,errorClass);
	            }
	       }					
	  } 
 }
  
 function showErroresFields(validationProperties,sourceTooltip,iconStyleId,textErrorStyleId,errorClass){
          
            var alertas="";
            
            if (validationProperties.indexOf("ICON")>=0){
                if (iconStyleId=='null'||iconStyleId==""){
                  alertas = alertas + "Per veure l\'icono ha d\'informar l\'atribut iconStyleId \n";
                  //alert('Per veure l\'icono ha d\'informar l\'atribut iconStyleId');
                }else{  
                    var iconErrorsZone =iconStyleId;
                    Element.show($(iconErrorsZone));	
			    }
			}
		
			if (validationProperties.indexOf("TEXT")>=0 ){
			    if(textErrorStyleId=='null'||textErrorStyleId==""){
			      alertas = alertas + "Per veure el texte ha d\'informar l\'atribut textErrorStyleId \n";
			        //alert('Per veure el texte ha d\'informar l\'atribut textErrorStyleId');
			    }else{
				    var textErrorZone = textErrorStyleId;
				    DWRUtil.setValue(textErrorZone, defaultMessage);
				     
				    Element.show($(textErrorZone));
               }
			}
			if (validationProperties.indexOf("CHANGESTYLE")>=0){
			    if (errorClass=='null'||errorClass==""){
			         alertas = alertas + "Per cambiar l\'estil ha d\'informar l\'atribut errorClass \n";
			        // alert('Per cambiar l\'estil ha d\'informar l\'atribut errorClass');
			    }else{
			        // EVC: added to store className attribute for each field.
			    	var element = $$(fieldName)[0];
			    	if (itemsClassNames.get(element.name)==null){ 
						itemsClassNames.put(element.name,element.className);
					}
			    	
			        Element.addClassName(element,errorClass);	
			    }
			}
			if (validationProperties.indexOf("TOOLTIP")>=0){
			   if (sourceTooltip!=null&&sourceTooltip=="TEXT"){ 
			       showTooltip({ source: fieldName,tooltipMessage: defaultMessage,tooltipTitleMessage:"Error"});
			   }else{
			       if (iconStyleId=='null'||iconStyleId==""){
			            alertas = alertas + "Per veure el tooltip ha d\'informar o l\'atribut sourceTooltip o l\'iconStyleId \n";
			            //alert('Per veure el tooltip ha d\'informar o l\'atribut sourceTooltip o l\'iconStyleId ');
			       }else{
			            
			            showTooltip({ source: iconStyleId,tooltipMessage: defaultMessage,tooltipTitleMessage:"Error"});
			       }
			  }
			}
			if (alertas!=""){
			   alert(alertas);
			}
  }
  
//Funcion para mostrar el tooltip
function   showTooltip(options) {
  
    this.setOptionsField(options);
    if (this.options.sourceElem) {
    	var ele = this.options.sourceElem;	
    	//alert('Elemen tooltip id'+ele.id+' tipus:'+ele.nodeType);
    	ele.id = ele.name;
    		
		var tooltipMessage = this.options.tooltipMessage;
		var tooltipTitleMessage = this.options.tooltipTitleMessage;
		var tooltipOptions = this.options.tooltipOptions;
		//alert('Tooltip message'+tooltipMessage);
		//alert('Element tooltip'+ele.name);
		ele.onmouseover  = function(event){
			 domTT_activate(ele,event,'caption',tooltipTitleMessage,'content', tooltipMessage,'trail',true,'delay',0);
		}	
		
		if(domTT_tooltips.get(ele.name)!=undefined){
			domTT_update(ele.name,tooltipMessage,'content');
		}
		ele.onmouseout = function(event) { 
		       domTT_close(ele.name);
		}		
     }    
  }
  
  function setOptionsField(options) {
 
    this.options = {
      sourceElem: $$(options.source)[0],
      eventType: options.eventType ? options.eventType : "mouseover"
    }.extend(options || {});
  }
  
/******************************************************************************
 * Funcio de validacio de camps del decorador
 ******************************************************************************/    
  function buildValidacioField(fieldName,validations,validationFieldMessageMode,sourceErrorTooltip,iconStyleId,textErrorStyleId,errorClass,messageFunction,dependentFields,errorKey,indicator) {
   
  	showValidacioField({ source: fieldName,validations: validations,validationFieldMessageMode: validationFieldMessageMode,sourceErrorTooltip: sourceErrorTooltip,iconStyleId: iconStyleId,textErrorStyleId: textErrorStyleId,errorClass:errorClass,messageFunction: messageFunction,dependentFields:dependentFields,errorKey:errorKey,indicator:indicator});
  
  }
  
  function  showValidacioField(options) {
    
    if (options.source) {
       
	    var ele=$$(options.source)[0];
	    if (ele==null) {
	       alert('The field validator '+options.source+' doesn\'t found the element');
	    }
	        
	  	var fieldName=options.source;
	   	var validations =options.validations;
	   	var validationFieldMessageMode=options.validationFieldMessageMode;
	   	var	sourceErrorTooltip=options.sourceErrorTooltip;
	   	var iconStyleId=options.iconStyleId;
	   	var textErrorStyleId=options.textErrorStyleId;
	   	var errorClass=options.errorClass;
	   	var messageFunction=options.messageFunction;
	   	var dependentFields=options.dependentFields
	    var errorKey=options.errorKey
	    var indicator=options.indicator
	      
	    ele.onchange  = function(event){
			var fieldValue=ele.value;
		
		    validateField(validations,fieldName,fieldValue,validationFieldMessageMode,sourceErrorTooltip,iconStyleId,textErrorStyleId,errorClass,messageFunction,dependentFields,errorKey,indicator);
			  
		    }		        
       } 
  } 
    

/******************************************************************************
 * Funcio de validacio del fromulari del decorador 
 ******************************************************************************/    

 function buildValidacioForm(source,formId,validatorName,className,validationFormMessageMode,validationMessageFunction,errorPanelStyleId,indicator) {
  
  	showValidacioForm({src: source, formId: formId, validatorName: validatorName,className: className, valFormMessageMode: validationFormMessageMode,valMessageFunction: validationMessageFunction,errorPanelStyleId:errorPanelStyleId,indicator:indicator});
    
  }
  
 function showValidacioForm(options) {
 
    if (options.src) {      
        var ele=$(options.src);
	   	var formId=$(options.formId);
	   	var valName=options.validatorName;
	   	var className=options.className;
	   	var valFormMessageMode=options.valFormMessageMode;
	   	var valMessageFunction=options.valMessageFunction;
	   	var	errorPanelStyleId=options.errorPanelStyleId;
	    var	indicator=options.indicator;
	    //alert("ShowValidacionForm");
		ele.onclick = function(event){
		
		    Decorator(formId,valName,className,valFormMessageMode,valMessageFunction,errorPanelStyleId,indicator);
	    }	
	 }			         
  }

function  validateFormDecorator(sourceForm,validatorName,className,validationFormMessageMode,validationMessageFunction,errorPanelStyleId,indicator) {
     
       //si informan otra zona de errores => errorPanelStyleId informado 
	   if (errorPanelStyleId!='null'&&errorPanelStyleId!=""){
	       Element.hide($(errorPanelStyleId));	
	   }else{
	       Element.hide($('errorsZone'));	
	   }
     	
	    DWREngine.setErrorHandler(errorHandling);
	  	// Obtain all components in form
	   
	    var myJSONObject= {"camps":[]};
	    //
	    if (sourceForm) {
	  		// form expected
	  		list = sourceForm.elements;				
	  		 
	  		if (list){
  		  		bean = new Object();
  		  		j=0;
				for (i=0;i<list.length;i++){	  		  	
					var element = list[i];
					
					if (element.name) {
						//comprobamos si hay campos con validacion onSubmit
	
						if (itemsSubmit.get(element.name)!=null)
						{  
						   
							var dependentFields ="";
							var campsDependents = "";
							
						    if (itemsSubmit.get(element.name+"DependentFields")!="null"){	
						    	dependentFields =itemsSubmit.get(element.name+"DependentFields");			
							    var tokens = dependentFields.tokenize(",", " ", true);
								
							    for(var k=0; k<tokens.length; k++){
							  	    var nomCamp = tokens[k];
							  		var valueCamp = ($$(nomCamp)[0]).value;
								    if (k==0)
							  	        campsDependents = campsDependents + "{"+nomCamp+":"+valueCamp+"}"; 
							  	    else
							  	        campsDependents = campsDependents + ",{"+nomCamp+":"+valueCamp+"}";   
							  	}
							 }   				
						    //
						
		   				    myJSONObject.camps[j]={"nomCamp": element.name,"nomValue": $$(element.name)[0].value, "validacio": itemsSubmit.get(element.name),"errorKey": itemsSubmit.get(element.name+"ErrorKey"),"dependentFields": campsDependents};
			            	//alert(myJSONObject.camps[j].nomCamp+"//"+myJSONObject.camps[j].nomValue+"//"+myJSONObject.camps[j].validacio+"//"+myJSONObject.camps[j].errorKey);
			            	j++;
			           }  
					   
					   bean[element.name] = '""';
				    }				  		
				}
			}
	  	}
		
		DWRUtil.getValues(bean);
		
		var strJson;
		if (myJSONObject.length!=0)
		   strJson= myJSONObject.toJSONString();
		else
		   strJson="";
	    
	    if (validatorName) {		  
	        //webValidationService.getValidationResults(validatorName,bean,callbackValidateForm);
	        var dataFromBrowser = new Object();
		 	dataFromBrowser['sourceForm'] = sourceForm;
		 	
		 	 if (indicator!='null')
		 		Element.show(indicator);
		 		
		 	//nous atributs validacio
	        webValidationService.getWebValidationResults(className,validatorName,bean,strJson,
		 	{
		 	    
		 		callback:function(dataFromServer) {
		 		 if (indicator!='null')
		 			Element.hide(indicator);
		 			callbackValidateForm(dataFromServer,dataFromBrowser,validationFormMessageMode,validationMessageFunction,errorPanelStyleId);
		 		},
	 		timeout:5000
	 	   });
	     
	       
	   } 
	    
	   
 }

function pruebaFunc(validationProperties,sourceTooltip,iconStyleId,textErrorStyleId,errorClass){
     alert('en funcion propia de mostrar errores');
}    





