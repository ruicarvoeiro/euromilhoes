var seq=[];
var dicionario=[];

function Raspadinhas(pConfigurar, pRaspa1, pRaspa3, pRaspa5, pRaspa10, pJogar1, pJogar3, pJogar5, pJogar10,
 pOsSimbolosDeJogo1, pOsSimbolosDeJogo3, pOsSimbolosDeJogo5, pOsSimbolosDeJogo10, pSeusSimbolosDeJogo1, pSeusSimbolosDeJogo3, 
 pSeusSimbolosDeJogo5, pSeusSimbolosDeJogo10, pResultado1, pResultado3, pResultado5, pResultado10){
	
	this.zonaConfiguracao = pConfigurar;
	
	this.zonaRaspa1 = pRaspa1;
	this.zonaRaspa3 = pRaspa3;
	this.zonaRaspa5 = pRaspa5;
	this.zonaRaspa10 = pRaspa10;

	this.estado = Raspadinhas.ESTADO.CONFIGURACAO;

	this.zonaJogar1 = pJogar1;
	this.zonaJogar3 = pJogar3;
	this.zonaJogar5 = pJogar5;
	this.zonaJogar10 = pJogar10;
	
	this.zonaSimbolos1 = pOsSimbolosDeJogo1;
	this.zonaSimbolos3 = pOsSimbolosDeJogo3;
	this.zonaSimbolos5 = pOsSimbolosDeJogo5;
	this.zonaSimbolos10 = pOsSimbolosDeJogo10;

	this.zonaSeusSimbolos1 = pSeusSimbolosDeJogo1;
	this.zonaSeusSimbolos3 = pSeusSimbolosDeJogo3;
	this.zonaSeusSimbolos5 = pSeusSimbolosDeJogo5;
	this.zonaSeusSimbolos10 = pSeusSimbolosDeJogo10;

	this.zonaResultado1 = pResultado1;
	this.zonaResultado3 = pResultado3;
	this.zonaResultado5= pResultado5;
	this.zonaResultado10 = pResultado10;
}

function visibilidade(zona, visivel){
	if(visivel){
	zona.style.display = "block";		
	}//if
	else{
	zona.style.display = "none";	
	}//else
}//visibilidade

function gerarImagensAleatorias(){
	imagem = new Array(22);
	imagem[0] ='<img src="simbolos_de_jogo/arco_iris.png">';
	imagem[1] = '<img src="simbolos_de_jogo/balao.png">';
	imagem[2] = '<img src="simbolos_de_jogo/banco.png">';
	imagem[3] = '<img src="simbolos_de_jogo/bandeira.png">';
	imagem[4] = '<img src="simbolos_de_jogo/bilhete.png">';
	imagem[5] = '<img src="simbolos_de_jogo/blcris.png">';
	imagem[6] = '<img src="simbolos_de_jogo/bolo.png">';
	imagem[7] = '<img src="simbolos_de_jogo/carris.png">';
	imagem[8] = '<img src="simbolos_de_jogo/carteira.png">';
	imagem[9] = '<img src="simbolos_de_jogo/chclat.png">';
	imagem[10] = '<img src="simbolos_de_jogo/chmpgn.png">';
	imagem[11] = '<img src="simbolos_de_jogo/coktail.png">';
	imagem[12] = '<img src="simbolos_de_jogo/comboio.png">';
	imagem[13] = '<img src="simbolos_de_jogo/foguete.png">';
	imagem[14] = '<img src="simbolos_de_jogo/jornal.png">';
	imagem[15] = '<img src="simbolos_de_jogo/mala.png">';
	imagem[16] = '<img src="simbolos_de_jogo/mochila.png">';
	imagem[17] = '<img src="simbolos_de_jogo/moedas.png">';
	imagem[18] = '<img src="simbolos_de_jogo/notas.png">';
	imagem[19] = '<img src="simbolos_de_jogo/relogio.png">';
	imagem[20] = '<img src="simbolos_de_jogo/rolha.png">';
	imagem[21] = '<img src="simbolos_de_jogo/tesouro.png">';
	var i = Math.floor(Math.random() * imagem.length);
	return imagem[i];
}//gerarImagensAleatorias

