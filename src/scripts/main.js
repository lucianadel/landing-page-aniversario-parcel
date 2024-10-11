// Obtenha referências aos elementos do DOM
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const presentSelection = document.querySelector('.present-selection');
const confirmPresentButton = document.getElementById('confirmPresentButton');
const selectedPresentsMessage = document.getElementById('selected-presents-message');
const presentCheckboxes = document.querySelectorAll('input[type="checkbox"]');
const yourNameInput = document.getElementById('yourName'); // Referência ao campo de nome

// Função para atualizar o cronômetro de contagem regressiva
function updateCountdown() {
    const dataAtual = new Date();
    const dataDoAniversaio = new Date('2025-05-16T00:00:00');

    const totalEmSegundos = (dataDoAniversaio - dataAtual) / 1000;

    const dias = Math.floor(totalEmSegundos / 3600 / 24);
    const horas = Math.floor((totalEmSegundos / 3600) % 24);
    const minutos = Math.floor((totalEmSegundos / 60) % 60);
    const segundos = Math.floor(totalEmSegundos % 60);

    daysElement.innerText = dias;
    hoursElement.innerText = horas;
    minutesElement.innerText = minutos;
    secondsElement.innerText = segundos;
}

// Função para lidar com a alteração dos checkboxes
function handleCheckboxChange() {
    // ... (código para verificar se algum presente foi selecionado)
    const algumPresenteSelecionado = Array.from(presentCheckboxes).some(checkbox => checkbox.checked);

    if (algumPresenteSelecionado) {
        selectedPresentsMessage.textContent = "Você selecionou um presente. Obrigada!";
        presentSelection.classList.remove('hidden');
    } else {
        selectedPresentsMessage.textContent = "Por favor, selecione um presente.";
        presentSelection.classList.add('hidden');
    }

    confirmPresentButton.disabled = !algumPresenteSelecionado;
}


// Função para limpar o formulário e os checkboxes
function clearForm() {
    // Limpar a seleção dos checkboxes
    for (const checkbox of presentCheckboxes) {
        checkbox.checked = false;
    }

    // Redefinir a mensagem de confirmação
    selectedPresentsMessage.textContent = "Você não selecionou nenhum presente.";
    presentSelection.classList.add('hidden');

    // Limpar o campo de nome
    yourNameInput.value = '';
}
// Função para obter os presentes selecionados
function getSelecionadosPresents() {
    const presentesSelecionados = [];
    presentCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            presentesSelecionados.push(checkbox.nextElementSibling.textContent);
        }
    });
    return presentesSelecionados;
}

// Adicione um ouvinte de evento para todos os checkboxes
for (const checkbox of presentCheckboxes) {
    checkbox.addEventListener('change', handleCheckboxChange);
}

// Manipulador de clique no botão de confirmação
confirmPresentButton.addEventListener('click', function () {
    const name = yourNameInput.value;
    if (name) {
        const presentes = getSelecionadosPresents();
        const mensagemConfirmacao = `Obrigada pela confirmação, ${name}! Você escolheu os seguintes presentes: ${presentes.join(', ')}.`;
        alert(mensagemConfirmacao);
        clearForm();
    } else {
        alert('Por favor, preencha seu nome.');
    }
});



// Inicializar o cronômetro
setInterval(updateCountdown, 1000);
updateCountdown();
