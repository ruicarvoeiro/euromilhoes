var numeroQueAcertou = [];
var estrelaQueAcertou = [];
var seqQueAcertouJ = [];

var numSaidas = [];
var estSaidas = [];

var numerosAnteriores = [5,4,3,5,6,1,2,3,1,4,1,3,4,3,3,2,4,2,3,3,0,0,4,0,4,5,3,3,3,4,2,6,3,3,3,2,4,4,1,4,2,1,3,2,1,2,1,2,5,2];
var estrelasAnteriores = [8,13,4,4,5,8,12,9,11,8,11,12];

function Euro (pDescricao, pEscolhas, pApostas, pResultado, pGeral, pFeedBackApostaE, pRespostaEuro, pFeedBackJoker){
    this.numeros = [];
    this.estrelas = [];
    this.joker;

    this.aceitarJoker;

    this.estado = Euro.ESTADO.DESCRICAO;

    this.zonaFeedBackApostaE = pFeedBackApostaE;
    this.zonaRespostaEuro = pRespostaEuro;
    this.zonaFeedBackJoker = pFeedBackJoker;

    this.zonaDescricao = pDescricao;
    this.zonaEscolhas = pEscolhas;
    this.zonaApostas = pApostas;
    this.zonaResultado = pResultado;
    this.zonaGeral = pGeral;
}//Jogo

Euro.prototype.aposta = function(pNumeros,pEstrelas){
    this.numeros = pNumeros;
    this.estrelas = pEstrelas;
    var frase = "";
    frase += this.numeros;
    frase += " | ";
    frase += this.estrelas;

    this.zonaFeedBackApostaE.innerHTML = frase;
}//aposta

Euro.prototype.resposta = function(x) {
    if (x==true){

        if ((this.numeros).length == 5 && (this.estrelas).length == 2){
            var seqNumeros = gerarSequenciaNumeros();
            var seqEstrelas = gerarSequenciaEstrelas();
            var nAcertos = comparacaoNum (seqNumeros, this.numeros);
            var eAcertos = comparacaoEst (seqEstrelas, this.estrelas);
            if(this.aceitarJoker == true){
                var seqJoker = gerarSequenciaJoker();
                var jAcertos = comparacaoJoker(seqJoker, this.joker);
                var premioJoker = premioDoJoker (jAcertos);
            }
            var premioEuro = premioDoEuro (nAcertos, eAcertos); 
            
            var eu = "";
            eu = "<li> Chave do euromilhões sorteada: " + ordenar(seqNumeros) + " | " +  ordenar(seqEstrelas) + "</li>";
            if(this.aceitarJoker == true){
                eu += "<li> Joker sorteado : " + seqJoker +"</li>";
            }
            eu += "<li> <mark>Acertou "+ nAcertos +" numeros</mark>: " + numeroQueAcertou + "</li>";
            if (nAcertos>0){
                eu += "<li>Tendo saido (pela mesma ordem) nos ultimos 6 meses "+ compararNumSaidas() +" vezes.</li>";
            }
            eu += "<li> <mark>Acertou "+ eAcertos +" estrelas</mark>: " + estrelaQueAcertou + "</li>";
            if (eAcertos>0){
                eu += "<li>Tendo saido (pela mesma ordem) nos ultimos 6 meses "+ compararEstSaidas() +" vezes.</li>";
            }
            if (this.aceitarJoker == true){
                eu += "<li> <mark>Acertou "+ jAcertos +" numeros no joker</mark>: " + seqQueAcertouJ +"</li>";
            }
            eu += "<li> <mark>O valor ganho no euromilhões é "+ premioEuro +" euros</mark>. </li>";
            if (this.aceitarJoker == true){
                eu += "<li> <mark>O valor ganho no joker é "+ premioJoker +" euros</mark>. </li>";
                eu += "<li> <mark>No total o valor ganho foi "+ (premioEuro+premioJoker) + " euros</mark></li>";
            }
            
            eu +="<a href='Geral.html'><input type='button' value='Voltar à pagina inicial'></a>";

            this.zonaRespostaEuro.innerHTML = eu;
        }
   }
}//resposta

