import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from jinja2 import Template

# Dados da proposta
dados = {
    "empresa": "Compass UOL",
    "contato": "Ellen",
    "email": "ellennramos@gmail.com",
    "plano": "Premium",
    "quantidade": 12,
    "valor_normal": 59,  # Valor normal da licença
    "desconto": 13,  # Desconto em %
    "modalidade": "Anual",  # Pode ser "Mensal", "Semestral" ou "Anual"
    "validade": "7 dias",
    "vendedor": "Vitória Comiran",
    "cargo": "Consultora de Negócios em TI",
    "email_vendedor": "vitoria@tomticket.com",
    "telefone": "(54) 3632-7104"
}

# Cálculo do valor com desconto
dados["valor_com_desconto"] = dados["valor_normal"] * (1 - dados["desconto"] / 100)
dados["valor_total"] = dados["valor_com_desconto"] * dados["quantidade"]

# Ajustar valor total de acordo com a modalidade
multiplicador = {"Mensal": 1, "Semestral": 6, "Anual": 12}
dados["valor_total"] *= multiplicador[dados["modalidade"]]

# Abrir o template HTML
with open("proposta.html", "r", encoding="utf-8") as file:
    template = Template(file.read())

# Preencher o template com os dados
proposta_preenchida = template.render(dados)

# Salvar o HTML preenchido
proposta_path = "proposta_final.html"
with open(proposta_path, "w", encoding="utf-8") as file:
    file.write(proposta_preenchida)

print("Proposta gerada com sucesso!")

