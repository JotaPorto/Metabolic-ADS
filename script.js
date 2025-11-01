// Variáveis globais
let historicoCalculos = JSON.parse(localStorage.getItem('historicoTMB') || '[]');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    carregarHistorico();
    
    const form = document.getElementById('userForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calcularTMBIMC();
    });
});

// Função principal para calcular TMB e IMC
function calcularTMBIMC() {
    const nome = document.getElementById('nome').value;
    const idade = parseInt(document.getElementById('idade').value);
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseInt(document.getElementById('altura').value);
    const sexo = document.querySelector('input[name="sexo"]:checked').value;
    const atividade = parseFloat(document.getElementById('atividade').value);
    const formula = document.getElementById('formula').value;
    
    // Validações
    if (!validarDados(idade, peso, altura)) {
        return;
    }
    
    // Calcular IMC
    const alturaMetros = altura / 100;
    const imc = peso / (alturaMetros * alturaMetros);
    const classificacaoIMC = classificarIMC(imc);
    
    // Calcular TMB
    let tmb;
    let formulaUsada;
    
    if (formula === 'mifflin') {
        tmb = calcularMifflinStJeor(peso, altura, idade, sexo);
        formulaUsada = 'Mifflin-St Jeor';
    } else {
        tmb = calcularHarrisBenedict(peso, altura, idade, sexo);
        formulaUsada = 'Harris-Benedict';
    }
    
    const gastoTotal = tmb * atividade;
    const perdaPeso = gastoTotal - 500; // Déficit de 500 kcal para perder ~0.5kg/semana
    const ganhoPeso = gastoTotal + 500; // Superávit de 500 kcal para ganhar ~0.5kg/semana
    
    // Exibir resultados
    exibirResultados(imc, classificacaoIMC, tmb, formulaUsada, gastoTotal, perdaPeso, ganhoPeso);
    
    // Gerar recomendações
    gerarRecomendacoes(imc, classificacaoIMC, gastoTotal, nome);
    
    // Salvar dados para o histórico
    window.ultimoCalculo = {
        nome,
        idade,
        peso,
        altura,
        sexo,
        atividade,
        formula: formulaUsada,
        imc: imc.toFixed(1),
        classificacaoIMC,
        tmb: Math.round(tmb),
        gastoTotal: Math.round(gastoTotal),
        data: new Date().toLocaleDateString('pt-BR')
    };
}

// Função para validar dados de entrada
function validarDados(idade, peso, altura) {
    if (idade < 15 || idade > 100) {
        alert('Idade deve estar entre 15 e 100 anos.');
        return false;
    }
    if (peso < 30 || peso > 300) {
        alert('Peso deve estar entre 30 e 300 kg.');
        return false;
    }
    if (altura < 100 || altura > 250) {
        alert('Altura deve estar entre 100 e 250 cm.');
        return false;
    }
    return true;
}

// Fórmula Mifflin-St Jeor
function calcularMifflinStJeor(peso, altura, idade, sexo) {
    const base = 10 * peso + 6.25 * altura - 5 * idade;
    return sexo === 'masculino' ? base + 5 : base - 161;
}

// Fórmula Harris-Benedict
function calcularHarrisBenedict(peso, altura, idade, sexo) {
    if (sexo === 'masculino') {
        return 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * idade);
    } else {
        return 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * idade);
    }
}

// Classificar IMC segundo OMS
function classificarIMC(imc) {
    if (imc < 18.5) return { categoria: 'abaixo', texto: 'Abaixo do peso' };
    if (imc < 25) return { categoria: 'normal', texto: 'Peso normal' };
    if (imc < 30) return { categoria: 'sobrepeso', texto: 'Sobrepeso' };
    if (imc < 35) return { categoria: 'obesidade', texto: 'Obesidade grau I' };
    if (imc < 40) return { categoria: 'obesidade', texto: 'Obesidade grau II' };
    return { categoria: 'obesidade', texto: 'Obesidade grau III' };
}

