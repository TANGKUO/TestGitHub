
var CanigoEditListTag = {
  Version: '1.0'
}

/**
 * Extension of CanigoFieldTag
 */ 
CanigoEditListTag.Base = function() {};
CanigoEditListTag.Base.prototype = (new AjaxJspTag.Base()).extend({
});


/******************************************************************************
 * canigo Select All
 * Example of use  :
 * <script type="text/javascript">
 *   new CanigoEditListTag.SelectAll(
 *     {
 *           source: "...", // id of source select
 * 			 target: "...", // id of table target
 *			 listName: "...", // name of list property in Form Bean 
 *			 selectionProperty: "...", // property of selection of Form Bean
 *			 lastIndex: "...", // index of last element in list property (can be the name of an input type hidden)
 *           check: "..." // true or false depending on selectAll or unselectAll
 *     });
 * </script>
 ******************************************************************************/
 

CanigoEditListTag.SelectAll = Class.create();
CanigoEditListTag.SelectAll.prototype=(new CanigoEditListTag.Base()).extend({

  initialize: function(options) {
  
    this.lastIndex = options.lastIndex;

    this.setOptions(options);

    this.attachBehaviors($(this.options.source), this.options.eventType, this.execute, this);

  },


  setOptions: function(options) {
   
   this.options = {
      source: $(options.source),
      target: options.target,
      listName: options.listName,
      selectionProperty: options.selectionProperty,
      lastIndex: options.lastIndex,
      check: options.check,
      eventType: options.eventType ? options.eventType : "click"
   }.extend(options || {});
   
  },  
  
  execute: function() {
    
    
   if($$(this.options.lastIndex)[0] == null){
	if(isNaN(this.options.lastIndex)){
   		alert('Error:' + this.options.lastIndex + ' is not a valid index.');
   	}
   }else{
   	this.lastIndex = $$(this.options.lastIndex)[0].value;
   }	
    
	for(var i = 0;i<this.lastIndex;i++){
		var name = this.options.listName + "[" + i + "]." + this.options.selectionProperty;
		var checkboxObj = $$(name)[0];//alert(name+'-'+checkboxObj+'-'+this.options.check);
		if(checkboxObj != null){
			$$(name)[0].checked = this.options.check;
		}	
	}
  }	

  });	


/******************************************************************************
 * canigo Delete Rows
 * Example of use  :
 * <script type="text/javascript">
 *   new CanigoEditListTag.DeleteRows(
 *     {
 *           source: "...", // id of source select
 * 			 target: "...", // id of table target
 *			 listName: "...", // name of list property in Form Bean 
 *			 selectionProperty: "...", // property of selection of Form Bean
 *			 lastIndex: "..." // index of last element in list property (can be the name of an input type hidden)
 *     });
 * </script>
 ******************************************************************************/
 

CanigoEditListTag.DeleteRows = Class.create();
CanigoEditListTag.DeleteRows.prototype=(new CanigoEditListTag.Base()).extend({

  initialize: function(options) {
  
    this.lastIndex = options.lastIndex;

    this.setOptions(options);

    this.attachBehaviors($(this.options.source), this.options.eventType, this.execute, this);

  },


  setOptions: function(options) {
   
   this.options = {
      source: $(options.source),
      target: options.target,
      listName: options.listName,
      selectionProperty: options.selectionProperty,
      lastIndex: options.lastIndex,
      eventType: options.eventType ? options.eventType : "click"
   }.extend(options || {});
   
  },  
  
  execute: function() {
    
    
   if($$(this.options.lastIndex)[0] == null){
	if(isNaN(this.options.lastIndex)){
   		alert('Error:' + this.options.lastIndex + ' is not a valid index.');
   	}
   }else{
   	    this.lastIndex = $$(this.options.lastIndex)[0].value;
   }	
    
	for(var i = 0;i<this.lastIndex;i++){
		var name = this.options.listName + "[" + i + "]." + this.options.selectionProperty;
		var checkboxObj = $$(name)[0];
		if(checkboxObj != null){
			if(checkboxObj.checked){
				var trToRemove = checkboxObj.parentNode.parentNode;
				try{
					$(this.options.target).getElementsByTagName("tbody")[0].removeChild(trToRemove);
				}catch(e){
					alert(e);
				}	
			}
		}	
	}
  }	

  });	


