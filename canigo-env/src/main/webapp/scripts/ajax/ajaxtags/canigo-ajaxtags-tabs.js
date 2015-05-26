var _pageTopScroll_ = 0;

function executeAjaxTab(elem, url, params,contStyleId,curStyleId) {
  var myAjax = new AjaxJspTag.TabPanel(url, {
parameters: params,
currentStyleId: curStyleId,
postFunction: initializeMenus,
target: contStyleId,
source: elem
});
}

function doScrollTop(){
	document.documentElement.scrollTop = _pageTopScroll_;
}

function toggleTab(sourceElem,currentStyleId,sourceDiv,allDivs) {
//   alert("toggleTab:currentStyleId"+$(currentStyleId)+"sourceElem"+sourceElem+" sourceDiv:"+$(sourceDiv)+" destDiv:"+$(destDiv));
    //alert("allDivs:"+allDivs);
   // LI Style
  //alert($(sourceDiv).innerHTML);
  //alert(sourceDiv);

	for (var i = 0; i < allDivs.length; i++) {
          if (allDivs[i]==sourceDiv) {
             Element.show($(sourceDiv));
          }
          else {
             Element.hide($(allDivs[i]));
          }
    }    
    
//	var lastCurrentElem = $(currentStyleId);
//	lastCurrentElem.removeAttribute('id');


	for(var i = 0;i < sourceElem.parentNode.parentNode.childNodes.length;i++){	
	   sourceElem.parentNode.parentNode.childNodes[i].id='';
	}
	sourceElem.parentNode.id = currentStyleId;    
	
	// Control Scroll	
//    _pageTopScroll_ = document.documentElement.scrollTop;
//    setTimeout("doScrollTop()",1);
}

function toggleTabServer(sourceElem,currentStyleId,sourceDiv,url,allDivs) {
//	alert('url'+$(sourceDiv).innerHTML.length);
	if($(sourceDiv).innerHTML==''){
//		alert('buit');
		var myAjax = new AjaxJspTag.TabPanel(url, {
		parameters: null,
		currentStyleId: currentStyleId,
//		postFunction: initializeMenus,
		target: sourceDiv,
		source: sourceElem
		});
		toggleTab(sourceElem,currentStyleId,sourceDiv,allDivs);
	}else{
		toggleTab(sourceElem,currentStyleId,sourceDiv,allDivs);
	}
}

function updateContentTabs(html) {
   
    var match    = new RegExp(Ajax.Updater.ScriptFragment, 'img');
    var response = html.replace(match, '');
    var scripts  = html.match(match);
    alert("scripts:"+scripts.length);
        
    if (scripts) {
      match = new RegExp(Ajax.Updater.ScriptFragment, 'im');
      setTimeout((function() {
        for (var i = 0; i < scripts.length; i++)
          eval(scripts[i].match(match)[1]);
      }).bind(this), 10);
    }
    
    return response;
    
  }
  
  