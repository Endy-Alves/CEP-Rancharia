const url = './newCEP.json';

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
    main.innerHTML = ''; // Limpa o conteúdo atual dentro de main
    const Bairros = data.Rancharia;
    const chaves = Object.keys(Bairros);

    // Função para renderizar os logradouros na página
    function renderizarLogradouros(logradouros) {
      main.innerHTML = ''; // Limpa o conteúdo atual dentro de main
      
      // Itera sobre os logradouros e renderiza na página
      logradouros.forEach(logradouro => {
        const divLogradouro = document.createElement('div');
        divLogradouro.classList.add('logradouro');

        // Cria elementos para nome do bairro, logradouro e cep
        const nomeBairro = document.createElement('div');
        nomeBairro.textContent = `Bairro: ${logradouro.bairro} /`;
        divLogradouro.appendChild(nomeBairro);

        const nomeLogradouro = document.createElement('div');
        nomeLogradouro.textContent = `Logradouro: ${logradouro.logradouro} /`;
        divLogradouro.appendChild(nomeLogradouro);

        const cepLogradouro = document.createElement('div');
        cepLogradouro.textContent = `CEP: ${logradouro.cep}`;
        divLogradouro.appendChild(cepLogradouro);

        main.appendChild(divLogradouro);
      });
    }

    // Evento de input para a pesquisa
    inputPesquisa.addEventListener('input', () => {
      const termoPesquisa = inputPesquisa.value.trim().toLowerCase();

      // Filtra os logradouros com base no termo de pesquisa
      const logradourosFiltrados = [];

      Object.keys(data.Rancharia).forEach(localidade => {
        data.Rancharia[localidade].forEach(logradouro => {
          if (logradouro.logradouro.toLowerCase().includes(termoPesquisa)) {
            logradourosFiltrados.push({
              bairro: localidade,
              logradouro: logradouro.logradouro,
              cep: logradouro.cep
            });
          } else if (logradouro.bairros) {
            const bairrosFiltrados = logradouro.bairros.filter(bairro =>
              bairro.bairro.toLowerCase().includes(termoPesquisa)
            );
            if (bairrosFiltrados.length > 0) {
              bairrosFiltrados.forEach(bairro => {
                logradourosFiltrados.push({
                  bairro: bairro.bairro,
                  logradouro: logradouro.logradouro,
                  cep: logradouro.cep
                });
              });
            }
          }
        });
      });

      // Renderiza os logradouros filtrados
      renderizarLogradouros(logradourosFiltrados);
    });

    // Renderiza todos os logradouros inicialmente
    const todosLogradouros = [];
    Object.keys(data.Rancharia).forEach(localidade => {
      data.Rancharia[localidade].forEach(logradouro => {
        todosLogradouros.push({
          bairro: localidade,
          logradouro: logradouro.logradouro,
          cep: logradouro.cep
        });
      });
    });
    renderizarLogradouros(todosLogradouros);

  })
  .catch(error => {
    console.error('Erro durante a requisição', error);
  });