/******************************************************************************
 * canigo Editable List
 * Example of use  :
 * <script type="text/javascript">
 *   new CanigoEditListTag.EditList(
 *     url:"url",
 *     {
 *           source: "...", // id of source select
 * 			 target: "...", // id of table target
 *			 listName: "...", // name of list property in Bean Form
 *			 forward: "...", // forward in action
 *			 insertInRow: "...", // row position to insert new row
 *			 startIndex: "...", // index of next element in list property
 *           reqCode: "..." // reqCode to be added at the url
 *     });
 * </script>
 ******************************************************************************/
 

CanigoEditListTag.EditList = Class.create();
CanigoEditListTag.EditList.prototype=(new CanigoEditListTag.Base()).extend({

  initialize: function(url, options) {

    this.setOptions(options);

    // Because FF doesn't refresh the input type hidden
    if(this.options.lastIndex != 'null'){
    	$$('__Metadata-' + this.options.listName + '-lastIndex__')[0].value = this.options.lastIndex;
    }	
    
    this.options.startIndex = eval(this.options.startIndex) - 1;
    if(url.indexOf('reqCode=') != -1)alert("Parameter 'reqCode' cannot appear in 'url' attribute.\nThere\'s a 'reqCode' attribute in addrow Tag.");
    this.baseUrl = url + '?reqCode=' + this.options.reqCode;
    if(this.options.forward!='null')this.baseUrl = this.baseUrl + '&forward=' + this.options.forward;
    
    if(this.options.formId != 'null'){
	    if($(this.options.formId) == null){
	    	alert('Form with id \'' + this.options.formId + '\' not found!');
	    }else{
	    	var formIdent = this.getFormIdent(this.options.formId);
	    	if(formIdent != null){
	    		this.baseUrl = this.baseUrl + '&formIdent=' + formIdent;
	    	}
	    }
	}  
	if (this.options.forward!='null') {
	    this.baseUrl=this.baseUrl+' &forward='+this.options.forward;
	}
	
	this.baseUrl=this.baseUrl+' &listName='+this.options.listName+' &itemsClass='+this.getItemsClass(); 
//	alert(this.baseUrl); 
    this.attachBehaviors($(this.options.source), this.options.eventType, this.execute, this);

  },
  
  getItemsClass: function() {
 		var itemsClass = $$('__Metadata-'+this.options.listName+'-itemsClass__')[0]; 
  		if (itemsClass!=null) {
  		    return itemsClass.value;
  		}
  		else {
  		    alert('The items class for the collection '+this.options.listName+' is not defined. Use fwk:defineProperty tag');
  		}
  		return null;
  },

  getFormIdent: function(formId) {

  	var formIdents = $$('__Metadata-formIdent__');

  	if(formIdents.length == 0){
  		// formIdent not found
  		alert('__Metadata-formIdent__ parameter not found in page \'' + formId + '\'. You must use fwk:form tag.');
  		return null;
  	}else{
  	  
  		for(var i=0;i<formIdents.length;i++){
  				var elem = formIdents[i];
  				
  				while((elem.parentNode != null) && (elem.nodeName != 'FORM')){
  					elem = elem.parentNode;
  					
  				}
  				
  				if(elem.nodeName == 'FORM'){
  					if(elem.id == formId){
  						return formIdents[0].value;
  					}
  				}
  		}
  		alert('__Metadata-formIdent__ parameter not found in form \'' + formId + '\'. You must use fwk:form tag.');
  		return null;
  	}
  },

  setOptions: function(options) {
   
   this.options = {
      sourceElem: $(options.source),
      targetElem: $(options.target),
      listName: options.listName,
      forward: options.forward,
      insertInRow: options.insertInRow,
      startIndex: options.startIndex,
      lastIndex: options.lastIndex,
      reqCode: options.reqCode,
      formId: options.formId,
      eventType: options.eventType ? options.eventType : "click",
      ajaxMethod: AJAX_METHOD_UPDATER
   }.extend(options || {});
  },  

  sendUpdateRequest: function(target) {
  
    this.ajaxUpdater = new CanigoEditListTag.Updater(target, this.baseUrl, this.options);
  },
  
  execute: function() {

    this.setAjaxOptions({
      parameters: arrayToParameterString(this.buildParameterString(this.options.parameters).split(','))
    });

	this.options.startIndex = eval(this.options.startIndex) + 1;
    // this.sendRequest();
    
	this.sendUpdateRequest(this.options.targetElem);
   
  },
  
  handlerFunction: function(xml) {
    if (this.options.postFunction) {
      this.options.postFunction(xml);
    }
  },

  handlerFunctionText: function(text) {
    var content = $(options.target);
    content.innerHTML = text;
  }

});
  	  
  	   
  	   
