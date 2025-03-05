// Função para formatar a data
function calcularValidade() {
    const hoje = new Date();
    hoje.setDate(hoje.getDate() + 7); // Adiciona 7 dias
    return hoje.toLocaleDateString('pt-BR'); // Formata a data para o padrão brasileiro
}

// Função para formatar valores como moeda brasileira (R$)
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Dados da proposta
const dados = {
    empresa: "",
    contato: "",
    email: "", // Adicione um email padrão caso esteja em branco
    plano: "Enterprise",
    quantidade: 13,
    valor_normal: 75, // Valor normal da licença
    desconto: 9, // Desconto em %
    modalidade: "Semestral", // Pode ser "Mensal", "Semestral" ou "Anual"
    validade: calcularValidade(),
    vendedor: "Vitória Comiran",
    cargo: "Consultora de Negócios em TI",
    email_vendedor: "vitoria@tomticket.com",
    telefone: "(54) 3632-7104",
    tom: "TomTicket | CNPJ: 19.683.154/0001-53 | Av. Brasil Leste, 470 - Sala 08 - Centro, Passo Fundo/RS, 99010-001"
};

// Cálculo do valor com desconto
const valorComDesconto = dados.valor_normal * (1 - dados.desconto / 100);
const valorTotal = valorComDesconto * dados.quantidade;
const multiplicador = { "Mensal": 1, "Semestral": 6, "Anual": 12 };

// Formatação dos valores
dados.valor_normal = formatarMoeda(dados.valor_normal); // Formata o valor normal
dados.valor_com_desconto = formatarMoeda(valorComDesconto);
dados.valor_total = formatarMoeda(valorTotal * multiplicador[dados.modalidade]);

// Função para preencher os campos HTML com os dados formatados
function preencherProposta() {
    Object.keys(dados).forEach(key => {
        const elemento = document.getElementById(key);
        if (elemento) {
            elemento.innerText = dados[key];
        }
    });
}

// Garante que os dados são carregados antes da execução do script
document.addEventListener("DOMContentLoaded", () => {
    preencherProposta();
    document.getElementById("gerar-pdf").addEventListener("click", gerarPDF);
});

function gerarPDF() {
    const elemento = document.querySelector(".container");
    const botoes = document.querySelector(".buttons");
    const botaoPDF = document.getElementById("gerar-pdf"); // Identifica o botão de "Baixar PDF"

    // Esconde apenas o botão de "Baixar PDF"
    botaoPDF.style.display = "none";

    const options = {
        margin: 5,
        filename: `Proposta TomTicket_${dados.empresa.replace(/\s+/g, '_')} - ${dados.plano.replace(/\s+/g, '_')}(${dados.modalidade.replace(/\s+/g, '_')}).pdf`        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2, 
            useCORS: true,
            scrollX: 0, 
            scrollY: 0, 
            windowWidth: document.documentElement.offsetWidth
        },
        jsPDF: { format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(options).from(elemento).save().then(() => {
        // Após o PDF ser gerado, o botão de "Baixar PDF" reaparece
        botaoPDF.style.display = "block";
    });
}
