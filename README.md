#!/bin/bash

"==========================================="
"🚀 Bem-vindo ao setup do Control Employee!"
"==========================================="

# Passo 1: Clonar o repositório
"📁 Clonando o repositório..."
git clone https://github.com/dudualvim/Control_Employee.git 

cd Control_Employee

# Passo 2: Instalar dependências
"📦 Instalando dependências com npm..."
npm install

# Passo 3: Iniciar JSON Server
"🖥️  Iniciando o JSON Server na porta 3001..."
npx json-server --watch db.json --port 3001

# Passo 4: Iniciar o front-end
"🌐 Iniciando o servidor de desenvolvimento React na porta 3000..."
npm start 

"🎉 Setup concluído com sucesso!"
"Acesse a aplicação em: http://localhost:3000"
"JSON Server rodando em: http://localhost:3001/employees"