// Exibir resultados na interface
function exibirResultados(imc, classificacaoIMC, tmb, formulaUsada, gastoTotal, perdaPeso, ganhoPeso) {
    // Mostrar seção de resultados
    document.getElementById('results-section').classList.remove('hidden');
    
    // Atualizar IMC
    document.getElementById('imc-valor').textContent = imc.toFixed(1);
    const classificacaoElement = document.getElementById('imc-classificacao');
    classificacaoElement.textContent = classificacaoIMC.texto;
    classificacaoElement.className = `classification ${classificacaoIMC.categoria}`;
    
    // Destacar categoria na escala
    document.querySelectorAll('.scale-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-range="${classificacaoIMC.categoria}"]`)?.classList.add('active');
    
    // Atualizar TMB
    document.getElementById('tmb-valor').textContent = Math.round(tmb);
    document.getElementById('formula-usada').textContent = `Fórmula: ${formulaUsada}`;
    document.getElementById('gasto-total').textContent = `${Math.round(gastoTotal)} kcal/dia`;
    document.getElementById('perda-peso').textContent = `${Math.round(perdaPeso)} kcal/dia`;
    document.getElementById('ganho-peso').textContent = `${Math.round(ganhoPeso)} kcal/dia`;
    
    // Scroll suave para os resultados
    document.getElementById('results-section').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

// Gerar recomendações personalizadas
function gerarRecomendacoes(imc, classificacaoIMC, gastoTotal, nome) {
    const container = document.getElementById('recomendacoes-content');
    const recomendacoes = [];
    
    // Recomendações baseadas no IMC
    switch(classificacaoIMC.categoria) {
        case 'abaixo':
            recomendacoes.push({
                tipo: 'Nutrição',
                icone: 'fas fa-utensils',
                texto: 'Considere aumentar a ingestão calórica com alimentos nutritivos. Consulte um nutricionista para um plano personalizado.'
            });
            recomendacoes.push({
                tipo: 'Exercícios',
                icone: 'fas fa-dumbbell',
                texto: 'Foque em exercícios de resistência para ganhar massa muscular de forma saudável.'
            });
            break;
            
        case 'normal':
            recomendacoes.push({
                tipo: 'Manutenção',
                icone: 'fas fa-check-circle',
                texto: 'Parabéns! Seu peso está na faixa ideal. Continue mantendo seus hábitos saudáveis.'
            });
            recomendacoes.push({
                tipo: 'Atividade',
                icone: 'fas fa-running',
                texto: 'Mantenha uma rotina regular de exercícios - pelo menos 150min de atividade moderada por semana.'
            });
            break;
            
        case 'sobrepeso':
        case 'obesidade':
            recomendacoes.push({
                tipo: 'Déficit Calórico',
                icone: 'fas fa-chart-line',
                texto: 'Para perda de peso saudável, mantenha um déficit de 300-500 calorias diárias. Consulte um profissional.'
            });
            recomendacoes.push({
                tipo: 'Exercícios',
                icone: 'fas fa-heart',
                texto: 'Combine exercícios cardiovasculares com treinamento de força. Inicie gradualmente.'
            });
            break;
    }
    
    // Recomendações gerais
    recomendacoes.push({
        tipo: 'Hidratação',
        icone: 'fas fa-tint',
        texto: 'Mantenha-se hidratado bebendo pelo menos 35ml de água por kg de peso corporal diariamente.'
    });
    
    recomendacoes.push({
        tipo: 'Acompanhamento',
        icone: 'fas fa-user-md',
        texto: 'Consulte regularmente profissionais de saúde para monitoramento e orientações personalizadas.'
    });
    
    // Renderizar recomendações
    container.innerHTML = recomendacoes.map(rec => `
        <div class="recommendation-item">
            <h4><i class="${rec.icone}"></i> ${rec.tipo}</h4>
            <p>${rec.texto}</p>
        </div>
    `).join('');
}

// Salvar no histórico
function salvarHistorico() {
    if (!window.ultimoCalculo) {
        alert('Nenhum cálculo para salvar!');
        return;
    }
    
    historicoCalculos.unshift(window.ultimoCalculo);
    
    // Manter apenas os últimos 10 cálculos
    if (historicoCalculos.length > 10) {
        historicoCalculos = historicoCalculos.slice(0, 10);
    }
    
    localStorage.setItem('historicoTMB', JSON.stringify(historicoCalculos));
    carregarHistorico();
    
    // Feedback visual
    const btn = event.target;
    const textoOriginal = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Salvo!';
    btn.style.backgroundColor = '#059669';
    
    setTimeout(() => {
        btn.innerHTML = textoOriginal;
        btn.style.backgroundColor = '';
    }, 2000);
}

// Carregar histórico na interface
function carregarHistorico() {
    const container = document.getElementById('historico-lista');
    
    if (historicoCalculos.length === 0) {
        container.innerHTML = '<p class="empty-state">Nenhum cálculo realizado ainda</p>';
        return;
    }
    
    container.innerHTML = historicoCalculos.map((calculo, index) => `
        <div class="history-item">
            <div class="history-info">
                <div class="history-date">${calculo.data} - ${calculo.nome}</div>
                <div class="history-results">
                    IMC: ${calculo.imc} kg/m² (${calculo.classificacaoIMC.texto}) | 
                    TMB: ${calculo.tmb} kcal/dia (${calculo.formula})
                </div>
                <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 4px;">
                    ${calculo.idade} anos, ${calculo.peso}kg, ${calculo.altura}cm, ${calculo.sexo}
                </div>
            </div>
            <button onclick="removerDoHistorico(${index})" class="btn-outline btn-small" style="min-width: auto;">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

// Remover item do histórico
function removerDoHistorico(index) {
    if (confirm('Deseja remover este cálculo do histórico?')) {
        historicoCalculos.splice(index, 1);
        localStorage.setItem('historicoTMB', JSON.stringify(historicoCalculos));
        carregarHistorico();
    }
}

// Limpar todo o histórico
function limparHistorico() {
    if (historicoCalculos.length === 0) {
        alert('Histórico já está vazio!');
        return;
    }
    
    if (confirm('Deseja limpar todo o histórico? Esta ação não pode ser desfeita.')) {
        historicoCalculos = [];
        localStorage.removeItem('historicoTMB');
        carregarHistorico();
    }
}

// Gerar relatório em PDF (simulação)
function gerarRelatorio() {
    if (!window.ultimoCalculo) {
        alert('Nenhum cálculo para gerar relatório!');
        return;
    }
    
    const calculo = window.ultimoCalculo;
    
    // Criar conteúdo do relatório
    const relatorioHTML = `
        <html>
        <head>
            <title>Relatório TMB e IMC - ${calculo.nome}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; }
                .header { text-align: center; margin-bottom: 30px; }
                .section { margin: 20px 0; }
                .result-box { border: 1px solid #ddd; padding: 15px; margin: 10px 0; }
                .footer { margin-top: 40px; font-size: 12px; color: #666; }
                table { width: 100%; border-collapse: collapse; margin: 10px 0; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f5f5f5; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Relatório de Avaliação Corporal</h1>
                <h2>TMB e IMC</h2>
                <p>Universidade Presbiteriana Mackenzie</p>
            </div>
            
            <div class="section">
                <h3>Dados Pessoais</h3>
                <table>
                    <tr><th>Nome</th><td>${calculo.nome}</td></tr>
                    <tr><th>Idade</th><td>${calculo.idade} anos</td></tr>
                    <tr><th>Peso</th><td>${calculo.peso} kg</td></tr>
                    <tr><th>Altura</th><td>${calculo.altura} cm</td></tr>
                    <tr><th>Sexo</th><td>${calculo.sexo}</td></tr>
                    <tr><th>Data da Avaliação</th><td>${calculo.data}</td></tr>
                </table>
            </div>
            
            <div class="section">
                <h3>Resultados</h3>
                <div class="result-box">
                    <h4>Índice de Massa Corporal (IMC)</h4>
                    <p><strong>Valor:</strong> ${calculo.imc} kg/m²</p>
                    <p><strong>Classificação:</strong> ${calculo.classificacaoIMC.texto}</p>
                </div>
                
                <div class="result-box">
                    <h4>Taxa Metabólica Basal (TMB)</h4>
                    <p><strong>Fórmula utilizada:</strong> ${calculo.formula}</p>
                    <p><strong>TMB:</strong> ${calculo.tmb} kcal/dia</p>
                    <p><strong>Gasto Calórico Total:</strong> ${calculo.gastoTotal} kcal/dia</p>
                </div>
            </div>
            
            <div class="section">
                <h3>Observações</h3>
                <p>Este relatório foi gerado automaticamente pela Calculadora TMB e IMC desenvolvida como projeto acadêmico.</p>
                <p><strong>Importante:</strong> Os resultados são apenas orientativos. Consulte sempre um profissional de saúde qualificado.</p>
            </div>
            
            <div class="footer">
                <p>Relatório gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</p>
                <p>Desenvolvido por: André Henrique, João Pedro Porto, Fabio Almeida</p>
            </div>
        </body>
        </html>
    `;
    
    // Abrir em nova janela para impressão
    const novaJanela = window.open('', '_blank');
    novaJanela.document.write(relatorioHTML);
    novaJanela.document.close();
    
    // Tentar imprimir automaticamente
    setTimeout(() => {
        novaJanela.print();
    }, 1000);
}

// Novo cálculo
function novoCalculo() {
    document.getElementById('userForm').reset();
    document.getElementById('results-section').classList.add('hidden');
    window.ultimoCalculo = null;
    
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Funções utilitárias
function formatarData(data) {
    return new Date(data).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Validação em tempo real
document.addEventListener('DOMContentLoaded', function() {
    // Validação de peso em tempo real
    const pesoInput = document.getElementById('peso');
    pesoInput.addEventListener('input', function() {
        const valor = parseFloat(this.value);
        if (valor && (valor < 30 || valor > 300)) {
            this.style.borderColor = '#dc2626';
        } else {
            this.style.borderColor = '';
        }
    });
    
    // Validação de altura em tempo real
    const alturaInput = document.getElementById('altura');
    alturaInput.addEventListener('input', function() {
        const valor = parseInt(this.value);
        if (valor && (valor < 100 || valor > 250)) {
            this.style.borderColor = '#dc2626';
        } else {
            this.style.borderColor = '';
        }
    });
    
    // Validação de idade em tempo real
    const idadeInput = document.getElementById('idade');
    idadeInput.addEventListener('input', function() {
        const valor = parseInt(this.value);
        if (valor && (valor < 15 || valor > 100)) {
            this.style.borderColor = '#dc2626';
        } else {
            this.style.borderColor = '';
        }
    });
});

// Compartilhar resultados via WhatsApp
function compartilharWhatsApp() {
    if (!window.ultimoCalculo) {
        alert('Nenhum cÃ¡lculo para compartilhar!');
        return;
    }
    
    const calculo = window.ultimoCalculo;
    
    // Montar mensagem formatada
    const mensagem = `
*Meus Resultados - Calculadora TMB e IMC*

*Dados Pessoais:*
- Nome: ${calculo.nome}
- Idade: ${calculo.idade} anos
- Peso: ${calculo.peso} kg
- Altura: ${calculo.altura} cm
- Sexo: ${calculo.sexo}

*Resultados:*
- IMC: ${calculo.imc} kg/m²
- Classificação: ${calculo.classificacaoIMC.texto}
- TMB: ${calculo.tmb} kcal/dia
- Gasto Calórico Total: ${calculo.gastoTotal} kcal/dia
- Fórmula: ${calculo.formula}

Data: ${calculo.data}

Gerado em: Calculadora Metabolic
    `.trim();
    
    // Codificar mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    // Abrir WhatsApp Web ou app
    const urlWhatsApp = `https://wa.me/?text=${mensagemCodificada}`;
    window.open(urlWhatsApp, '_blank');
}

// Atalhos de teclado
document.addEventListener('keydown', function(e) {
    // Ctrl + Enter para calcular
    if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        const form = document.getElementById('userForm');
        if (form.checkValidity()) {
            calcularTMBIMC();
        }
    }
    
    // Esc para novo cálculo
    if (e.key === 'Escape') {
        novoCalculo();
    }
});