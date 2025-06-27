document.addEventListener('DOMContentLoaded', function () {
    const quantityInput = document.getElementById('quantity');
    const generateBtn = document.getElementById('generateBtn');
    const resultsDiv = document.getElementById('results');
    

    generateBtn.addEventListener('click', generateAndAnalyze);
    quantityInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            generateAndAnalyze();
        }
    });

    function generateAndAnalyze() {
        const quantity = parseInt(quantityInput.value);
        if (!validateInput(quantity)) return;

        const numbers = generateNumbers(quantity);
        const stats = calculateStatistics(numbers);
        displayResults(numbers, stats);
    }
    
    function validateInput(quantity) {
        if (isNaN(quantity) || quantity <= 0) {
            showError('Por favor, insira um número acima de 0');
            return false;
        }
        return true;
    }    

    function generateNumbers(quantity) {
        return Array.from({ length: quantity }, () => Math.floor(Math.random() * 100) + 1);
    }

    function calculateStatistics(numbers) {
        const sum = numbers.reduce((acc, num) => acc + num, 0);
        const average = (sum / numbers.length).toFixed(2);
        const maxNumber = Math.max(...numbers);
        const minNumber = Math.min(...numbers);
        const parityCount = numbers.reduce((acc, num) => {
            num % 2 === 0 ? acc.even++ : acc.odd++;
            return acc;
        }, { even: 0, odd: 0 });

        return { average, maxNumber, minNumber, ...parityCount };
    }

    function displayResults(numbers, stats) {
        resultsDiv.innerHTML = `
            <h2>Resultados</h2>
            <div class="numbers-grid">
                ${numbers.map(num => `<div class="number-item">${num}</div>`).join('')}
            </div>
            <div class="stats">
                <div class="stat-item"><span>Média:</span><span>${stats.average}</span></div>
                <div class="stat-item"><span>Maior Número:</span><span>${stats.maxNumber}</span></div>
                <div class="stat-item"><span>Menor Número:</span><span>${stats.minNumber}</span></div>
                <div class="stat-item"><span>Pares:</span><span>${stats.even}</span></div>
                <div class="stat-item"><span>Ímpares:</span><span>${stats.odd}</span></div>
            </div>
        `;
    }

    function showError(message) {
        resultsDiv.innerHTML = `<p class="error">${message}</p>`;
    }
});