function escreverTabelas(tamanho, num){
	var tabelaHtml="<table border='1'>";
	tabelaHtml+="<tbody>";
        for (var idx=0; idx<tamanho * 2; idx++){   
			var linha = "";
        	dicionario.push ({
        		imagem: gerarImagensAleatorias(),
        		valor: sequenciaAleatoria(num)
        	});
        	if (idx%2 == 0) linha += "<tr>";

        	linha += "<td>"+ dicionario[idx]['imagem'] + "<br>" + dicionario[idx]['valor'] + "€" +"</td>";

        	if (idx%2 != 0) linha +="</tr>";
        	tabelaHtml+=linha; 
        }//for
    tabelaHtml+="</tbody></table>";
    return (tabelaHtml);
}

function sequenciaAleatoria(valorLimite){
	var limite = Math.floor(Math.random() * valorLimite);
	return limite;
}

function sequenciaContemImagem (seq, imagem){
	for (var idx=0; idx<seq.length; idx++){
		var e1 = seq[idx];
		if (e1 === imagem){ 
			return true;
		}
	}//for	
	return false;
}//sequenciaContemImagem

Raspadinhas.prototype.escreverSimbolosDeJogo = function(){		
    for (var idx=0; idx<3;){
        var imagem = gerarImagensAleatorias();     
		var jaExiste =  sequenciaContemImagem (seq, imagem);
		if (!jaExiste){
			seq[idx]=imagem;
			idx++;
		}//if

    }//for
	this.zonaSimbolos1.innerHTML = seq.join(' ');
	this.zonaSimbolos3.innerHTML = seq.join(' ');
	this.zonaSimbolos5.innerHTML = seq.join(' ');
	this.zonaSimbolos10.innerHTML = seq.join(' ');
}//escreverSimbolosDeJogo

Raspadinhas.prototype.escreverSeusSimbolo = function(){
	var tabela = "";
	switch(this.estado){
		case Raspadinhas.ESTADO.JOGANDO1:
			tabela += escreverTabelas(2,20);
			this.zonaSeusSimbolos1.innerHTML = tabela;
			break;
		case Raspadinhas.ESTADO.JOGANDO3:
			tabela += escreverTabelas(5,50);
	 		this.zonaSeusSimbolos3.innerHTML = tabela;
	 		break;
	 	case Raspadinhas.ESTADO.JOGANDO5:
	 		tabela += escreverTabelas(6,100);
			this.zonaSeusSimbolos5.innerHTML = tabela;
			break;
		case Raspadinhas.ESTADO.JOGANDO10:
			tabela += escreverTabelas(8, 200);
			this.zonaSeusSimbolos10.innerHTML = tabela;
			break;
	}
}//escreverSimbolosJogador

