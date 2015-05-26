var CanigoSearchPanelTag = {
  Version: '1.0'
}
var isAttach = false;
/**
 * Extension of CanigoFieldTag
 */ 
CanigoSearchPanelTag.Base = function() {};
CanigoSearchPanelTag.Base.prototype = (new AjaxJspTag.Base()).extend({
});


CanigoSearchPanelTag.Search = Class.create();
CanigoSearchPanelTag.Search.prototype = (new AjaxJspTag.Base()).extend({

  initialize: function(url, options) {
   // alert('1');
    this.baseUrl = url;
    this.setOptions(options);
    //alert('2');
    this.suggestList = new Array();
    this.currentIndex = 0;
 
     //alert('5');
    this.checkErrors();
        
    //alert('6');
    this.attachBehaviors(this.options.sourceElem, this.options.eventType, this.sourceElemChanged, this);
    //alert('7');
  },

  setOptions: function(options) {
 
    this.options = {      
      sourceElem: $(options.source),
      targetElem: $(options.target),
      className: options.className ? options.className : "popupSearch",
      eventType: options.eventType ? options.eventType : "click"
//      appendValue: evalBoolean(options.appendValue),
//      appendSeparator: options.appendSeparator || " ",
//      forceSelection: evalBoolean(options.forceSelection)
    }.extend(options || {});

    
    // Autocomplete is unique in that we may have a progress icon
    // So, we need to hook in the resetProgressStyle function on an empty result
//    var self = this;
//    this.options.emptyFunction = function() {
//      self.handleEmptyResult();
//      if (options.emptyFunction) options.emptyFunction();
//    }
	this.isIE=(document.all)? true: false;
    this.popupElem = this.options.popupId;
  },
  
  checkErrors: function() {
    var errors ="";
    if (!this.options.sourceElem){
       errors=errors+"The source is not an element \n";	
    } 
    if (!this.options.targetElem){
        errors=errors+"The source is not an element \n";	
    }
    if (this.options.indicator!='null'){
   
        if (!($(this.options.indicator))){
             errors=errors+"The indicator is not an element \n";
        }	
    }
    if (errors!=""){
       errors="Errors in searchPanel \n"+errors;
       alert(errors);
    }          
  },
  
 /**
  *Recibe los datos del servidor y los pinta
  **/
  
  searchPanelView: function() {
	 // alert('8');
     var miDiv = $(this.popupElem);
//     var tableS = miDiv.getElementsByTagName("table")[1];
//     var trB = miDiv.getElementsByTagName("tr").length;
     var numCols = this.options.numColumns;
    
    
     var resultsTable = miDiv.getElementsByTagName("table")[1];
     //alert("resultsTable:"+resultsTable);
     

     var trs = resultsTable.getElementsByTagName("tr");

     miDiv.removeChild(resultsTable);     
     resultsTable = this.createTable();     
     miDiv.appendChild(resultsTable);
     
     if (this.xml!=null)
     {
	     var json = this.xml.parseJSON();
	     items = json;
         for (var i=0; i<items.length; i++) {      
	          var tr4= document.createElement("tr");
	          var it = items[i];
		      for (var j=0; j<=numCols;j++){
		        var value = eval("it."+"C"+j);    
		        if (j==0)
		           tr4.setAttribute("id",value);
		        else{   
		            var valueText = document.createTextNode(value);
		            var td = document.createElement("td");
		            td.appendChild(valueText);
		            tr4.appendChild(td);
		        }
		     }
			 
		    resultsTable.getElementsByTagName("tbody")[0].appendChild(tr4); 
	    }  
      
       this.setSelected();
       
	}else{
	    var tr = document.createElement("tr");
	    var td = document.createElement("td");
	    var labelText = document.createTextNode("No hay resultados para esta busqueda");
	    td.setAttribute("colSpan",numCols);
	    td.appendChild(labelText);
	    tr.appendChild(td);
	    resultsTable.getElementsByTagName("tbody")[0].appendChild(tr); 

	}
	
  },
		 
  sourceElemChanged: function(e) {
      if (this.miDiv==null) {
         this.initPopup();
      	 //$(this.popupElem).style.visibility = 'visible';
  	     //Element.show($(this.popupElem));  	     
 	     //alert("Show popup first");
 	     
  	     this.functionWindow = this._checkPanel.bindAsEventListener(this);
  	     this.attachBehaviorsSimple(window,"click",this.functionWindow,this);         
      }
      else {
	      if ($(this.popupElem).style.visibility == 'visible'){
	    	   this.hidePopup();
	       		Event.stop(e);
	      }else{
	      	  $(this.popupElem).style.visibility = 'visible';
	  	      Element.show($(this.popupElem)); 
	 	      //alert("Show popup");
	  	      this.functionWindow = this._checkPanel.bindAsEventListener(this);
	  	      this.attachBehaviorsSimple(window,"click",this.functionWindow,this);
	      }
      }
  },
 
 
 initPopup: function() {
      
  //  alert('3');
	    this.miDiv = this.createPopup();
 //   alert('4');       
    	this.createIframe();
 //   this.setDivStyles();
//    this.setSelected();
    	this.setPopupStyles();   
    	window._dynarch_searchPanel=this.miDiv;
      
      
      
 },   
  
  sourceElemClick: function(e) {
    
      var oOptions = this.options;
      var oThis = this;
      var searchField = document.getElementsByName("searchField")[0]; 

      if (oOptions.indicator) {
         Element.show($(oOptions.indicator));              
      }
    
      searchPanelService.doSearchSimple(oOptions.queryParameter,searchField.value,oOptions.optionsListName,oOptions.tableProperties,oOptions.selectedProperty,0,
      {
	 		callback:function(dataFromServer) {
		        if (oOptions.indicator) {
        	       Element.hide($(oOptions.indicator));              
        		}

	 			oThis.handlerFunction(dataFromServer);
	 		},
	 		timeout:1000
	 	}
	  );     		

  },
  sourceElemKeyPress: function(e) {
 
    var key = e.keyCode;
   
    if (key == 13)
    {
      var oOptions = this.options;
      var oThis = this;
      var searchField = document.getElementsByName("searchField")[0]; 

      if (oOptions.indicator) {
         Element.show($(oOptions.indicator));              
      }   
     // alert("searchPanelService:"+oOptions.queryParameter);
      searchPanelService.doSearch(oOptions.queryParameter,searchField.value,oOptions.optionsListName,oOptions.tableProperties,oOptions.selectedProperty,
      {
	 		callback:function(dataFromServer) {
		        if (oOptions.indicator) {
        	       Element.hide($(oOptions.indicator));              
        		}

	 			oThis.handlerFunction(dataFromServer);
	 		},
	 		timeout:1000
	 	}
	 	
	   );  
	 
	 }else if (key == 27) {
           this.hidePopup();
           Event.stop(e);
 	 }

  },
  
  
  fillField: function(selection) {
   
    this.options.targetElem.value = selection.parentNode.getAttribute("id");
    $(this.popupElem).style.visibility = 'hidden';
    this.hidePopup();
  },

  handleEmptyResult: function(e) {
    this.resetProgressStyle();
    if (this.options.forceSelection == "true") {
      // remove last character typed
      this.options.sourceElem.value = this.options.sourceElem.value.substr(0, this.options.sourceElem.value.length-1);
    } else {
      // simply hide the popup
      this.hidePopup();
    }
  },

  handlerFunction: function(xml) {
   
    this.xml = xml;    
   // this.resetProgressStyle();
    if (this.options.method!=null & this.options.method!=""){
	   eval(this.options.method+"()");
    }
    else {
       this.searchPanelView();
    }
  },

  executePostFunction: function() {
    if (this.options.postFunction) {
      this.options.postFunction(this.xml);
    }
  },

  createPopup: function(e) {
    
    new Insertion.Top(
      document.getElementsByTagName("body")[0],
       "<div id=\""+this.popupElem+"\" class=\""+this.options.className+"\"></div>");    
       
    var miDiv = $(this.popupElem);
//    miDiv.innerHTML="<input type=\"button\" value=\"Buscare\"/>";
      
//    miDiv.setAttribute("id",this.popupElem);
//    miDiv.setAttribute("class",this.options.className);
//    miDiv.setAttribute("style","display:none");
  
    var table1 = document.createElement("table");    
    var tbody = document.createElement("tbody");
    
    var tr1 = document.createElement("tr");
    var td1 =  document.createElement("td");
    var td2 =  document.createElement("td");
    
    var inputButton = document.createElement("input");
    inputButton.setAttribute("type","button");
    inputButton.setAttribute("value","Buscar");
    inputButton.setAttribute("id","searchbutton");
    td2.appendChild(inputButton);
   
    var inputText = document.createElement("input");
    inputText.setAttribute("type","text");
    inputText.setAttribute("name","searchField");
    inputText.setAttribute("value","");
    inputText.setAttribute("id","searchField");
// for ie    
    inputText.setAttribute("class","fieldtext");
    td1.appendChild(inputText);
    
    tr1.appendChild(td1);
    tr1.appendChild(td2);
    tbody.appendChild(tr1);
    table1.appendChild(tbody);
    miDiv.appendChild(table1);
//    document.appendChild(table1);
      
    var labels =this.options.columnLabels; 
   
    if (labels!="null"&&labels!=""){	
        var table2 = this.createTable();
		var tr3 = document.createElement("tr");  
	    var td3 = document.createElement("td");
	    var labelText = document.createTextNode("Resultado de la busqueda");
	    td3.appendChild(labelText);
	    td3.setAttribute("colSpan",this.options.numColumns);
	    tr3.appendChild(td3);
	    table2.getElementsByTagName("tbody")[0].appendChild(tr3); 

	}
 
    miDiv.appendChild(table2);
    if (this.options.className!='null')
        miDiv.style.className=this.options.className;
   
  	var miBody = document.getElementsByTagName("body")[0];
//    miBody.appendChild(miDiv);
    
    this.attachBehaviors(inputButton, "click", this.sourceElemClick, this);
    this.attachBehaviors(inputText, "keyup", this.sourceElemKeyPress, this);
    this.attachBehaviors($(this.popupElem), "keyup", this.sourceElemKeyPress, this);
    this.attachBehaviors(table2, "keyup", this.sourceElemKeyPress, this);
    
    return miDiv;
  
  },
  
  
  createTable:function() {
        var table2 = document.createElement("table");
        table2.setAttribute("id","resultsTable");
        var tbody = document.createElement("tbody");
        var tr2 = document.createElement("tr");
        
       var labels =this.options.columnLabels; 
	    var tokens = labels.tokenize(",", " ", true);
		for(var i=0; i<tokens.length; i++){
		    var pLabel = tokens[i];
		    var td = document.createElement("th");
		    var labelText = document.createTextNode(pLabel);
		    td.appendChild(labelText);
		    tr2.appendChild(td);
		}  
 		tbody.appendChild(tr2)
 		table2.appendChild(tbody);

 		//table2.setAttribute("border","0");	    	    
	    return table2;
  
  },

  hidePopup: function() {
    
    //alert("Hide Popupp");

//    alert("window._dynarch_searchPanel:"+window._dynarch_searchPanel.id);
    $(window._dynarch_searchPanel.id).style.visibility = 'hidden';
//    this.removeBehaviors(document,"click",this.functionWindow,this);
    $('layerCover1').style.display = "none";
    
  },

  setProgressStyle: function() {
    if (this.options.progressStyle != null) {
      Element.addClassName(this.options.sourceElem, this.options.progressStyle);
    }
  },

  resetProgressStyle: function() {
    if (this.options.progressStyle != null) {
      Element.removeClassName(this.options.sourceElem, this.options.progressStyle);
    }
  },

  setSelected: function() {
   
//    this.currentIndex = 0;
    this.currentIndex=2;
    this.suggestList = $(this.popupElem).getElementsByTagName("tr");

    if ((this.suggestList.length > 1)
       || (this.suggestList.length == 1
           && this.suggestList[0].innerHTML != $F(this.options.targetElem))) {
       
      this.setPopupStyles();
    
      for (var i = this.currentIndex ; i < this.suggestList.length; i++) {
          this.suggestList[i].index = i;
          this.addOptionHandlers(this.suggestList[i]);
      }
//      alert('setSelected'+this.suggestList[0]+'-'+this.suggestList[1]+'-'+this.suggestList.length);
      if(this.currentIndex<this.suggestList.length){
          this.suggestList[this.currentIndex].className = 'selected';
      }
    }else {
       $(this.popupElem).style.visibility = 'hidden';
    }
    return null;
  },

 
  setPopupStyles: function() {    
    var maxHeight;
    if (isIE) {
      maxHeight = 200;
    } else {
      maxHeight = window.outerHeight/3;
    }
    
//    alert("MaxHeight:"+maxHeight);

    if ($(this.popupElem).offsetHeight < maxHeight) {
      $(this.popupElem).style.overflow = 'hidden';
    } else if (isMoz) {
      $(this.popupElem).style.maxHeight = maxHeight + 'px';
      $(this.popupElem).style.overflow = '-moz-scrollbars-vertical';
    } else {
      $(this.popupElem).style.height = maxHeight + 'px';
      $(this.popupElem).style.overflowY = 'auto';
    }
    $(this.popupElem).scrollTop = 0;
    $(this.popupElem).style.visibility = 'visible';
    //alert("Y:"+getElementY(this.options.sourceElem)+":"+$(this.popupElem).style.top);
    //alert("X:"+getElementX(this.options.sourceElem)+":"+$(this.popupElem).style.left);
    
        
    $(this.popupElem).style.top = (getElementY(this.options.sourceElem)+this.options.sourceElem.offsetHeight+2) + "px";
    $(this.popupElem).style.left = getElementX(this.options.sourceElem) + "px";
    if (isIE) {
      $(this.popupElem).style.width = this.options.sourceElem.offsetWidth + "px";
      $(this.miDiv).style.display="block";
      $(this.popupElem).style.overflow = "visible";
//      alert($(this.miDiv).style.top+","+$(this.miDiv).style.left+","+$(this.miDiv).style.width+","+$(this.miDiv).style.display+","+$(this.miDiv).style.visibility);
    } else {
      $(this.popupElem).style.minWidth = this.options.sourceElem.offsetWidth + "px";
    }

//$(this.popupElem).style.backgroundColor="blue";
$(this.popupElem).style.border = "1px solid black";
   // alert("Fi popup");
    // do iframe
    $('layerCover1').style.top = (getElementY(this.options.sourceElem)+this.options.sourceElem.offsetHeight+2) + "px";
//	alert("Fi popup1");
    $('layerCover1').style.left = getElementX(this.options.sourceElem) + "px";
//    alert("Fi popup2");
    $('layerCover1').style.width = 200;//$(this.popupElem).offsetWidth;
    $('layerCover1').style.backgroundColor = "fff";
//	alert("Fi popup3");        
    $('layerCover1').style.height = $(this.popupElem).offsetHeight + "px";
//    alert("LayerCover"+$('layerCover1').style.display+"LayerCover"+$('layerCover1').style.top+","+$('layerCover1').style.left+","+$('layerCover1').style.width+$('layerCover1').style.height);
    $('layerCover1').style.display = "block";
    $('layerCover1').style.zIndex = 10;
    
    $(this.popupElem).style.zIndex = 20;
  },



  setDivStyles: function() {
    var maxHeight;
    if (isIE) {
      maxHeight = 200;
    } else {
      maxHeight = window.outerHeight/3;
    }

    if ($(this.miDiv).offsetHeight < maxHeight) {
      $(this.miDiv).style.overflow = 'hidden';
    } else if (isMoz) {
      $(this.miDiv).style.maxHeight = maxHeight + 'px';
      $(this.miDiv).style.overflow = '-moz-scrollbars-vertical';
    } else {
      $(this.miDiv).style.height = maxHeight + 'px';
      $(this.miDiv).style.overflowY = 'auto';
    }
    $(this.miDiv).scrollTop = 0;
    //$(this.miDiv).style.visibility = 'visible';

    
    $(this.miDiv).style.top = (getElementY(this.options.sourceElem)+this.options.sourceElem.offsetHeight+2) + "px";
    $(this.miDiv).style.left = getElementX(this.options.sourceElem) + "px";
    
//    alert($(this.miDiv).style.top+","+$(this.miDiv).style.left);
    
    if (this.isIE) {
      $(this.miDiv).style.width = this.options.sourceElem.offsetWidth + "px";
//      alert($(this.miDiv).style.top+","+$(this.miDiv).style.left+","+$(this.miDiv).style.width);
    } else {
      $(this.miDiv).style.minWidth = this.options.sourceElem.offsetWidth + "px";
    }
    $(this.miDiv).style.overflow = "visible";
    
  },

  
  
  createIframe: function() {
    new Insertion.Before($(this.popupElem), "<iframe id='layerCover1' style='position: absolute; top: 0; left: 0;' src='about:blank' frameborder='0' scrolling='no'></iframe>");
  },
  
//  createIframe: function() {  
//    var miiFrame = document.createElement("iFrame");
//    miiFrame.setAttribute("id","layerCover");
//    miiFrame.setAttribute("style","display: none; position: absolute; top: 0; left: 0;");
//    miiFrame.setAttribute("src","about:blank");
//    miiFrame.setAttribute("frameborder","0");
//    miiFrame.setAttribute("scrolling","no");
//    var miBody = document.getElementsByTagName("body")[0];
//    miBody.appendChild(miiFrame);
//    this.setPopupStyles();
//    this.attachBehaviors(miiFrame, "keyup", this.sourceElemKeyPress, this);
//  },

  handleClick: function(e) {
    //alert('handleClick');
    this.fillField(Event.element(e));
   // this.executePostFunction();
  },

  handleOver: function(e) {
 
    this.suggestList[this.currentIndex].className = '';
    this.currentIndex = Event.element(e).parentNode.index;
    this.suggestList[this.currentIndex].className = 'selected';
  },

  addOptionHandlers: function(option) {
    option.onclick = this.handleClick.bindAsEventListener(this);
    option.onmouseover = this.handleOver.bindAsEventListener(this);
  },
  
 _checkPanel: function(ev) {
//    alert("_checkPanel"+window._dynarch_searchPanel);
    //alert(ev);
	var panel = $(window._dynarch_searchPanel)
	if (!panel) {
	    alert("no panel");
		return false;
	}
	
	var el = this.isIE ? this.getElement(ev) : this.getTargetElement(ev);
//	alert("Element event:"+el+" Panel:"+panel.element);	

	for (; el != null && el != panel; el = el.parentNode);
	if (el == null) {	
		if(!isAttach){
			this.hidePopup();	
		}else{
			isAttach = false;
		}
		return false; //this.stopEvent(ev);
	}
  },
  
  getTargetElement: function(ev) {
   
	var f = this.isIE ? window.event.srcElement : ev.target;
	while (f.nodeType != 1)
		f = f.parentNode;
	return f;
  },
  
  getElement: function(ev) {
	var f = this.isIE ? window.event.srcElement : ev.currentTarget;
	while (f.nodeType != 1 || /^div$/i.test(f.tagName))
		f = f.parentNode;
	return f;
  },  
  

  removeBehaviors: function(element, event, listener, obj) {
  
	if(element.detachEvent){
    	element.detachEvent('on'+event,listener);
    }
    else {
	    element.removeEventListener(event,listener,'true');
    }  
    	
  },

  
  stopEvent: function(ev) {
	ev || (ev = window.event);
	if (this.isIE) {
		ev.cancelBubble = true;
		ev.returnValue = false;
	} else {
		ev.preventDefault();
		ev.stopPropagation();
	}
	return false;
  },
  
  attachBehaviorsSimple: function(element, event, listener, obj) {
    	if(element.attachEvent){//alert('attachBehaviorsSimple');
//    		element.attachEvent('on'+event,listener);

			isAttach = true;
    		document.onclick=this.functionWindow;
//    		isAttach = false;alert('attachBehaviorsSimple2'+isAttach);
//    		window._dynarch_searchPanel = this;
    	}
    	else {
	    	element.addEventListener(event,listener,'true');
    	}
    
  }  
  

  
});
  
  


// global object that remembers the calendar
window._dynarch_searchPanel = null;







