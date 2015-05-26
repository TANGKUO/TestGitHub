/*
 * menuExpandable2.js - implements an expandable menu based on a HTML list
 * Author: Dave Lindquist (dave@gazingus.org)
 */

if (!document.getElementById) {
    document.getElementById = function() { return null; }
}
var menuCookie = "menusToExpand";
var itemCookie = "itemToHighlight";

function initializeMenu(menuId, actuatorId) {
    var menu = document.getElementById(menuId);
    var actuator = document.getElementById(actuatorId);

    if (menu == null || actuator == null) return;

    //if (window.opera) return; // I'm too tired
    
    actuator.parentNode.style.listStyleImage = "url("+contextPath+"/images/plus.gif)";
    
    actuator.onclick = function() {
    	
        var display = menu.style.display;
        this.parentNode.style.listStyleImage =
            (display == "block") ? "url("+contextPath+"/images/plus.gif)" : "url("+contextPath+"/images/minus.gif)";
            
        //estils-inici
        if(display == "block"){
        	actuator.style.color="#4D4D4D !important";
        }else if(display == "none" || display == ""){
        	actuator.style.color="#AC2115 !important";
        }
        //estils-fi    

        menu.style.display = (display == "block") ? "none" : "block";
        
        // Begin custom code for remembering expanded menus with cookies
        var menusToExpand = getCookie(menuCookie);
        if (menu.style.display == "block") {
            // set a cookie to keep the menu expanded
            if (menusToExpand == null) {
                setCookie(menuCookie,menuId);
            } else if (menusToExpand.indexOf(menuId) == -1) {
                setCookie(menuCookie,menusToExpand+","+menuId);
            }
        } else {
            // remove it from the expanded cookie list
            if (menusToExpand.indexOf(menuId) != -1) {
                // check for comma after menu
                if (menusToExpand.indexOf(menuId+",") != -1) {
                    menusToExpand = menusToExpand.replace(menuId+",","");
                } else {
                    menusToExpand = menusToExpand.replace(menuId,"");
                }
                if (menusToExpand == "") {
                    deleteCookie(menuCookie);
                } else {
                    setCookie(menuCookie,menusToExpand);
                }
            }
        }
        // End custom code
        
        return false;
    }
}

// This function loops through all the <ul>'s in the document and
// initializes the menus for them if they have menu classes
function initializeMenus() {
    var menu = document.getElementById("menuDiv");
    if(menu){
	    var links = menu.getElementsByTagName("a");
	    var lists = document.getElementsByTagName("ul");
	
	    var actuators = new Array();
	    var nonActuators = new Array();
	    // build an array of actuators
	    for (i=0; i < links.length; i++) {
	        if (links[i].className == "actuator") {
	            actuators[actuators.length] = links[i];
	        } else {
	            nonActuators[nonActuators.length] = links[i];
	        }
	    }
	
	    var menus = new Array();
	    // build an array of menus
	    for (i=0; i < lists.length; i++) {
	        if (lists[i].className == "menu" || lists[i].className == "submenu") {
	            menus[menus.length] = lists[i];
	        }
	    }
	
	    // initialize actuators and menus (number should be the same)
	    for (i=0; i < actuators.length; i++) {
	        initializeMenu(menus[i].id, actuators[i].id);
	    }
	    
	    // Begin custom code to remember last item clicked (with cookies)
	    // add an onclick event to set a cookie on the non-actuators
	    for (i=0; i < nonActuators.length; i++) {
	        // retain any existing onclick handlers from menu-config.xml
	        if (nonActuators[i].onclick) {
	            nonActuators[i].onclick=function() {
	                setCookie(itemCookie,this.href);
	                if (eval(this.getAttribute("onclick")) == false) {
	                    return false;
	                }
	            };
	        } else {
	            nonActuators[i].onclick=function() {
	                setCookie(itemCookie,this.href);
	            };
	        }
	    }
	
	    // user must have cookies enabled for this to work
	    expandMenus();
	}
}

function openMenu(menuId) {
	//alert('expanding menu='+menuId)
    var menu = document.getElementById(menuId);
    //alert('menu='+menu)
    var actuatorId = menuId.substring(0, menuId.indexOf("Menu")) + "Actuator";
    var actuator = document.getElementById(actuatorId);
    if (menu != null) {
        var display = menu.style.display;
        menu.parentNode.style.listStyleImage = "url("+contextPath+"/images/minus.gif)";
        menu.style.display = (display == "block") ? "none" : "block";
        
        //estils-inici
        	actuator.style.color="#AC2115 !important";
	    //estils-fi
    }
    
}

function expandMenus() {
    var menusToExpand = getCookie(menuCookie);
    if (menusToExpand != null) {
        // if more than one menu has been menusToExpanded,
        // create an array of menusToExpanded menus
        if (menusToExpand.indexOf(",") != -1) {
            menuArray = menusToExpand.split(",");
            for (var i=0; i < menuArray.length; i++) {
                openMenu(menuArray[i]);
            }
         } else {
            openMenu(menusToExpand);
         }
    }
    var itemToHighlight = getCookie(itemCookie);
    var links = document.getElementsByTagName("a");
    // add an onclick event to set a cookie on the non-actuators
    for (i=0; i < links.length; i++) {
        if (links[i].href == itemToHighlight && (links[i].className||null) == null) {
            links[i].className += " highlight";
        }
    }
}

//estils-inici
function getStyle(element, style) {
    element = $(element);
    style = style == 'float' ? 'cssFloat' : camelize(style);
    var value = element.style[style];
    if (!value) {
      var css = document.defaultView.getComputedStyle(element, null);
      value = css ? css[style] : null;
    }
    if (style == 'opacity') return value ? parseFloat(value) : 1.0;
    return value == 'auto' ? null : value;
}

function camelize(propietat) {
    var parts = propietat.split('-'), len = parts.length;
    if (len == 1) return parts[0];

    var camelized = propietat.charAt(0) == '-'
      ? parts[0].charAt(0).toUpperCase() + parts[0].substring(1)
      : parts[0];

    for (var i = 1; i < len; i++)
      camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);

    return camelized;
}
//estils-fi

// =========================================================================
//                          Cookie functions 
// =========================================================================
/* This function is used to set cookies */
function setCookie(name,value,expires,path,domain,secure) {
  document.cookie = name + "=" + escape (value) +
    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") + ((secure) ? "; secure" : "");
}

/* This function is used to get cookies */
function getCookie(name) {
	var prefix = name + "=" 
	var start = document.cookie.indexOf(prefix) 

	if (start==-1) {
		return null;
	}
	
	var end = document.cookie.indexOf(";", start+prefix.length) 
	if (end==-1) {
		end=document.cookie.length;
	}

	var value=document.cookie.substring(start+prefix.length, end) 
	return unescape(value);
}

/* This function is used to delete cookies */
function deleteCookie(name,path,domain) {
  if (getCookie(name)) {
    document.cookie = name + "=" +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}

// You can call initializeMenus() manually from your JSP
// window.onload = initializeMenus;
