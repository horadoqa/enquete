document.getElementById('poll-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const selectedFramework = document.querySelector('input[name="framework"]:checked').value;
    
    const response = await fetch('http://localhost:3000/enquete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ framework: selectedFramework }),
    });

    if (response.ok) {
      document.querySelector('.thank-you-message').classList.replace('hidden', 'visible');

      // Limpar os campos de entrada após o envio
      document.getElementById('poll-form').reset();

      fetchResults();
    
    } else {
      alert('Ocorreu um erro. Tente novamente!');
    }

    document.getElementById('loading').style.display = 'none';
});

async function fetchResults() {
    const response = await fetch('http://localhost:3000/resultados');
    const results = await response.json();
    
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = '';

    let totalVotes = 0; // Variável para contar o total de votos

    // Gerar a lista de resultados e somar o total de votos
    results.forEach(result => {
      const listItem = document.createElement('li');
      listItem.textContent = `${result.framework}: ${result.votos} votos`;
      resultsList.appendChild(listItem);
      
      totalVotes += result.votos;  // Adicionar os votos de cada framework ao total
    });

    // Exibir o total de votos
    const totalVotesElement = document.createElement('li');
    totalVotesElement.textContent = `Total de votos: ${totalVotes}`;
    resultsList.appendChild(totalVotesElement);
}

// Carregar resultados quando a página for carregada
fetchResults();
