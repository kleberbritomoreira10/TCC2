//Declaração da Versão do solidity
pragma solidity ^0.4.18;

//Criação do Contrato que representará a criptomoeda FGACoin
contract FGACoin {

    //Declaração do nome da criptomoeda
    string public name = "FGA Coin";
    //Declaração do símbolo
    string public symbol = "FGACOIN";
    //Declaração de uma versão de desenvolvimento
    string public standard = "FGA Coin v1.0";

    //Declaração de um inteiro sem sinal que armazenará a quantidade total de FGACoin fornecidas
    uint256 public totalSupply;

    // Ao transferir uma moeda será disparado esse evento
    event Transfer(
      address indexed _from,
      address indexed _to,
      uint256 _value
    );

    // Será disparado esse evento para verificar se aprova uma transação
    event Approval(
      address indexed _owner,
      address indexed _spender,
      uint256 _value
    );

    // Função designada para encontrar o endereço e o balanço financeiro de interesse
    mapping(address => uint256) public balanceOf;

    // Função designada para encontrar o endereço de interesse e a quantidade aprovada para transação
    mapping(address => mapping(address => uint256)) public allowance;

    // Criação do Construtor
    // Ao rodar a migração, faz a leitura do número total de tokens presente no arquivo 2_deploy_contracts.js e
    // inicializa o sistema, designando esse valor para o administrador em [msg.sender]
    function FGACoin(uint256 _initialSupply) public {
      //msg é uma variável global para acessar algo de interesse.
      balanceOf[msg.sender] = _initialSupply;
      totalSupply = _initialSupply;
    }

    // Função para emitir um desejo de negociação
    function transfer(address _to, uint256 _value) public returns (bool success){
      //Dispara uma exceção se a conta não tiver saldo suficiente
      require(balanceOf[msg.sender] >= _value);

      //Transfere os valores entre as contas
      balanceOf[msg.sender] -= _value;
      balanceOf[_to] += _value;

      // Dispara o evento de transferência
      Transfer(msg.sender, _to, _value);

      // Em caso de sucesso nessa etapa retorna true
      return true;
    }

    // Função para verificar se essa transação é possível
    function approve(address _spender, uint256 _value) public returns (bool success){
      // Allowance designa o valor disponível para gastar
      allowance[msg.sender][_spender] = _value;

      // Dispara o evento de aprovação
      Approval(msg.sender, _spender, _value);

      // Em caso de sucesso nessa etapa retorna true
      return true;
    }

    // Função que executa de fato a transferência entre as contas
    function transferFrom(address _from, address _to, uint256 _value) public returns(bool success){
      // Verifica se o remetente tem saldo (tokens/moedas) suficiente
      require(_value <= balanceOf[_from]);

      //Verifica se o allowance é grande suficiente
      require(_value <= allowance[_from][msg.sender]);

      //Mudar o balanço financeiro
      balanceOf[_from] -= _value;
      balanceOf[_to] += _value;

      //Atualiza o allowance
      allowance[_from][msg.sender] -= _value;

      //Dispara o evento de transferência
      Transfer(_from, _to, _value);

      //Em caso de sucesso retorna true
      return true;
    }
}
