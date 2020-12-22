let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

// controle de ambiente

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="numero piscar"></div>';
        } else {
            numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];

    //    Verificando os Candidatos
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
    // Montando o Layout da tela 
    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display ='block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}`;


        let fotosHtml = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="d-1-image small"><img src="img/${candidato.fotos[i].url}" alt="Foto do Candidato"/> ${candidato.fotos[i].legenda}</div>`;
            } else{
                fotosHtml += `<div class="d-1-image"><img src="img/${candidato.fotos[i].url}" alt="Foto do Candidato"/> ${candidato.fotos[i].legenda}</div>`;
            }
        }

        lateral.innerHTML = fotosHtml;


    } else{
        seuVotoPara.style.display ='block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso-grande piscar">VOTO NULO</div>';
    }

}

function clicou(n) {
    let elNumero = document.querySelector('.numero.piscar');
    if (elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        // Remover o Piscar
        elNumero.classList.remove('piscar');
        // Adiciona o Piscar e pula para o próximo elemento
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('piscar');
        } else {
            atualizaInterface();
        }
    }
}

function branco() {
        numero = '';
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        lateral.innerHTML = '';
        descricao.innerHTML ='<div class="aviso-grande piscar">VOTO EM BRANCO</div>';
    
}

function corrige() {
   comecarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if(votoBranco ===true){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto:'branco'
        });
    } else if(numero.length === etapa.numeros){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if (votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !==undefined){
            comecarEtapa();
        } else{
            document.querySelector('.tela').innerHTML ='<div class="aviso-fim ">FIM</div>';
            console.log(votos);
        }
    }
}

comecarEtapa();