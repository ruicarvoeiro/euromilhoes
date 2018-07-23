window.onload=boot;
var oValor;
var raspadinha;
var oBtnSubmeter, oConfigurar;
var oRaspa1, oRaspa3, oRaspa5, oRaspa10;
var oResultado1, oResultado3, oResultado5, oResultado10;
var oBtnRaspar1, oBtnRaspar3, oBtnRaspar5, oBtnRaspar10;
var aSerRaspado1, aSerRaspado3, aSerRaspado5, aSerRaspado10;
var osSimbolosDeJogo1, osSimbolosDeJogo3, osSimbolosDeJogo5, osSimbolosDeJogo10;
var oFeedBackValorGanho1, oFeedBackValorGanho3, oFeedBackValorGanho5, oFeedBackValorGanho10;

function boot(){
	oValor = document.getElementById("idValorEscolhido");	

	oRaspa1 = document.getElementById("idRaspa1");
	oRaspa3 = document.getElementById("idRaspa3");
	oRaspa5 = document.getElementById("idRaspa5");
	oRaspa10 = document.getElementById("idRaspa10");
	
	oBtnSubmeter = document.getElementById("idValorAposta");
	oConfigurar = document.getElementById("idApostaRaspadinhas");

	oBtnRaspar1 = document.getElementById("idRaspar1");
	oBtnRaspar3 = document.getElementById("idRaspar3");
	oBtnRaspar5 = document.getElementById("idRaspar5");
	oBtnRaspar10 = document.getElementById("idRaspar10");

	aJogar1 = document.getElementById("idAJogar1");
	aJogar3 = document.getElementById("idAJogar3");
	aJogar5 = document.getElementById("idAJogar5");
	aJogar10 = document.getElementById("idAJogar10");

	osSimbolosDeJogo1 = document.getElementById("idSimbolosDeJogo1");
	osSimbolosDeJogo3 = document.getElementById("idSimbolosDeJogo3");
	osSimbolosDeJogo5 = document.getElementById("idSimbolosDeJogo5");
	osSimbolosDeJogo10 = document.getElementById("idSimbolosDeJogo10");

	osSeusSimbolosDeJogo1 = document.getElementById("idSeusSimbolosDeJogo1");
	osSeusSimbolosDeJogo3 = document.getElementById("idSeusSimbolosDeJogo3");
	osSeusSimbolosDeJogo5 = document.getElementById("idSeusSimbolosDeJogo5");
	osSeusSimbolosDeJogo10 = document.getElementById("idSeusSimbolosDeJogo10");

	oResultado1 = document.getElementById("idResultado1");
	oResultado3 = document.getElementById("idResultado3");
	oResultado5 = document.getElementById("idResultado5");
	oResultado10 = document.getElementById("idResultado10");

	//Comportamentos:
	raspadinha = new Raspadinhas(oConfigurar, oRaspa1, oRaspa3, oRaspa5, oRaspa10, aJogar1, aJogar3, aJogar5, aJogar10,
	osSimbolosDeJogo1, osSimbolosDeJogo3, osSimbolosDeJogo5, osSimbolosDeJogo10, osSeusSimbolosDeJogo1, osSeusSimbolosDeJogo3, 
	osSeusSimbolosDeJogo5, osSeusSimbolosDeJogo10, oResultado1, oResultado3, oResultado5, oResultado10);
	oBtnSubmeter.onclick = configurar;
	oValor.onselect = configurar;
	oBtnRaspar1.onclick = oBtnRaspar3.onclick = oBtnRaspar5.onclick = oBtnRaspar10.onclick = comecar;	
	raspadinha.render();
	raspadinha.escreverSimbolosDeJogo();
	raspadinha.escreverSeusSimbolo();
	raspadinha.receberPremios();
}//boot

function configurar(){
	var selecionado = oValor.value;
	if (selecionado=="1"){
		raspadinha.estado = Raspadinhas.ESTADO.JOGAR1;
	}
	if (selecionado=="3"){
		raspadinha.estado = Raspadinhas.ESTADO.JOGAR3;
	}
	if (selecionado=="5"){
		raspadinha.estado = Raspadinhas.ESTADO.JOGAR5;
	}
	if (selecionado=="10"){
		raspadinha.estado = Raspadinhas.ESTADO.JOGAR10;		
	}
	raspadinha.render();
	raspadinha.escreverSimbolosDeJogo();
	raspadinha.escreverSeusSimbolo();
	raspadinha.receberPremios();
}//configurar

function comecar(e){
	var evento= e ? e : window.event;
	var onde = evento.target ? evento.target : evento.srcElement;
	var id = onde.id;
	if  (id == "idRaspar1") raspadinha.estado = Raspadinhas.ESTADO.JOGANDO1;
	else if (id == "idRaspar3") raspadinha.estado = Raspadinhas.ESTADO.JOGANDO3;
	else if (id == "idRaspar5") raspadinha.estado = Raspadinhas.ESTADO.JOGANDO5;
	else if (id == "idRaspar10") raspadinha.estado = Raspadinhas.ESTADO.JOGANDO10;
	raspadinha.render();
	raspadinha.escreverSimbolosDeJogo();
	raspadinha.escreverSeusSimbolo();
	raspadinha.receberPremios();
}//comecar
    
