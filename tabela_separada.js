//Captura de dados
const nome = document.querySelector('#nome-var')
const nome2 = document.querySelector('#nome-var2')
const dados = document.getElementById("dados")
const resultado = document.getElementById("button")
const tabela = document.getElementById("tabelasvariaveis")
const tipo_variavel = document.getElementById("tipo de variavel")
const ordem = document.getElementById("ordem_dados")
let vetor_final2 = []
let total = 0
let tira_espaco = /\s*;\s*/; // Tira os espaços entre os ";"
let vetor_continuo = []

function botaoClique() {
    // CRIANDO O VETOR            
    let dados_valores = dados.value
    let vetor1 = dados_valores.split(tira_espaco) // Tira os espaços entre os ";"         
    let vetor_final = vetor1.filter(x => x.trim()) // Remove itens vazios do vetor
    // Coloca em ordem
    let conta_numero = 0
    let conta_string = 0
    let organizar_string = []
    let organizar_numero = []
    for (conteudo of vetor_final) {
        let descubra = parseFloat(conteudo)

        if (isNaN(descubra)) {
            conta_string++
            organizar_string.push(conteudo)
        } else {
            conta_numero++
            organizar_numero.push(conteudo)
        }

    }

    if (conta_string == 0) {
        vetor_final.sort(function (a, b) {
            return a - b;
        });
        vetor_final
    } else if (conta_string > 0 && conta_numero > 0) {
        organizar_numero.sort(function (a, b) {
            return a - b;
        });
        organizar_numero
        organizar_string.sort()
        let aux = vetor_final.length
        vetor_final.splice(0, aux)
        for (dado of organizar_string) {
            vetor_final.push(dado)
        }
        for (dado of organizar_numero) {
            vetor_final.push(dado)
        }
    } else {
        vetor_final.sort()
    }
    // valida dados
    // estes lets ajudam na validação 
    let podeseguir = true
    let ordem_dados = ordem.value
    let vetor_organizador = ordem_dados.split(tira_espaco) // Tira os espaços entre os ";"         
    let vetor_ordem = vetor_organizador.filter(x => x.trim()) // Remove itens vazios do vetor
    let vetor_aux = []

    if (nome.value.trim() == '') {
        alert('O nome da variavel deve ser preenchido.')
        nome.focus() // Coloca o cursor no elemento especificado
        podeseguir = false
    } else if (conta_numero == 0 && conta_string == 0) {
        alert('insira os dados')
        dados.focus() // Coloca o cursor no elemento especificado
        podeseguir = false
    } else if (tipo_variavel.selectedIndex == 0) {
        alert('Escolha o tipo de dado')
        tipo_variavel.focus() // Coloca o cursor no elemento especificado
        podeseguir = false

    } else if (tipo_variavel.selectedIndex == 2 && vetor_ordem[0] === undefined) {
        alert('insira a ordem desejada')
        ordem.focus() // Coloca o cursor no elemento especificado
        podeseguir = false
    } else if ((tipo_variavel.selectedIndex == 3 || tipo_variavel.selectedIndex == 4) && conta_string > 0) {
        alert('Dados ou seleção do tipo de dados errados')
        dados.focus() // Coloca o cursor no elemento especificado
        podeseguir = false
    } else if (vetor_ordem[0] != undefined && tipo_variavel.selectedIndex != 2) {
        alert("selecione o tipo de variavel correta ou apague a ordem")
        tipo_variavel.focus()
        podeseguir = false
    }

    // se não faltar dado o programa continua 
    if (podeseguir) {
       
        // nome2.innerHTML = nome.value
        // Contando as ocorrências de cada item no vetor 

        for (let i = 0; i < vetor_final.length; i++) {
            let valido = true

            if (vetor_final[i] == vetor_final[i - 1]) {
                valido = false
            }

            if (valido) {
                let indices = []
                let item = vetor_final[i]
                let idx = vetor_final.indexOf(item)
                while (idx != -1) {
                    indices.push(idx);
                    idx = vetor_final.indexOf(item, idx + 1);
                }

                total += parseInt(indices.length)

                inserir_obj(item, indices.length)
            }
        }

        // Quando é o caso de quantitativo continuo
        if (tipo_variavel.selectedIndex == 4) {
            //primeiro número da sequencia
            let inicio_classe = vetor_final2[0]['nome']
            //calcula a amplitude do dados 
            let aux = vetor_final2.length - 1
            let amplitude_total = vetor_final2[aux]['nome'] - vetor_final2[0]['nome']
            let k = (total) ** 1 / 2

            //possiveis numeros de linhas
            let nl1 = Math.floor(k)
            let nl2 = nl1 - 1
            let nl3 = nl1 + 1
            let x = true
            let aux3 = amplitude_total + 1
            let intervalo_de_classe
            let numero_de_linhas
            //testando possiveis número de linhas
            while (x == true) {
                if (aux3 % nl1 == 0) {
                    numero_de_linhas = nl1
                    x = false
                    intervalo_de_classe = aux3 / nl1
                } else if (aux3 % nl2 == 0) {
                    numero_de_linhas = nl2
                    x = false
                    intervalo_de_classe = aux3 / nl2
                } else if (aux3 % nl3 == 0) {
                    numero_de_linhas = nl3
                    x = false
                    intervalo_de_classe = aux3 / nl3
                } else {
                    aux3 += 1
                }
            }
            //organizando os dados dessa categoria 
            let ajuda = parseFloat(inicio_classe)
            let contador = 0
            let aux2 = 0
            let aux4 = numero_de_linhas - 1

            for (let i = 0; i < numero_de_linhas; i++) {
                let ajuda_antiga = ajuda
                ajuda += intervalo_de_classe,
                    contador = 0

                for (let q = 0; q < vetor_final2.length; q++) {
                    if (aux4 != i) {
                        if ((parseFloat(vetor_final2[q]['nome']) < ajuda)) {
                            contador = contador + vetor_final2[q]['valor']
                        } else if (vetor_final2[q]['nome'] >= ajuda && aux2 == 0) {
                            let string = `${vetor_final2[0]['nome']} |-------${ajuda}`
                            let continua = {
                                nome: string,
                                valor: contador,
                                'limete_inferior': ajuda_antiga,
                                'limite_superior': ajuda
                            }
                            aux2++
                            vetor_continuo.push(continua)
                            vetor_final2.splice(0, q)
                            break
                        } else if (vetor_final2[q]['nome'] >= ajuda && aux2 > 0) {
                            let string = `${ajuda_antiga}|--------- ${ajuda}`
                            let continua = {
                                nome: string,
                                valor: contador,
                                'limete_inferior': ajuda_antiga,
                                'limite_superior': ajuda
                            }
                            aux2++
                            vetor_continuo.push(continua)
                            vetor_final2.splice(0, q)
                            break
                        }
                    } else {

                        for (w = 0; w <= vetor_final2.length; w++)
                            if (w < vetor_final2.length) {
                                contador = contador + vetor_final2[w]['valor']
                            }
                        else {
                            let string = `${ajuda_antiga}|--------- ${ajuda}`
                            let continua = {
                                nome: string,
                                valor: contador,
                                'limete_inferior': ajuda_antiga,
                                'limite_superior': ajuda
                            }
                            vetor_continuo.push(continua)
                            vetor_final2.splice(0, w)
                            break
                        }
                    }
                }

            }
            vetor_final2 = vetor_continuo
            console.log(vetor_final2)
        }
        //calculando as frequencias chamando uma função a parte 
        for (let i = 0; i < vetor_final2.length; i++) {
            frequencias(i)
        }

        if (tipo_variavel.selectedIndex == 2) {
            function buscaSequencial(lista, valorBusca, fnComp) {
                for (let i = 0; i < lista.length; i++) {
                    //Encontrou o que está buscando: retorna a posição
                    //em que foi encontrado
                    if (fnComp(lista[i], valorBusca)) return i
                }
                return -1 // valorBusca não foi encontrado em lista
            }
            for (dado of vetor_ordem) {
                let a = buscaSequencial(vetor_final2, dado, (obj, valor) => obj['nome'] === valor)
                let help = vetor_final2[a]
                vetor_aux.push(help)
                vetor_final2.splice(a, 1)
            }
            vetor_final2 = vetor_aux


        }
        
        // cria o cabeçalho da tabela
        let linha_nomes = document.createElement('tr')
        tabela.appendChild(linha_nomes)
        //Nome da Variável
        let Nome_da_Variavel = document.createElement('td')
        Nome_da_Variavel.id = 'Nome_da_Variavel'
        Nome_da_Variavel.innerText = nome.value
        linha_nomes.appendChild(Nome_da_Variavel)
        //Frequência Simples (fi)
        let Frequencia_Simples = document.createElement('td')
        Frequencia_Simples.id = 'Frequencia_Simples'
        Frequencia_Simples.innerText = "Frequência Simples (fi)"
        linha_nomes.appendChild(Frequencia_Simples)
        //Frequencia Relativa(Fr%)
        let Frequencia_Relativa = document.createElement('td')
        Frequencia_Relativa.id = 'Frequencia_Relativa'
        Frequencia_Relativa.innerText = "Frequencia Relativa(Fr%)"
        linha_nomes.appendChild(Frequencia_Relativa)
        //Frequencia Acumulativa
        let Frequencia_Acumulativa = document.createElement('td')
        Frequencia_Acumulativa.id = 'Frequencia_Acumulativa'
        Frequencia_Acumulativa.innerText = "Frequencia Acumulativa"
        linha_nomes.appendChild(Frequencia_Acumulativa)
        //Frequencia Relativa Acumulativa(%)
         let Frequencia_Relativa_Acumulativa = document.createElement('td')
         Frequencia_Relativa_Acumulativa.id = 'Frequencia_Relativa_Acumulativa'
         Frequencia_Relativa_Acumulativa.innerText = "Frequencia Relativa Acumulativa(%)"
         linha_nomes.appendChild(Frequencia_Relativa_Acumulativa)



        for (let i = 0; i < vetor_final2.length; i++) {
            //CRIAR LINHA NA TABELA
            let linha = document.createElement('tr')
            tabela.appendChild(linha)
            //CRIAR CÉLULA COM O NOME DO PRIMEIRO ITEM
            let cel1 = document.createElement('td')
            cel1.id = 'celula1'
            cel1.innerText = vetor_final2[i]['nome']
            linha.appendChild(cel1)
            //CRIAR CÉLULA COM A QUANTIDADE ENCONTRADA
            let cel2 = document.createElement('td')
            cel2.id = 'celula2'
            cel2.innerText = vetor_final2[i]['valor']
            linha.appendChild(cel2)
            //CRIAR CÉLULA COM A Frequencia Relativa
            let cel3 = document.createElement('td')
            cel3.id = 'celula3'
            cel3.innerText = vetor_final2[i]['Frequencia relativa'].toFixed(2)
            linha.appendChild(cel3)
            //CRIAR CÉLULA COM A Frequencia Acumulativa
            let cel4 = document.createElement('td')
            cel4.id = 'celula4'
            cel4.innerText = vetor_final2[i]['Frequencia acumulada']
            linha.appendChild(cel4)
            //CRIAR CÉLULA COM A Frequencia relativa Acumulativa
            let cel5 = document.createElement('td')
            cel5.id = 'celula5'
            cel5.innerText = vetor_final2[i]['Frequencia relativa acumulada'].toFixed(2)
            linha.appendChild(cel5)
        }
        //total
        //CRIAR LINHA NA TABELA
        let linha = document.createElement('tr')
        tabela.appendChild(linha)
        //CRIAR CÉLULA COM O NOME DO PRIMEIRO ITEM
        let cel6 = document.createElement('td')
        cel6.id = 'total'
        cel6.innerText = 'total'
        linha.appendChild(cel6)
        let cel7 = document.createElement('td')
        cel7.id = 'total'
        cel7.innerText = total
        linha.appendChild(cel7)

        grafico(vetor_final2, tipo_variavel.selectedIndex,nome.value)
    }
    
   
}


