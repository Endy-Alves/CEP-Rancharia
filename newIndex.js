const url = './cep.json';

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo JSON');
    }
    return response.json();
  })
  .then(data => {
    const main = document.getElementById('main');
const inputPesquisa = document.getElementById('pesquisa');

// Função para renderizar os logradouros na página
function renderizarLogradouros(logradouros) {
    main.innerHTML = ''; // Limpa o conteúdo atual dentro de main

    // Itera sobre os logradouros e renderiza na página
    logradouros.forEach(logradouro => {
        const divLogradouro = document.createElement('div');
        divLogradouro.classList.add('logradouro');

        // Cria elementos para nome do bairro, logradouro e cep
        const nomeBairro = document.createElement('div');
        nomeBairro.textContent = `Bairro: ${logradouro.bairro}`;
        divLogradouro.appendChild(nomeBairro);

        const nomeLogradouro = document.createElement('div');
        nomeLogradouro.textContent = `Logradouro: ${logradouro.rua}`;
        divLogradouro.appendChild(nomeLogradouro);

        const cepLogradouro = document.createElement('div');
        cepLogradouro.textContent = `CEP: ${logradouro.numero}`;
        divLogradouro.appendChild(cepLogradouro);

        main.appendChild(divLogradouro);
    });
}

// Evento de input para a pesquisa
inputPesquisa.addEventListener('input', () => {
    const termoPesquisa = inputPesquisa.value.trim().toLowerCase();

    // Filtra os logradouros com base no termo de pesquisa
    const logradourosFiltrados = data.filter(logradouro =>
        logradouro.rua.toLowerCase().includes(termoPesquisa) ||
        logradouro.bairro.toLowerCase().includes(termoPesquisa)
    );

    // Renderiza os logradouros filtrados
    renderizarLogradouros(logradourosFiltrados);
});

// Renderiza todos os logradouros inicialmente
renderizarLogradouros(data);
})
  .catch(error => {
    console.error('Erro durante a requisição', error);
  });
