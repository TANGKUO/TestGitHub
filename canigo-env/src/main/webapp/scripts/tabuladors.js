/* --------------------------- JAVASCRIPT PEL FUNCIONAMENT DELS TABULADORS ---------------------------- 

-------------------------------------------------------------------------------------------------------
Direcció General d'Atenció Ciutadana - Generalitat de Catalunya
-------------------------------------------------------------------------------------------------------

Afegeix el comportament (mostrar i ocultar) dels tabs-pastilles als elements d'una llista <ul> 
(exemple a la home http://www.gencat.net) o bé a capes <div> relacionades per l'id i l'id_ 
(exemple a la fitxa dels tràmits a serveis) .  

* Es creen els tabuladors i l'event associat amb el mètode nouTab("id_tab1, id_tab2, ...", ["over"])

* S'han d'establir els estils css que corresponen :

	** als menús principals <ul class="?"> :
			- pastilla seleccionada [.estilSelected -> onclick ]
 			- quan estem a sobre [.estilMouseOver -> onmouseover] 
			- quan sortim [.estilUnSelected -> onclick i onmouseout] 

	** als submenús <ul><li><ul class="?"> 
			- estilVisible (per defecte, la primera pastilla de cada bloc en carregar estarà seleccionada)
			- estilOcult 

-> Per accessibilitat, les llistes a les que donarem format han de tenir establerta la propietat 
   ".NoJavascript" que és la que utilitzarem per cercar les <ul> a les que donarem forma i aplicarem 
   l'estil de la propietat ".estilJavascript". 
-> Necessari navegadors DOM (document.getElementById). Si no és mostrarà com una llista normal.
-> El contingut de <ul><li> pot ser un <span>. En aquest cas indicarem l'id del <li> que el conté + "_" -> 
   <span id="[id <li>]_">

---------------------------------------------------------------------------------------------------- */

function gencatTAB(){
	
	var tabuladors = new Array();
	var eventTab = new Array();
	var strLog = "";

	this.estilSelected = "";
	this.estilUnSelected = "";
	this.estilMouseOver = "";
	this.estilVisible = "";
	this.estilOcult = "";
	this.test = false;
	
	this.nouTab = function(){

		if(arguments.length>0){

			if(arguments[0]!=""){

				var nTabs = tabuladors.length
				tabuladors[nTabs] = new Array()

				var arrAux = arguments[0].split(",")
				var cont = 0

				for(var i=0; i<arrAux.length; i++){
					if(arrAux[i]!=""){
						tabuladors[nTabs][cont] = arrAux[i]
						cont++
					}
				}
			}
			
			if(arguments.length==1){
				eventTab[eventTab.length] = "aaa"
			}else if(arguments.length==2){
				eventTab[eventTab.length] = arguments[1].toLowerCase()
			}
			
		}else strLog = "--> No has especificat cap paràmetre en crear el tabulador: \nnouTab('id_tab1, id_tab2, ...', ['over']) \n"
	}

	this.loadTabs = function(){

		if(document.getElementById){
			try{
				if(tabuladors.length>0){

					for(var i=0; i<tabuladors.length; i++){

						for(var j=0; j<tabuladors[i].length; j++){
							var objTab = null

								if(document.getElementById(tabuladors[i][j])){
									objTab = document.getElementById(tabuladors[i][j])
	
									//Codi per onclick
									var fncCodi = ""
									var strEstilTab, strEstilSubTab
									for(var k=0; k<tabuladors[i].length; k++){
										if(tabuladors[i][j]!=tabuladors[i][k]){
											strEstilTab = this.estilUnSelected
											strEstilSubTab = this.estilOcult
										}else{
											strEstilTab = this.estilSelected
											strEstilSubTab = this.estilVisible
										}
										/*fncCodi += "if(document.getElementById('" + tabuladors[i][k] + "').getElementsByTagName('ul').length>0){"
										fncCodi += "document.getElementById('" + tabuladors[i][k] + "').getElementsByTagName('ul')[0].className='" + strEstilSubTab + "';}"
										fncCodi += "else{document.getElementById('" + tabuladors[i][k] + "_').className='" + strEstilSubTab + "';}"*/
											fncCodi += "if(document.getElementById('" + tabuladors[i][k] + "')){"
											fncCodi += "document.getElementById('" + tabuladors[i][k] + "').className='" + strEstilTab + "';"
											//fncCodi += "document.getElementById('" + tabuladors[i][k] + "').innerHTML='" + strEstilTab + "';"
											fncCodi += "if(document.getElementById('" + tabuladors[i][k] + "_')){document.getElementById('" + tabuladors[i][k] + "_').className='" + strEstilSubTab + "';}"
											fncCodi += "else if(document.getElementById('" + tabuladors[i][k] + "').getElementsByTagName('ul').length>0){"
											fncCodi += "document.getElementById('" + tabuladors[i][k] + "').getElementsByTagName('ul')[0].className='" + strEstilSubTab + "';}"
											fncCodi += "}"
									}
			
									//Codi per onmouseover
									fncCodi += "||"
		
									if(eventTab[i]!="over"){
										fncCodi += "if(this.className!='" + this.estilSelected + "'){"
										fncCodi += "this.className ='" + this.estilMouseOver + "';}"
									}else{
										//fncCodi += fncCodi //si l'event és mouseover mostrem igual que en el clic
									}
									
									//Codi per onmouseout
									fncCodi += "||"
									if(eventTab[i]!="over"){
										fncCodi += "if(this.className=='" + this.estilMouseOver + "'){"
										fncCodi += "this.className ='" + this.estilUnSelected + "';}"
									}
									
									objTab.data = fncCodi
		
									objTab.onclick = function(){
										eval(this.data.slice(0,this.data.indexOf("||")))
									}
		
									objTab.onmouseover =  function(){
											var codi = this.data.slice(this.data.indexOf("||")+2, this.data.lastIndexOf("||"))
											if(codi=="") eval(this.data.slice(0,this.data.indexOf("||")))
											else		eval(codi)
									}
									
									objTab.onmouseout =  function(){
											eval(this.data.slice(this.data.lastIndexOf("||")+2) )
									}
		
									try{objTab.style.cursor = "pointer"}catch(e){}
									
									//Apliquem els estils inicials. La primera pastilla de cada bloc serà l'activa
									if(j==0){
										objTab.className = this.estilSelected
										if(document.getElementById(tabuladors[i][j]).getElementsByTagName('ul').length>0)
											document.getElementById(tabuladors[i][j]).getElementsByTagName('ul')[0].className= this.estilVisible
										else{
											if(document.getElementById(tabuladors[i][j] + "_"))
												document.getElementById(tabuladors[i][j] + "_").className= this.estilVisible
										}
									}else{
										objTab.className = this.estilUnSelected
								
										if(document.getElementById(tabuladors[i][j] + "_")){
											document.getElementById(tabuladors[i][j] + "_").className = this.estilOcult
										}else{
											if(document.getElementById(tabuladors[i][j]).getElementsByTagName('ul').length>0){
													document.getElementById(tabuladors[i][j]).getElementsByTagName('ul')[0].className= this.estilOcult
											}
										}
								}
								}
								
								
							}
	
							if(objTab){
								//Al parentNode <ul> li apliquem l'estil .estilJavascript 
								if(objTab.parentNode.className == this.estilNoJavascript)
									objTab.parentNode.className = this.estilJavascript 
							}
					
					}
				
				}


			}catch(e){
				 strLog += "-->"  + e.message + "\n"
			}
		}	
	}
	
	
	this.missatges = function(){
		if(strLog!="" && this.test == true){
			//alert(strLog)
		}
	}

}