CanigoEditListTag.Updater = Class.create();
CanigoEditListTag.Updater.ScriptFragment = '(?:<script.*?>)((\n|.)*?)(?:<\/script>)';

CanigoEditListTag.Updater.prototype.extend(Ajax.Updater.prototype).extend({
  initialize: function(container, url, options) {
  
    this.containers = {
      success: container.success ? $(container.success) : $(container),
      failure: container.failure ? $(container.failure) :
        (container.success ? null : $(container))
    }

	    this.transport = Ajax.getTransport();
	    this.setOptions(options);
	
	    if(options.cachedRow == undefined){
		    var onComplete = this.options.onComplete || Prototype.emptyFunction;
		    this.options.onComplete = (function() {
		      this.updateContent(options);
		      onComplete(this.transport);
		    }).bind(this);
		    this.request(url);
	    }else{
	    	this.updateContent(options);
	    }
  },

  
 
  setEvent: function(node, evnt, method) {
  	switch(evnt)
	{
	
		// Mouse events
		case "onclick": node.onclick = method;
		break;
		case "ondblclick": node.ondblclick = method;
		break; 
		case "onmouseover": node.onmouseover = method;
		break; 
		case "onmouseout": node.onmouseout = method;
		break; 
		case "onmousedown": node.onmousedown = method;
		break; 
		case "onmousemove": node.onmousemove = method;
		break; 
		case "onmouseup": node.onmouseup = method;
		break; 

		// Keyboard Events
		case "onkeydown": node.onkeydown = method;
		break; 
		case "onkeypress": node.onkeypress = method;
		break; 
		case "onkeyup": node.onkeyup = method;
		break; 

		//Only valid in form elements.
		case "onchange": node.onchange = method;
		break;
		case "onsubmit": node.onsubmit = method;
		break; 
		case "onreset": node.onreset = method;
		break; 
		case "onselect": node.onselect = method;
		break; 
		case "onblur": node.onblur = method;
		break; 
		case "onfocus": node.onfocus = method;
		break; 

		// Only valid in body and frameset elements.
		case "onload": node.onload = method;
		break; 
		case "onunload": node.onunload = method;
		break; 
		
		default: alert("Unknown event: '" + evnt + "'.");
	
	};

  },
  
  parseAttributes: function(nodeSrc, nodeDest) {

	if(nodeSrc.attributes != null){
		
		for(var c=0;c<nodeSrc.attributes.length;c++){
			if(nodeSrc.attributes[c].name.indexOf('on')==0){
				var funcStr = nodeSrc.attributes[c].value;
				var method = function(event){eval(funcStr)};
				this.setEvent(nodeDest, nodeSrc.attributes[c].name, method);
			}else{
					var strReplacing = this.options.listName + "[" + this.options.startIndex + "]";
					var strToReplace = this.options.listName + "[0]";
					var nodeValue = nodeSrc.attributes[c].value.replace(strToReplace,strReplacing);
					
					//@carles. 
					var strToReplaceRowIndex = "{rowIndex}";
					var strFromReplaceRowIndex = this.options.startIndex;
					
					nodeValue = nodeValue.replace(strToReplaceRowIndex,strFromReplaceRowIndex);
					//@end carles
					
					nodeDest.setAttribute(nodeSrc.attributes[c].name,nodeValue);
			}
		}
	}    return nodeDest;
	
  },

  parseNode: function(nodeSrc, nodeDest) {

	for(var i=0;i < nodeSrc.childNodes.length;i++){
		var subNodeSrc = nodeSrc.childNodes[i];
		if(subNodeSrc.childNodes.length>0){
			if(subNodeSrc.nodeName == 'script'){
//				eval(subNodeSrc.text);
			}else{
				var subNodeDest = document.createElement(subNodeSrc.nodeName);
				subNodeDest = this.parseAttributes(subNodeSrc,subNodeDest);
				nodeDest.appendChild(subNodeDest);
				
				subNodeDest = this.parseNode(subNodeSrc,subNodeDest);
			}
		}
		else
		if(subNodeSrc.nodeType == 3)
		{
			var newText = document.createTextNode(subNodeSrc.text);
			nodeDest.appendChild(newText);
		}else{
			var subNodeDest = document.createElement(subNodeSrc.nodeName);
			
			nodeDest.appendChild(subNodeDest);
			subNodeDest = this.parseAttributes(subNodeSrc,subNodeDest);
			
		}
		
		
	}
    return nodeDest;
  },

  updateContentIE: function(options) {

    
	var receiver = this.options.target;
	
	if(options.cachedRow == undefined){
		var response = this.transport.responseText;
		options.cachedRow = response;
	}else{
		var response = options.cachedRow;
	}
//	alert(response);
	// Replace list index
	var strReplacing = this.options.listName + "[" + this.options.startIndex + "]";
	var strToReplace = this.options.listName + "[0]";
	response = response.replace(strToReplace,strReplacing);
	while(response.indexOf(strToReplace)!=-1){
		response = response.replace(strToReplace,strReplacing);
	}
	
	// Replace ${rowIndex}
	//@carles. 
	var strToReplaceRowIndex = "{rowIndex}";
	var strFromReplaceRowIndex = this.options.startIndex;

	response = response.replace(strToReplaceRowIndex,strFromReplaceRowIndex);
	while(response.indexOf(strToReplaceRowIndex)!=-1){
		response = response.replace(strToReplaceRowIndex,strFromReplaceRowIndex);
	}
	
	//alert(response);
	//@end carles
	
	
//	response = "<table><tbody>" + response + "</tbody></table>";
	
	var builderDiv = document.createElement("div");
	builderDiv.innerHTML = response;
	


	var trFinal = builderDiv.getElementsByTagName("tr")[0];
	
	if(trFinal == undefined){
		alert("Error in 'fwk:addrow' tag:\nAjax response must containt a TR element!");
	}
	

	var error = false;

	if(this.options.insertInRow == 'first'){
		rowNumberInsert = 0;
	}else if(this.options.insertInRow == 'second'){
		rowNumberInsert = 1;
	}else if(this.options.insertInRow == 'third'){
		rowNumberInsert = 1;
	}else if(this.options.insertInRow == 'last'){
		rowNumberInsert = $(receiver).getElementsByTagName("tbody")[0].childNodes.length;
	}else if(this.options.insertInRow == 'penultimate'){
		rowNumberInsert = $(receiver).getElementsByTagName("tbody")[0].childNodes.length - 1;
	}else if(this.options.insertInRow.indexOf('-') == 0){
		rowNumberInsert = $(receiver).getElementsByTagName("tbody")[0].childNodes.length + eval(this.options.insertInRow);
	}else if(isNaN(this.options.insertInRow)){
		alert('Error: insertInRow \'' + this.options.insertInRow + '\' value not allowed.');
		error = true;
	}else{
		rowNumberInsert = this.options.insertInRow;
	}
	
	if(rowNumberInsert < 0){
		alert('Error: insertInRow value must be > 0.');
		error = true;
	}
	
	if($(receiver).getElementsByTagName("tbody")[0].childNodes.length < rowNumberInsert){
		alert('Error: insertInRow value out of bounds.');
		error = true;
	}
	
	
	
	if(!error){
		if(this.options.insertInRow == 'last'){
			$(receiver).getElementsByTagName("tbody")[0].appendChild(trFinal);
		}else{
			var lastChild = $(receiver).getElementsByTagName("tbody")[0].childNodes[rowNumberInsert];
			$(receiver).getElementsByTagName("tbody")[0].insertBefore(trFinal, lastChild); 
		}
	}

    // Executem scripts
    var match    = new RegExp(Ajax.Updater.ScriptFragment, 'img');
	var scripts  = response.match(match);
    
	if (scripts) {
      match = new RegExp(Ajax.Updater.ScriptFragment, 'im');
      setTimeout((function() {
        for (var i = 0; i < scripts.length; i++)
          eval(scripts[i].match(match)[1]);
      }).bind(this), 10);
    }
	
  },
  
  
  updateContent: function(options) {
  
   // alert('metadata lastindex'+$$('__Metadata-' + this.options.listName + '-lastIndex__')[0].value);
    // increment collection last index
  	$$('__Metadata-' + this.options.listName + '-lastIndex__')[0].value = eval($$('__Metadata-' + this.options.listName + '-lastIndex__')[0].value) + 1;
  
  	var ie = (document.all)? true: false;
  	if(ie) this.updateContentIE(options);
  	else this.updateContentFF(options);
  },
  
  getNextSibling: function(node,number) {

	while((node.nextSibling != null) && (number >= 0)){
	    node = node.nextSibling;
		if(node.tagName == "TR"){
			number -= 1;
		}
	}
	if(number>0)alert("Error: insertInRow index out of bounds.");
	else return node;	

  },
  
  getPreviousSibling: function(node,number) {

	while((node.previousSibling != null) && (number > 0)){
	    node = node.previousSibling;
		if(node.tagName == "TR"){
			number -= 1; 
		}
	}
	if(number>0)alert("Error: insertInRow index out of bounds.");
	else return node;	

  },

  getRefChild: function(parentNode,rowPosition) {

    if(rowPosition.indexOf('-') != -1){
    	return this.getPreviousSibling(parentNode.lastChild,-rowPosition);
    }else{
    	return this.getNextSibling(parentNode.firstChild,rowPosition);
    }

  },  
  
  updateContentFF: function(options) {

	var receiver = this.options.target;
	
	// Cached row
	if(options.cachedRow == undefined){
		var response = this.transport.responseText;
		options.cachedRow = response;
	}else{
		var response = options.cachedRow;
	}
	
	var strReplacing = this.options.listName + "[" + this.options.startIndex + "]";
	var strToReplace = this.options.listName + "[0]";
	if(strToReplace!=strReplacing){
	response = response.replace(strToReplace,strReplacing);
	while(response.indexOf(strToReplace)!=-1){
		response = response.replace(strToReplace,strReplacing);
	}
	}	
	// Replace ${rowIndex}
	//@carles. 
	var strToReplaceRowIndex = "{rowIndex}";
	var strFromReplaceRowIndex = this.options.startIndex;

	response = response.replace(strToReplaceRowIndex,strFromReplaceRowIndex);
	while(response.indexOf(strToReplaceRowIndex)!=-1){
		response = response.replace(strToReplaceRowIndex,strFromReplaceRowIndex);
	}
	
	//@end carles

	trFinal = response;
	
	var error = false;
	var rowPos;
	
	if(this.options.insertInRow == 'first'){
		rowPos = "0";
	}else if(this.options.insertInRow == 'second'){
		rowPos = "1";
	}else if(this.options.insertInRow == 'third'){
		rowPos = "2";
	}else if(this.options.insertInRow == 'last'){
		rowPos = "-0";
	}else if(this.options.insertInRow == 'penultimate'){
		rowPos = "-1";
	}else if(isNaN(this.options.insertInRow)){
		alert('Error: insertInRow \'' + this.options.insertInRow + '\' value not allowed.');
		error = true;
	}else{
		rowPos = this.options.insertInRow;
	}
	
	//response = "<table>" + response + "</table>";
	

	var builderDiv = document.createElement("div");
	builderDiv.innerHTML = response;
	
	alert(response);

	var trFinal = builderDiv.getElementsByTagName("tr")[0];
	
	if(trFinal == undefined){
		alert("Error in 'fwk:addrow' tag:\nAjax response must containt a TR element!");
	}
	

	if(!error){
		if(this.options.insertInRow == 'last'){
			$(receiver).getElementsByTagName("tbody")[0].appendChild(trFinal);
		}else{
			var parentNode = $(receiver).getElementsByTagName("tbody")[0];
			var child = this.getRefChild(parentNode,rowPos);
			$(receiver).getElementsByTagName("tbody")[0].insertBefore(trFinal, child); 
		}
	}

//	// Executem scripts
//    var match    = new RegExp(Ajax.Updater.ScriptFragment, 'img');
//	var scripts  = response.match(match);
//
//	if (scripts) {
//      match = new RegExp(Ajax.Updater.ScriptFragment, 'im');
//      setTimeout((function() {
//        for (var i = 0; i < scripts.length; i++){
//        	eval(scripts[i].match(match)[1]);
//        }
//      }).bind(this), 10);
//    }
	
	
  }
});
