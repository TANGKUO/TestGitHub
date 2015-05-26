var CanigoAutocompleteTag = {
  Version: '1.0'
}


window.__autocompleteThis = null;


CanigoAutocompleteTag.doSearch = function() {
        
        var oThis = window.__autocompleteThis;
        var oOptions = oThis.options;
		window.__autocompleteThis = null;                
        
        if (oOptions.indicator) {
              Element.show($(oOptions.indicator));              
        }
      	searchPanelService.doSearchSimple(oOptions.queryParameter,oOptions.sourceElem.value,oOptions.optionsListName,oOptions.selectedProperty,oOptions.selectedProperty,1,
//      	autocompleteService.doAutocomplete(oOptions.sourceElem.value,oOptions.optionsListName,
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

/**
 * Extension of CanigoFieldTag
 */ 
CanigoAutocompleteTag.Base = function() {};
CanigoAutocompleteTag.Base.prototype = (new AjaxJspTag.Base()).extend({
});


CanigoAutocompleteTag.Autocomplete = Class.create();
CanigoAutocompleteTag.Autocomplete.prototype = (new AjaxJspTag.Base()).extend({

  initialize: function(url, options) {
    
    this.baseUrl = url;
    this.setOptions(options);
    this.suggestList = new Array();
    this.currentIndex = 0;
    this.createPopup();
    this.createIframe();
    
    this.options.sourceElem.setAttribute("autocomplete", "off");
    this.attachBehaviors(this.options.sourceElem, this.options.eventType, this.sourceElemChanged, this);
  },

  setOptions: function(options) {
    
    this.options = {      
      sourceElem: $(options.source),
      targetElem: $(options.target),
      eventType: options.eventType ? options.eventType : "keyup",
      appendValue: evalBoolean(options.appendValue),
      appendSeparator: options.appendSeparator || " ",
      className: options.eventType ? options.className : "popupSearch",
      forceSelection: evalBoolean(options.forceSelection)
    }.extend(options || {});

    
    // Autocomplete is unique in that we may have a progress icon
    // So, we need to hook in the resetProgressStyle function on an empty result
    var self = this;
    this.options.emptyFunction = function() {
      self.handleEmptyResult();
      if (options.emptyFunction) options.emptyFunction();
    }

    this.popupElem = "ajaxAutocompletePopup";
    this.isIE=(document.all)? true: false;
  },

  autocomplete: function() {
    
   var json = this.xml.parseJSON();
//    var root = this.xml.documentElement;
       
    // clear contents of container (i.e., DIV tag)
    $(this.popupElem).innerHTML = "";

    var ul = document.createElement("ul");
   // items = root.getElementsByTagName("item");
    items = json;
    for (var i=0; i<items.length; i++) {
//      var name = items[i].getElementsByTagName("name")[0].firstChild.nodeValue;
        var name = items[i].C0;
//      var value = items[i].getElementsByTagName("value")[0].firstChild.nodeValue;
        var value = items[i].C1;
        
       // alert("Bean: name"+name+" value:"+value);
        
        var li = document.createElement("li");
        var liIdAttr = document.createAttribute("id");
        li.setAttribute("id", name);
        var liText = document.createTextNode(name);
        li.appendChild(liText);
        ul.appendChild(li);
    }
    $(this.popupElem).appendChild(ul);
    $(this.popupElem).style.visibility = 'visible';

    this.setSelected();
  },

  sourceElemChanged: function(e) {
    var key = 0;
    var oThis = this;
    if (e.keyCode) { key = e.keyCode; }
    else if (typeof(e.which)!= 'undefined') { key = e.which; }
    var fieldLength = $F(this.options.sourceElem).length;
	clearTimeout(this.timeoutId);
	
	this.attachBehaviorsSimple(window,"click",this.hidePopup,this);
    //up arrow
    if (key == 38) {
      if (this.currentIndex > 0) {
        this.suggestList[this.currentIndex].className = '';
        this.currentIndex--;
        this.suggestList[this.currentIndex].className = 'selected';
        this.suggestList[this.currentIndex].scrollIntoView(false);
      }

    //down arrow
    } else if (key == 40) {
      if(this.currentIndex < this.suggestList.length - 1) {
        this.suggestList[this.currentIndex].className = '';
        this.currentIndex++;
        this.suggestList[this.currentIndex].className = 'selected';
        this.suggestList[this.currentIndex].scrollIntoView(false);
      }

    //enter
    } else if (key == 13 && $(this.popupElem).style.visibility == 'visible') {
      this.fillField(this.suggestList[this.currentIndex]);
      Event.stop(e);
       if (oOptions.indicator) {
              Element.show($(oOptions.indicator));              
       }
       this.executePostFunction();    
       if (oOptions.indicator) {
        	  Element.hide($(oOptions.indicator));              
       }  

    //escape
    } else if (key == 27) {
      this.hidePopup();
      Event.stop(e);

    } else {
      if (fieldLength < this.options.minimumCharacters) {
        this.hidePopup();
      } else if (key != 37 && key != 39 && key != 17 && key != 18) {
        this.resolveParameters();
        this.setAjaxOptions({
          parameters: arrayToParameterString(this.buildParameterString(this.options.parameters).split(','))
        });
        this.setProgressStyle();
        if (window.__autocompleteThis==null) {
		   window.__autocompleteThis = this;
      	   setTimeout("CanigoAutocompleteTag.doSearch()",1000);
      	}
      	

      }
    }
  },
  
  
  
  
  attachBehaviorsSimple: function(element, event, listener, obj) {
    	if(element.attachEvent){//alert('attachBehaviorsSimple');
//    		element.attachEvent('on'+event,listener);

//			isAttach = true;
    		document.onclick=this.hidePopup;
//    		isAttach = false;alert('attachBehaviorsSimple2'+isAttach);
//    		window._dynarch_searchPanel = this;
    	}
    	else {
	    	element.addEventListener(event,listener,'true');
    	}
    
  },  
  

  fillField: function(selection) {
    this.options.sourceElem.value = decodeHtml(selection.innerHTML);
    if (this.options.appendValue == "false") {
      this.options.targetElem.value = selection.getAttribute("id");
    } else {
      if (this.options.targetElem.value.length > 0)
        this.options.targetElem.value += this.options.appendSeparator;
      this.options.targetElem.value += selection.getAttribute("id");
    }
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
    this.resetProgressStyle();
    this.autocomplete();
  },

  executePostFunction: function() {
    if (this.options.postFunction) {
      this.options.postFunction(this.xml);
    }
  },

  createPopup: function() {
    new Insertion.Top(
      document.getElementsByTagName("body")[0],
        "<div id=\""+this.popupElem+"\" class=\""+this.options.className+"\"></div>");
  },

  hidePopup: function() {
    $(window._autocomplete.id).style.visibility = 'hidden';
    $('layerCover').style.display = "none";
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
    this.currentIndex = 0;
    this.suggestList = $(this.popupElem).getElementsByTagName("li");
    if ((this.suggestList.length > 1)
       || (this.suggestList.length == 1
           && this.suggestList[0].innerHTML != $F(this.options.sourceElem))) {
      this.setPopupStyles();
      for (var i = 0; i < this.suggestList.length; i++) {
        this.suggestList[i].index = i;
        this.addOptionHandlers(this.suggestList[i]);
      }
      this.suggestList[0].className = 'selected';
    } else {
      $(this.popupElem).style.visibility = 'hidden';
    }
    window._autocomplete=$(this.popupElem);
    return null;
  },

  setPopupStyles: function() {
    var maxHeight;
    if (isIE) {
      maxHeight = 200;
    } else {
      maxHeight = window.outerHeight/3;
    }

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

    $(this.popupElem).style.top = (getElementY(this.options.sourceElem)+this.options.sourceElem.offsetHeight+2) + "px";
    $(this.popupElem).style.left = getElementX(this.options.sourceElem) + "px";
    if (isIE) {
      $(this.popupElem).style.width = this.options.sourceElem.offsetWidth + "px";
    } else {
      $(this.popupElem).style.minWidth = this.options.sourceElem.offsetWidth + "px";
    }
    $(this.popupElem).style.overflow = "visible";

    // do iframe
    $('layerCover').style.top = (getElementY(this.options.sourceElem)+this.options.sourceElem.offsetHeight+2) + "px";
    $('layerCover').style.left = getElementX(this.options.sourceElem) + "px";
    $('layerCover').style.width = $(this.popupElem).offsetWidth;
    $('layerCover').style.height = $(this.popupElem).offsetHeight;
    $('layerCover').style.display = "block";
    $('layerCover').style.zIndex = 10;
    $(this.popupElem).style.zIndex = 20;
  },

  createIframe: function() {
    new Insertion.Before($(this.popupElem), "<iframe id='layerCover' style='display: none; position: absolute; top: 0; left: 0;' src='about:blank' frameborder='0' scrolling='no'></iframe>");
   
  },

  handleClick: function(e) {
    this.fillField(Event.element(e));
    this.executePostFunction();
  },

  handleOver: function(e) {
    this.suggestList[this.currentIndex].className = '';
    this.currentIndex = Event.element(e).index;
    this.suggestList[this.currentIndex].className = 'selected';
  },

  addOptionHandlers: function(option) {
    option.onclick = this.handleClick.bindAsEventListener(this);
    option.onmouseover = this.handleOver.bindAsEventListener(this);
  }

});


window._autocomplete = null;