Raspadinhas.prototype.render = function(){
	switch(this.estado){
		case Raspadinhas.ESTADO.CONFIGURACAO:
		visibilidade(this.zonaConfiguracao, true);
		visibilidade(this.zonaRaspa1, false);
		visibilidade(this.zonaRaspa3, false);
		visibilidade(this.zonaRaspa5, false);
		visibilidade(this.zonaRaspa10, false);
		visibilidade(this.zonaJogar1, false);
		visibilidade(this.zonaJogar3, false);
		visibilidade(this.zonaJogar5, false);
		visibilidade(this.zonaJogar10, false);

		break;	
		
		case Raspadinhas.ESTADO.JOGAR1:
		visibilidade(this.zonaConfiguracao, false);
		visibilidade(this.zonaRaspa1, true);
		visibilidade(this.zonaRaspa3, false);
		visibilidade(this.zonaRaspa5, false);
		visibilidade(this.zonaRaspa10, false);
		visibilidade(this.zonaJogar1, false);
		visibilidade(this.zonaJogar3, false);
		visibilidade(this.zonaJogar5, false);
		visibilidade(this.zonaJogar10, false);
		break;

		case Raspadinhas.ESTADO.JOGAR3:
		visibilidade(this.zonaConfiguracao, false);
		visibilidade(this.zonaRaspa1, false);
		visibilidade(this.zonaRaspa3, true);
		visibilidade(this.zonaRaspa5, false);
		visibilidade(this.zonaRaspa10, false);
		visibilidade(this.zonaJogar1, false);
		visibilidade(this.zonaJogar3, false);
		visibilidade(this.zonaJogar5, false);
		visibilidade(this.zonaJogar10, false);
		break;
		
		case Raspadinhas.ESTADO.JOGAR5:
		visibilidade(this.zonaConfiguracao, false);
		visibilidade(this.zonaRaspa1, false);
		visibilidade(this.zonaRaspa3, false);
		visibilidade(this.zonaRaspa5, true);
		visibilidade(this.zonaRaspa10, false);
		visibilidade(this.zonaJogar1, false);
		visibilidade(this.zonaJogar3, false);
		visibilidade(this.zonaJogar5, false);
		visibilidade(this.zonaJogar10, false);
		break;
		
		case Raspadinhas.ESTADO.JOGAR10:
		visibilidade(this.zonaConfiguracao, false);
		visibilidade(this.zonaRaspa1, false);
		visibilidade(this.zonaRaspa3, false);
		visibilidade(this.zonaRaspa5, false);
		visibilidade(this.zonaRaspa10, true);
		visibilidade(this.zonaJogar1, false);
		visibilidade(this.zonaJogar3, false);
		visibilidade(this.zonaJogar5, false);
		visibilidade(this.zonaJogar10, false);
		break;

		case Raspadinhas.ESTADO.JOGANDO1:
		visibilidade(this.zonaConfiguracao, false);
		visibilidade(this.zonaRaspa1, false);
		visibilidade(this.zonaRaspa3, false);
		visibilidade(this.zonaRaspa5, false);
		visibilidade(this.zonaRaspa10, false);
		visibilidade(this.zonaJogar1, true);
		visibilidade(this.zonaJogar3, false);
		visibilidade(this.zonaJogar5, false);
		visibilidade(this.zonaJogar10, false);
		break;	

		case Raspadinhas.ESTADO.JOGANDO3:
		visibilidade(this.zonaConfiguracao, false);
		visibilidade(this.zonaRaspa1, false);
		visibilidade(this.zonaRaspa3, false);
		visibilidade(this.zonaRaspa5, false);
		visibilidade(this.zonaRaspa10, false);
		visibilidade(this.zonaJogar1, false);
		visibilidade(this.zonaJogar3, true);
		visibilidade(this.zonaJogar5, false);
		visibilidade(this.zonaJogar10, false);
		break;

		case Raspadinhas.ESTADO.JOGANDO5:
		visibilidade(this.zonaConfiguracao, false);
		visibilidade(this.zonaRaspa1, false);
		visibilidade(this.zonaRaspa3, false);
		visibilidade(this.zonaRaspa5, false);
		visibilidade(this.zonaRaspa10, false);
		visibilidade(this.zonaJogar1, false);
		visibilidade(this.zonaJogar3, false);
		visibilidade(this.zonaJogar5, true);
		visibilidade(this.zonaJogar10, false);
		break;

		case Raspadinhas.ESTADO.JOGANDO10:
		visibilidade(this.zonaConfiguracao, false);
		visibilidade(this.zonaRaspa1, false);
		visibilidade(this.zonaRaspa3, false);
		visibilidade(this.zonaRaspa5, false);
		visibilidade(this.zonaRaspa10, false);
		visibilidade(this.zonaJogar1, false);
		visibilidade(this.zonaJogar3, false);
		visibilidade(this.zonaJogar5, false);
		visibilidade(this.zonaJogar10, true);
		break;
	}
}//render

Raspadinhas.prototype.receberPremios = function(){
	valorAGanhar = 0;
	for (var i = 0; i < dicionario.length; i++) {
		for (var j = 0; j < seq.length; j++) {
			if(dicionario[i]['imagem'] == seq[j])
				valorAGanhar += dicionario[i]['valor'];
		}
	}
		this.zonaResultado1.innerHTML = valorAGanhar + " €";
		this.zonaResultado3.innerHTML = valorAGanhar + " €";
		this.zonaResultado5.innerHTML = valorAGanhar + " €";
		this.zonaResultado10.innerHTML = valorAGanhar + " €";

}//receberPremios

Raspadinhas.ESTADO = {CONFIGURACAO:0, JOGAR1:1, JOGAR3:2, JOGAR5:3, JOGAR10:4, JOGANDO1:5, JOGANDO3:6, JOGANDO5:7, JOGANDO10:8};