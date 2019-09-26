//Cria um objeto referente ao contrato Migration
var Migrations = artifacts.require("./Migrations.sol");

//Módulo responsável por implementar a migração
module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