Euro.prototype.apagar = function (){
    this.numeros = [];
    this.estrelas = [];
    this.zonaFeedBackApostaE.innerHTML = "";
    
}//apagar

Euro.prototype.joker = function (aceitar){
    this.aceitarJoker = aceitar;

    if (this.aceitarJoker == true){
        this.joker = String(gerarSequenciaJoker());
        this.zonaFeedBackJoker.innerHTML = this.joker;
    } else {
        this.joker="";
        this.zonaFeedBackJoker.innerHTML = this.joker;
    }
    return this.joker;
}//joker

function comparacaoJoker(n, m){
    var soma = 0;
    if(m!=""){
        if (n.substring(6)===m.substring(6)){
            seqQueAcertouJ = Number(n.substring(6));
            soma += 1;
            if (n.substring(5)===m.substring(5)){
                seqQueAcertouJ = Number(n.substring(5));
                soma += 1;
                if (n.substring(4)===m.substring(4)){
                    seqQueAcertouJ = Number(n.substring(4));
                    soma += 1;
                    if (n.substring(3)===m.substring(3)){
                        seqQueAcertouJ = Number(n.substring(3));
                        soma += 1;
                        if (n.substring(2)===m.substring(2)){
                            seqQueAcertouJ = Number(n.substring(2));
                            soma += 1;
                            if (n.substring(1)===m.substring(1)){
                                seqQueAcertouJ = Number(n.substring(1));
                                soma += 1;
                                if (n.substring(0)===m.substring(0)){
                                    seqQueAcertouJ = Number(n.substring(1));
                                    soma += 1;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return soma;
}//comparacaoJoker

function gerarSequenciaJoker(){
    var sequencia;
    for (var idx=0; idx<7;idx++){
        var x = inteiroAleatorio(0,9);
        if (idx==0){
            sequencia = String(x);
        } else {
            sequencia += String(x);
        }
    }
    return sequencia;
}//gerarSequenciaJoker

function compararNumSaidas () {
    for (var idx=0; idx<numeroQueAcertou.length;idx++){
        var num = numeroQueAcertou[idx]-1;
        var num1 = numerosAnteriores[num];
        numSaidas[idx] = num1;
    }
    return numSaidas;
}//compararNumSaidas

function compararEstSaidas () {
    for (var idx=0; idx<estrelaQueAcertou.length;idx++){
        var num = estrelaQueAcertou[idx]-1;
        var num1 = estrelasAnteriores[num];
        estSaidas[idx] = num1;
    }
    return estSaidas;
}//compararEstSaidas

function premioDoJoker (x){
    if (x==1){
        return 20;
    } else if (x==2){
        return 400;
    } else if (x==3){
        return 1000;
    } else if (x==4){
        return 11000;      
    } else if (x==5){
        return 60000;
    } else if (x==6){
        return 200000;
    } else if (x==7){
        return 1000000;
    } else {
        return 0;
    }
}//premioDoJoker

function premioDoEuro (n, e){
    var x;
    if (n==2 && e==0){
        x = 25;
    } else if (n==2 && e==1){
        x = 50;
    } else if (n==1 && e==2){
        x = 100;
    } else if (n==3 && e==0){
        x = 250;
    } else if (n==3 && e==1){
        x = 500;
    } else if (n==2 && e==2){
        x = 1000;
    } else if (n==3 && e==2){
        x = 5000;
    } else if (n==4 && e==0){
        x = 10000;
    } else if (n==4 && e==1){
        x = 25000;
    } else if (n==4 && e==2){
        x = 75000;
    } else if (n==5 && e==0){
        x = 150000;
    } else if (n==5 && e==1){
        x = 300000;
    } else if (n==5 && e==2){
        x = 15000000;
    } else {
        x = 0;
    }
    return x;
}

function comparacaoNum (seq1, seq2){
    var somaN = 0;
    for (var idx=0; idx<seq1.length; idx++){
        for (var id=0; id<seq2.length; id++){
            var el1 = seq1[idx];
            var el2 = seq2[id];
            if (el1 === el2){
                numeroQueAcertou.push(el1);
                somaN += 1;
            }
        }
    }
    return somaN;
}//comparacaoNum

function comparacaoEst (seq1, seq2){
    var somaE = 0;
    for (var idx=0; idx<seq1.length; idx++){
        for (var id=0; id<seq2.length; id++){
            var el1 = seq1[idx];
            var el2 = seq2[id];
            if (el1 === el2){
                estrelaQueAcertou.push(el1);
                somaE += 1;
            }
        }
    }
    return somaE;
}//comparacaoEst

function sequenciaContemNum (seq, num){
    for (var idx=0; idx<seq.length; idx++){
        var el = seq[idx];
        if (el === num) return true;
    }
    return false;
}//sequenciaContemNum

function gerarSequenciaNumeros (){
    var seq = [];
    for (var idx=0; idx<5; ){
        var num = inteiroAleatorio(1, 50); 
        if (seq==undefined){
            seq = num;
        } else {
            var jaExiste = sequenciaContemNum (seq, num);
            if (!jaExiste){
                seq[idx]=num;
                idx++;    
            }
        }
    }
    return seq;
}

function gerarSequenciaEstrelas (){
    var seq = [];
    for (var idx=0; idx<2; ){
        var num = inteiroAleatorio(1, 11);
        if (seq==undefined){
            seq = num;
        } else {
            var jaExiste = sequenciaContemNum (seq, num);
            if (!jaExiste){
                seq[idx]=num;
                idx++;    
            }
        }    
    }
    return seq;
}

function inteiroAleatorio(a, b){
    var amplitude = b-a+1;
    var salto = Math.random()*amplitude;
    return a+Math.floor(salto);
}//inteiroAleatorio

function ordenar (seq){
    var ordena = false;
    var troca = false;
    var x1, x2;

    while (!ordena){
        for (var idx=0, troca=false; idx<seq.length-1; idx++){
            x1 = seq[idx];
            x2 = seq[idx+1];
            if (x1>x2){
                seq[idx] = x2;
                seq[idx+1] = x1;
                troca = true;
            }
        }
        ordena = !troca;
    }
    return seq;
}//ordenar

function estaVisivel (zona,visivel){
    if(visivel){
        zona.style.display="block";
    } else {
        zona.style.display="none";
    }
}//estaVisivel

Euro.prototype.render = function (){
    switch (this.estado){
        case Euro.ESTADO.DESCRICAO:
            estaVisivel(this.zonaDescricao,true);
            estaVisivel(this.zonaEscolhas,false);
            estaVisivel(this.zonaApostas,false);
            estaVisivel(this.zonaResultado,false);
            estaVisivel(this.zonaGeral,true);
            break;

        case Euro.ESTADO.APOSTA:
            estaVisivel(this.zonaDescricao,false);
            estaVisivel(this.zonaEscolhas,true);
            estaVisivel(this.zonaApostas,true);
            estaVisivel(this.zonaResultado,false);
            estaVisivel(this.zonaGeral,true);
            break;

        case Euro.ESTADO.RESULTADO:
            estaVisivel(this.zonaDescricao,false);
            estaVisivel(this.zonaEscolhas,false);
            estaVisivel(this.zonaApostas,true);
            estaVisivel(this.zonaResultado,true);
            estaVisivel(this.zonaGeral,true);
            break;
    }
}

Euro.ESTADO = {DESCRICAO:0, APOSTA:1, RESULTADO:2};