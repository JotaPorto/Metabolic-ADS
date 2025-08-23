# Calculadora TMB e IMC

**Projeto Acadêmico - Universidade Presbiteriana Mackenzie**  
**Tecnologia em Análise e Desenvolvimento de Sistemas**  
**Disciplina: Prática Profissional em Análise e Desenvolvimento de Sistemas**

## 👥 Equipe de Desenvolvimento

- **André Henrique Eduardo de Jesus** - RA: 10414852
- **João Pedro Porto** - RA: 10407770  
- **Fabio Batista de Almeida** - RA: 10289796
- **Professor:** Tomaz Mikio Sasaki

## 📋 Sobre o Projeto

Este projeto consiste em uma aplicação web para cálculo de Taxa Metabólica Basal (TMB) e Índice de Massa Corporal (IMC), desenvolvida como parte da avaliação da disciplina. A aplicação oferece uma interface intuitiva para profissionais de saúde e usuários interessados em monitorar indicadores de saúde corporal.

## ⚡ Funcionalidades

### 🧮 Cálculos Principais
- **IMC (Índice de Massa Corporal)**: Cálculo baseado na fórmula peso/altura²
- **TMB (Taxa Metabólica Basal)**: Implementação de duas fórmulas reconhecidas:
  - Mifflin-St Jeor (recomendada)
  - Harris-Benedict

### 📊 Recursos Adicionais
- Classificação automática do IMC segundo padrões da OMS
- Cálculo de gasto calórico total baseado no nível de atividade
- Sugestões personalizadas para déficit/superávit calórico
- Histórico de cálculos com armazenamento local
- Geração de relatórios em PDF
- Interface responsiva para dispositivos móveis
- Validação em tempo real dos dados inseridos

### 🎯 Objetivos Atendidos

#### Funcionais
✅ Calcular TMB usando equações de Mifflin-St Jeor e Harris-Benedict  
✅ Calcular IMC com base no peso e altura  
✅ Gerar relatórios personalizados com sugestões calóricas  
✅ Comparar resultados com padrões da OMS  

#### Não-Funcionais
✅ **Desempenho**: Interface rápida e responsiva  
✅ **Segurança**: Dados armazenados localmente no navegador  
✅ **Usabilidade**: Interface intuitiva com guias passo a passo  
✅ **Compatibilidade**: Funciona em navegadores modernos e dispositivos móveis  
✅ **Acessibilidade**: Estrutura semântica e contrastes adequados  

## 🚀 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica da aplicação
- **CSS3**: Estilização moderna com Flexbox/Grid e animações
- **JavaScript (ES6+)**: Lógica da aplicação e interatividade
- **Font Awesome**: Ícones vetoriais
- **LocalStorage**: Persistência de dados no navegador

## 📁 Estrutura do Projeto

```
calculadora-tmb-imc/
├── index.html          # Estrutura principal da aplicação
├── styles.css          # Estilos e design responsivo
├── script.js           # Lógica e funcionalidades
└── README.md           # Documentação do projeto
```

## 🔧 Como Executar

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/JotaPorto/Metabolic-ADS.git
   ```

2. **Abra o arquivo index.html** em qualquer navegador moderno
   - Não requer servidor local
   - Funciona diretamente no navegador

## 📱 Como Usar

1. **Preencha os dados pessoais:**
   - Nome completo
   - Idade (15-100 anos)
   - Peso em kg (30-300kg)
   - Altura em cm (100-250cm)
   - Sexo biológico
   - Nível de atividade física

2. **Escolha a fórmula para TMB:**
   - Mifflin-St Jeor (mais precisa)
   - Harris-Benedict (clássica)

3. **Visualize os resultados:**
   - IMC com classificação da OMS
   - TMB e gasto calórico total
   - Sugestões para objetivos específicos

4. **Recursos adicionais:**
   - Salve no histórico
   - Gere relatório em PDF
   - Consulte recomendações personalizadas

## 📊 Validações Implementadas

- **Idade**: Entre 15 e 100 anos
- **Peso**: Entre 30 e 300 kg
- **Altura**: Entre 100 e 250 cm
- **Campos obrigatórios**: Validação antes do cálculo
- **Formato numérico**: Aceita decimais para peso

## 🧪 Fórmulas Utilizadas

### IMC (Índice de Massa Corporal)
```
IMC = peso (kg) / altura (m)²
```

### TMB - Mifflin-St Jeor
```
Homens: TMB = 10 × peso + 6.25 × altura - 5 × idade + 5
Mulheres: TMB = 10 × peso + 6.25 × altura - 5 × idade - 161
```

### TMB - Harris-Benedict
```
Homens: TMB = 88.362 + (13.397 × peso) + (4.799 × altura) - (5.677 × idade)
Mulheres: TMB = 447.593 + (9.247 × peso) + (3.098 × altura) - (4.330 × idade)
```

## 📈 Classificação do IMC (OMS)

| Faixa | Classificação |
|-------|---------------|
| < 18,5 | Abaixo do peso |
| 18,5 - 24,9 | Peso normal |
| 25,0 - 29,9 | Sobrepeso |
| 30,0 - 34,9 | Obesidade grau I |
| 35,0 - 39,9 | Obesidade grau II |
| ≥ 40,0 | Obesidade grau III |

## 🎨 Características do Design

- **Design Responsivo**: Adaptável a diferentes tamanhos de tela
- **Paleta de Cores**: ?
- **Tipografia**: Fontes system para melhor performance
- **Animações**: Transições CSS
- **Acessibilidade**: Contraste adequado e navegação por teclado

## 🔒 Segurança e Privacidade

- **Dados Locais**: Informações armazenadas apenas no navegador do usuário
- **Sem Servidor**: Não há transmissão de dados pessoais
- **Código Aberto**: Transparência do funcionamento

## 📝 Casos de Uso Implementados

### Caso de Uso 1: Calcular TMB
- **Ator**: Usuário
- **Pré-condições**: Dados pessoais preenchidos
- **Fluxo**: Seleção de fórmula → Cálculo → Exibição de resultados
- **Pós-condições**: Resultado disponível para salvamento

### Caso de Uso 2: Calcular IMC
- **Ator**: Usuário
- **Fluxo**: Inserção de peso/altura → Cálculo → Classificação → Recomendações
- **Resultado**: IMC calculado com sugestões de saúde

## 🤝 Contribuições

Este projeto é desenvolvido para fins acadêmicos na Universidade Presbiteriana Mackenzie.