resultado.addEventListener('click', botaoClique)

function inserir_obj(dado, quantidade) {
    let obj = {
        nome: dado,
        valor: quantidade
    }
    vetor_final2.push(obj)
}

function frequencias(i) {
    let aux = (i - 1)
    if (aux < 0) {
        let a = (vetor_final2[i].valor / total) * 100
        vetor_final2[i]['Frequencia relativa'] = a 
        let b = vetor_final2[i].valor
        vetor_final2[i]['Frequencia acumulada'] = b
        let c = vetor_final2[i]['Frequencia relativa']
        vetor_final2[i]['Frequencia relativa acumulada'] = c
    } else {
        let a = (vetor_final2[i].valor / total) * 100
        vetor_final2[i]['Frequencia relativa'] = a
        let b = (vetor_final2[i].valor) + (vetor_final2[aux]['Frequencia acumulada'])
        vetor_final2[i]['Frequencia acumulada'] = b;
        let c = (vetor_final2[i]['Frequencia relativa']) + (vetor_final2[aux]['Frequencia relativa acumulada'])
        vetor_final2[i]['Frequencia relativa acumulada'] = c
    }
}

function grafico (vetor_final2, tipo_variavel,titulo){
    let nome_dado = []
    let valor_dado = []
    let valor_porcentagem = []
    let cores_aleatorias = []
    let cores_aleatorias2 = []
    for(let i = 0; i < vetor_final2.length; i++){
        nome_dado.push(vetor_final2[i]['nome'])
        valor_dado.push(vetor_final2[i]['valor'])
        valor_porcentagem.push(vetor_final2[i]['Frequencia relativa'])
        let  r = Math.floor(Math.random()*255)
        let  g = Math.floor(Math.random()*255)
        let  b = Math.floor(Math.random()*255)
        let cor = `rgba(${r},${g},${b},0.25)`
        let cor2 = `rgba(${r},${g},${b},1)`
        cores_aleatorias.push(cor)
        cores_aleatorias2.push(cor2) 
        console.log(nome_dado)

    var ctx = document.getElementById('myChart');
if(tipo_variavel == 1 || tipo_variavel == 2){
    
    
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: nome_dado,
            datasets: [{
                label:valor_dado,
                data: valor_porcentagem,
                backgroundColor: cores_aleatorias,
                borderColor:cores_aleatorias2,
            }]
        },
        options: {
            title: {
                display: true,
                text: titulo
            }
        }
    });
}
else if(tipo_variavel == 3){
    
var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: nome_dado,
                datasets: [{
                    label:titulo ,
                    data: valor_porcentagem,
                    backgroundColor: cores_aleatorias,
                    borderColor:cores_aleatorias2,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });

}
}
}