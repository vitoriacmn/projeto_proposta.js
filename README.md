# Gerador de Propostas Comerciais  

Este projeto gera uma proposta comercial em HTML com base nos dados fornecidos em um script Python.  

## Tecnologias utilizadas  
- **Python**: para processar os dados e gerar o HTML  
- **Jinja2**: para preencher o template HTML com os dados dinâmicos  

## Como funciona  
1. **HTML**: Template estilizado com cores da empresa, placeholders para os dados da proposta e botões de acesso ao site.  
2. **Python**:  
   - Recebe os dados da empresa, plano e valores.  
   - Aplica descontos e ajusta valores conforme a modalidade (mensal, semestral, anual).  
   - Renderiza o template HTML com os dados e salva a proposta final.  

## Como usar  
1. Instale as dependências:  
   ```bash
   pip install jinja2
2. Execute o Script
   ```bash
   python gerar_proposta.py
4. A proposta será gerada como proposta_final.html.

