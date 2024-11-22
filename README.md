#!/bin/bash

"==========================================="
"🚀 Bem-vindo ao setup do Control Employee!"
echo "==========================================="

# Passo 1: Clonar o repositório
echo "📁 Clonando o repositório..."
git clone https://github.com/dudualvim/Control_Employee.git || {
    echo "❌ Erro ao clonar o repositório!"
    exit 1
}
cd Control_Employee || exit 1

# Passo 2: Instalar dependências
echo "📦 Instalando dependências com npm..."
npm install || {
    echo "❌ Erro ao instalar as dependências!"
    exit 1
}

# Passo 3: Iniciar JSON Server
echo "🖥️  Iniciando o JSON Server na porta 3001..."
npx json-server --watch db.json --port 3001 &

# Passo 4: Iniciar o front-end
echo "🌐 Iniciando o servidor de desenvolvimento React na porta 3000..."
npm start || {
    echo "❌ Erro ao iniciar o servidor de desenvolvimento!"
    exit 1
}

echo "🎉 Setup concluído com sucesso!"
echo "Acesse a aplicação em: http://localhost:3000"
echo "JSON Server rodando em: http://localhost:3001"

exit 0
