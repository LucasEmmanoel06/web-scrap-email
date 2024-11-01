const fetch = require('node-fetch'); // Para buscar dados da URL
const cheerio = require('cheerio'); // Para manipular e buscar dados no HTML

var url = 'https://www.apac.pe.gov.br/avisos'; // URL da página da lista de avisos

async function fetchData() {
    try {
        // Faz a requisição da página
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        // Vai até a div que contém a lista de avisos
        const ultimoAviso = $('#content > div > div:nth-child(2) > div > div > div:nth-child(1) > div.post-header.mobile-four.ten.columns > h2').first(); // Nota irrelevante: Quase troquei de site por causa dessa organização de classes. Um orangutango digitando aleatoriamente conseguiria fazer melhor.
        const DadosColetados = [];

        // Coleta o url para a pagina do aviso mais recente
        const urlAviso = ultimoAviso.find('a').attr('href').trim();
        
        if (urlAviso) {
            DadosColetados.push({
                urlAviso,
            });
        }

        // Exibe os dados no console
        console.log('Dados coletados:', DadosColetados);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

fetchData();
