function EnllacaIdioma(intOrigen,bIdioma1,bIdioma2){

//catala=1,castellà=2,angles=3
var Idiomes = new Array()
Idiomes[0] = "cat"   	//directori
Idiomes[1] = "cas"
Idiomes[2] = "eng"


	if(document.getElementById){
	
		var strURL = new String(window.location)
		
		var idioma1 = document.getElementById("idioma1_link")
		var idioma2 = document.getElementById("idioma2_link")
		
		
		idioma1.href = strURL.replace("/"+Idiomes[intOrigen-1]+"/","/"+Idiomes[bIdioma1-1]+"/")
		idioma2.href = strURL.replace("/"+Idiomes[intOrigen-1]+"/","/"+Idiomes[bIdioma2-1]+"/")

	}
	
}

function addEvent(obj, evType, fn){ 

	if(obj.addEventListener){ 
		obj.addEventListener(evType, fn, false); 
		return true; 
	}else if (obj.attachEvent){ 
		return obj.attachEvent("on" + evType, fn); 
	}else{ 
		return false; 
	} 
 
}

function SelectIdioma(){
var testIdioma = ""

	try{testIdioma=idioma}
	catch(e){}

	if(testIdioma!=""){
		switch(testIdioma){
			case "cat":
				EnllacaIdioma(1,2,3) 
				break
			case "cas":
				EnllacaIdioma(2,1,3) 
				break
			case "eng":
				EnllacaIdioma(3,1,2) 
				break
		}
	}
}


function TreureTextInput(){

	if(document.getElementById){
		//cercador
		if(document.getElementById("cerca")){
			document.getElementById("cerca").blur()
			addEvent(document.getElementById("cerca"), 'focus', function(){
																		 if(document.getElementById("cerca").value=="cercar" || 
																			document.getElementById("cerca").value=="buscar" ||
																			document.getElementById("cerca").value=="search" 
																			) 
																		 document.getElementById("cerca").value=""
																}
			);
		}

		//qui és qui
		if(document.getElementById("query")){
			document.getElementById("query").blur()
			addEvent(document.getElementById("query"), 'focus', function(){
																		 if(document.getElementById("query").value=="Cerca de persones i organismes" ) 
																		 document.getElementById("query").value=""
																}
			);
		}
}
	
}

addEvent(window, 'load', SelectIdioma);
addEvent(window, 'load', TreureTextInput);