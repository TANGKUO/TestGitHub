nereidFadeObjects = new Object();
nereidFadeTimers = new Object();
/* object - image to be faded (actual object, not name);
 * destop - destination transparency level (ie 80, for mostly solid)
 * rate   - time in milliseconds between trasparency changes (best under 100)
 * delta  - amount of change each time (ie 5, for 5% change in transparency)
 */
function nereidFade(object, destOp, rate, delta){
if (!document.all)
return
    if (object != "[object]"){  //do this so I can take a string too
        setTimeout("nereidFade("+object+","+destOp+","+rate+","+delta+")",0);
        return;
    }
        
    clearTimeout(nereidFadeTimers[object.sourceIndex]);
    
    diff = destOp-object.filters.alpha.opacity;
    direction = 1;
    if (object.filters.alpha.opacity > destOp){
        direction = -1;
    }
    delta=Math.min(direction*diff,delta);
    object.filters.alpha.opacity+=direction*delta;

    if (object.filters.alpha.opacity != destOp){
        nereidFadeObjects[object.sourceIndex]=object;
        nereidFadeTimers[object.sourceIndex]=setTimeout("nereidFade(nereidFadeObjects["+object.sourceIndex+"],"+destOp+","+rate+","+delta+")",rate);
    }
}

function showDIV(objDiv)
{
   var myElement = document.getElementById(objDiv); 
   if (myElement.style.display == "none")
   {
       myElement.style.display = "block";
   }
   else
   {
       myElement.style.display = "none";
   }
}
// Another version of toggle'n an element's Display property:
function getEl(id) { return document.getElementById(id); }
function showhide(id) { getEl(id).style.display =  getEl(id).style.display == 'none' ? '' : 'none'; }

function togDiv(objDiv)
{
   var myElement = document.getElementById(objDiv); 
   if (myElement.style.display == "none")
   {
   	   if (document.all) 
	   {
   	     myElement.style.filter = "progid:DXImageTransform.Microsoft.Pixelate(duration=0.5)";
	     myElement.filters[0].Apply();
         myElement.style.display = "block";
	     myElement.filters[0].Play();
	   }
	   else 
	   {
	     myElement.style.display = "block";
	   }
   }
   else
   {
       myElement.style.display = "none";
   }
}

function chngtxt(textt) {
	var caption = document.getElementById("caption");
	caption.firstChild.nodeValue=textt;
}

sID = "";
function commentWin(sID) {
	window.open('/comments/?blogid='+sID+'','FooComment','toolbar=0,location=0,status=1,menubar=0,scrollbars=0,resizable=0,width=530,height=520');
	//window.open('/commentwin/index.cfm?blogid='+sID+'','FooComment','toolbar=0,location=0,status=0,menubar=0,scrollbars=0,resizable=0,width=576,height=450');
}
function rssLinkWin(cid) {
    window.open('http://www.forgetfoo.com/rsslinx.cfm?catid='+cid+'','RSSLinks','toolbar=0,location=1,status=0,menubar=0,scrollbars=1,resizable10,width=760,height=500');
}
function contactWin() {
    window.open('/contact/','ContactFoO','toolbar=0,location=0,status=0,menubar=0,scrollbars=0,resizable=0,width=500,height=376');
}
function fooDesktop(){
	if (document.all) 
		window.open('http://desktop.forgetfoo.com/','FooDESKTOP','fullscreen');		
}
function openFooChat() {
	if (document.all)
		window.open("/fooChat/fc-real.cfm","FooChat","width=622,height=400,scrollbars=no,resizable=no,location=no,toolbar=no");
}
function sideChat() {
	void(_search=open('/sidechat/','_search'))
}
function openWin(theURL,winName,features) {
  	window.open(theURL,winName,features);
}

//Text field counter
function textCounter(field, countfield, maxlimit) {
	if (field.value.length > maxlimit) // if too long...trim it!
		field.value = field.value.substring(0, maxlimit);
	// otherwise, update 'characters left' counter
	else 
		countfield.value = maxlimit - field.value.length;
	}

// Function to add the code for bold italic and underline, to the message
function AddMessageCode(code,promptText, InsertText) {

	if (code != "") {
		insertCode = prompt(promptText + "\n[" + code + "]xxx[/" + code + "]", InsertText);
			if ((insertCode != null) && (insertCode != "")){
				document.frmImgComment.cComments.value += "[" + code + "]" + insertCode + "[/"+ code + "] ";
			}
	}		
	document.frmImgComment.cComments.focus();
}
	
