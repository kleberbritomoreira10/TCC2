# Instalação FGACoin
Para criar a FGACoin é necessária a instalação de algumas dependências. A seguir serão mostradas quais são:(Observação:
  Esse software foi desenvolvido no sistema operacional Linux Mint 19 Cinnamon).

# Node Package Manager (NPM)
A primeira dependência necessária é o NPM, que vem junto com a instalação do Node.js. E para instalar o Node.js vá ao
terminal (linha de comando) e digite:
$ brew install node
Ou vá diretamente no Website do Node.js, e faça o seu download e instalação em: https://nodejs.org/en/download/current/

# Truffle Framework
A próxima dependência é o Truffle Framework, que nos permite criar aplicativos descentralizados na blockchain Ethereum.
Ele fornece um conjunto de ferramentas que nos permitem escrever contatos inteligentes com a linguagem de programação
Solidity. Também nos permite testar nossos contratos inteligentes e implantá-los no blockchain.
Com o comando no terminal:
$ npm install -g truffle
Será obtida a versão mais recente do truffle framework, porém para garantir que o software irá funcionar perfeitamente,
deve ser instalada a versão 4.0.4 do truffle que foi a mesma utilizada no desenvolvimento. Tendo isso em vista para
instalar o truffle framework com o auxílio do NPM, vá até o terminal (linha de comando) e digite:
$ npm install -g truffle@4.0.4 OU npm install truffle@4.0.4
# Ganache  
A próxima dependência é o Ganache, em que o mesmo simula o comportamento de uma blockchain local na memória do
computador. Você pode instalar o ganache baixando diretamente no site: https://www.trufflesuite.com/ganache. O Ganache disponibiliza 10 contas externas com endereços em nossa blockchain local Ethereum. Cada conta é pré-carregada com falsos 100 éter.

#Metamask
A próxima e última dependência é o Metamask que é uma extensão para o google chrome, dessa forma você deve estar
utilizando o google chrome, assim essa extensão estará disponível em: https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en
Para usar a blockchain, precisamos nos conectar a ela. Assim teremos que instalar uma extensão especial do navegador
para usar a Blockchain Ethereum. É aí que entra o Metamask. Poderemos assim nos conectar ao nosso blockchain Ethereum
local com nossa conta pessoal e interagir com nosso contrato inteligente.
