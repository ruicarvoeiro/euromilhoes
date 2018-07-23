window.onload = boot;
    
var oBtnEuroN, oBtnEuroE, oBtnDescricao, oBtnConfirmarAposta, oBtnApagar;

var oValores, oDescricao, oEscolhas, oApostas, oResultado, oGeral, oFeedBackApostaE, oRespostaEuro;

var euromilhoes;

var apostaNum, apostaEs, joker;

var oCheckJoker, oFeedBackJoker;

function boot() {
    oValores = document.getElementById("idValores");
    oDescricao = document.getElementById("idDescricao");
    oEscolhas = document.getElementById("idEscolhas");
    oApostas = document.getElementById("idApostas");
    oResultado = document.getElementById("idResultado");
    oGeral = document.getElementById("idGeral");
    oFeedBackApostaE = document.getElementById("idFeedBackApostaE");
    oRespostaEuro = document.getElementById("idRespostaEuro");

    oBtnConfirmarAposta = document.getElementById("idBtnConfirmarAposta");
    oBtnDescricao = document.getElementById("idBtnDescricao");
    oBtnApagar = document.getElementById("idBtnApagar");

    oCheckJoker = document.getElementById("idCheckJoker");
    oFeedBackJoker = document.getElementById("idFeedBackJoker");
    
    for(var i = 1; i < 51; i++){
        oBtnEuroN = eval(document.getElementById("idEn" + i));
        oBtnEuroN.onclick = oJogoEuro;
    }

    for(var i = 1; i < 12; i++){
        oBtnEuroE = eval(document.getElementById("idEe" + i));
        oBtnEuroE.onclick = oJogoEuro;
    } 

    apostaNum=[];
    apostaEs=[];

    oBtnApagar.onclick = apagar;
    oBtnDescricao.onclick = apostas;
    oBtnConfirmarAposta.onclick = resposta;

    oCheckJoker.onclick = jokerAceite;

    euromilhoes = new Euro(oDescricao, oEscolhas, oApostas, oResultado, oGeral, oFeedBackApostaE, oRespostaEuro, oFeedBackJoker);

    euromilhoes.render();

}//boot

function apostas (){
    euromilhoes.estado = Euro.ESTADO.APOSTA;
    euromilhoes.render();
} //apostas

function oJogoEuro (e) {
    var evento = e? e : window.event;
    var onde = evento.target ? evento.target : evento.srcElement;
    var id = onde.id;

    if (id.substring(0,4) == "idEn" && apostaNum.length<5){
        apostaNum.push(Number(onde.value));
        onde.disabled = true; 
    }

    if (id.substring(0,4) == "idEe" && apostaEs.length<2){
        apostaEs.push(Number(onde.value));
        onde.disabled = true;
    }

    euromilhoes.aposta(apostaNum,apostaEs);
   
    if (apostaNum.length==5 && apostaEs.length==2){
        oBtnConfirmarAposta.disabled = false;
    } else {
        oBtnConfirmarAposta.disabled = true;
    }
}//oJogoEuro

function resposta (){
    euromilhoes.estado = Euro.ESTADO.RESULTADO;
    euromilhoes.resposta(true);
    oBtnConfirmarAposta.disabled = true;
    oBtnApagar.disabled = true;
    oCheckJoker.disabled = true;
    euromilhoes.render();
}//resposta

function apagar (){ 
    euromilhoes.apagar();
    for (var idx=0; idx<apostaNum.length; idx++){
        eval("idEn"+apostaNum[idx]).disabled = false;
    }
    for (var idx=0; idx<apostaEs.length; idx++){
        eval("idEe"+apostaEs[idx]).disabled = false;
    }

    apostaNum=[];
    apostaEs=[]; 
}//apagar

function jokerAceite () {
    var jokerSim = oCheckJoker.checked? true : false;
    joker = euromilhoes.joker(jokerSim); 
}//jokerChecked