//Function to add the code to the message for the smileys
function AddSmileyIcon(iconCode) {	
		document.frmImgComment.cComments.value += iconCode + " ";
		document.frmImgComment.cComments.focus();
		document.frmImgComment.cComments.className = 'frm-on';
}

//Function to toggle 'Loading images' in Gallery
function ImgChk()
{
  if (loadingImgallery.style.display == "none")
    return "block";
       
  imgs = galleryContainer.getElementsByTagName('IMG');
  for (var i=0; i<imgs.length; i++)
    if (!imgs[i].complete)
      return "none";
  
  loadingImgallery.style.display = "none";
  return "block";
}
		
//Function to open preview eCard window with all the form variable values defined and passed in the URL
function OpenEcardPreview() {    

    // bgcolor
    if (document.eCardFrm.bgColor[0].checked == true) {
        bg = 'FFFFFF'; }
    if (document.eCardFrm.bgColor[1].checked == true) {    
        bg = 'FFCC00'; }
    if (document.eCardFrm.bgColor[2].checked == true) {    
        bg = 'FF9900'; }
    if (document.eCardFrm.bgColor[3].checked == true) {    
        bg = 'FF9999'; }
    if (document.eCardFrm.bgColor[4].checked == true) {    
        bg = '99CC00'; }
    if (document.eCardFrm.bgColor[5].checked == true) {    
        bg = 'CCCC00'; }
    if (document.eCardFrm.bgColor[6].checked == true) {    
        bg = '66CCCC'; }
    if (document.eCardFrm.bgColor[7].checked == true) {    
        bg = '000000'; }    
    // border color
    if (document.eCardFrm.bdrColor[0].checked == true) {
        bdr = '000000'; }
    if (document.eCardFrm.bdrColor[1].checked == true) {    
        bdr = '666666'; }
    if (document.eCardFrm.bdrColor[2].checked == true) {    
        bdr = '003366'; }
    if (document.eCardFrm.bdrColor[3].checked == true) {    
        bdr = '660099'; }
    if (document.eCardFrm.bdrColor[4].checked == true) {    
        bdr = 'FF0000'; }
    if (document.eCardFrm.bdrColor[5].checked == true) {    
        bdr = '006600'; }
    if (document.eCardFrm.bdrColor[6].checked == true) {    
        bdr = 'FF0066'; }
    if (document.eCardFrm.bdrColor[7].checked == true) {    
        bdr = 'FFFFFF'; }    
    // font color
    if (document.eCardFrm.ftColor[0].checked == true) {
        ft = '000000'; }
    if (document.eCardFrm.ftColor[1].checked == true) {    
        ft = '666666'; }
    if (document.eCardFrm.ftColor[2].checked == true) {    
        ft = '003366'; }
    if (document.eCardFrm.ftColor[3].checked == true) {    
        ft = '660099'; }
    if (document.eCardFrm.ftColor[4].checked == true) {    
        ft = 'FF0000'; }
    if (document.eCardFrm.ftColor[5].checked == true) {    
        ft = '006600'; }
    if (document.eCardFrm.ftColor[6].checked == true) {    
        ft = 'FF0066'; }
    if (document.eCardFrm.ftColor[7].checked == true) {    
        ft = 'FFFFFF'; }   
    
	strImgID = escape(document.eCardFrm.imgID.value);   // a
    strBgcolor = escape(bg);  //escape(document.eCardFrm.bgColor.value);   b
    strBdrColor = escape(bdr);  //escape(document.eCardFrm.bdrColor.value);  // c
    strFtColor = escape(ft);  // escape(document.eCardFrm.ftColor.value);  // d
    strFtFace = escape(document.eCardFrm.ftFace.value); // e
    strFrName = escape(document.eCardFrm.frName.value); // f
    strFrEmail = escape(document.eCardFrm.frEmail.value);  // g
    strToName = escape(document.eCardFrm.toName.value);  // h
    strToEmail = escape(document.eCardFrm.toEmail.value);  // i
    strToHeadline = escape(document.eCardFrm.toHeadline.value);  // j
	strToMsg = escape(document.eCardFrm.toMsg.value);  // k

   	openWin('/gallery/eCardPreview.cfm?a=' +strImgID + '&b=' + strBgcolor + '&c=' + strBdrColor + '&d=' + strFtColor + '&e=' + strFtFace + '&f=' + strFrName + '&g=' + strFrEmail + '&h=' + strToName + '&i=' + strToEmail + '&j=' + strToHeadline + '&k=' + strToMsg + '','','toolbar=0,location=0,status=0,menubar=0,scrollbars=1,resizable=1,width=730,height=375')
}