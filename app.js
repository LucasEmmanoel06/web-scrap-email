const fetch = require('node-fetch'); // Para buscar dados da URL
const cheerio = require('cheerio'); // Para manipular e buscar dados no HTML

var url = 'https://www.apac.pe.gov.br/avisos'; // URL da página da lista de avisos

async function fetchData() {
    try {
            // Faz a requisição da página de lista de avisos
            var response = await fetch(url);
            var html = await response.text();
            var $ = cheerio.load(html);

            // Vai até a tag que contém o aviso mais recente
            const elementoAviso = $('#content > div > div:nth-child(2) > div > div > div:nth-child(1) > div.post-header.mobile-four.ten.columns > h2').first();
            const DadosColetados = [];

            // Coleta o url para a pagina do aviso mais recente
            const urlAvisoIncompleto = elementoAviso.find('a').attr('href').trim();
            const urlAviso = 'https://www.apac.pe.gov.br' + urlAvisoIncompleto;
            
            // Faz a requisição da página do aviso mais recente
            var response = await fetch(urlAviso);
            var html = await response.text();
            var $ = cheerio.load(html);

            // Vai até a tag que contém detalhes do aviso
            const elementoDetalhes = $('#content > div > div > div.row > div.mobile-four.eight.columns > div');

            // Coleta os detalhes do aviso
            const detalhesAviso = elementoDetalhes.find('h4').html().trim().split('<br>');

            // Define as constantes para Regioes, Tipo e Publicado, e remove os textos desnecessários
            const Regioes = detalhesAviso[0].replace('Regiões: ', '').trim();
            const Tipo = detalhesAviso[1].replace('Tipo: ', '').trim();
            const Publicado = detalhesAviso[2].replace('Publicado: ', '').trim();

            // Vai até a tag que contém a validade do aviso
            const elementoValidade = $('#content > div > div > div.row > div.three.push-one.columns > div > div > div > p');

            // Coleta a validade do aviso
            const Validade = elementoValidade.text().replace('Validade: ', '').trim();
        
        // Adiciona os dados coletados ao array de dados coletados
        if (urlAviso && Regioes && Tipo && Publicado && Validade) {
            DadosColetados.push({
                urlAvisoCompleto: urlAviso,
                Regioes,
                Tipo,
                Publicado,
                Validade,
            });
        }

        // Exibe os dados no console
        console.log('\n Dados Coletados \n', DadosColetados);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

fetchData();
