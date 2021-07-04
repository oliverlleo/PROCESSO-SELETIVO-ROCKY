
const fs = require('fs');
const leitura = require('./broken-database.json'); //https://pt.stackoverflow.com/questions/213910/javascript-diferen%C3%A7as-entre-import-e-require

const dados = JSON.parse(JSON.stringify(leitura)); //https://dicasdejavascript.com.br/javascript-como-converter-objeto-json-em-string/

  
function init(dados) {
  const dadosTratados = dados.map(data => {
      data.name = tratarNome(data?.name);
      data.price = tratarPreco(data?.price);
      data.quantity = tratarQuantidade(data?.quantity);

      return data;
  })
  console.log('DadosTratados', dadosTratados);

  const dadosOrdenarPorCategoriaeID = ordenarPorCategoriaeID(dadosTratados);
  console.log('DadosOrdenarPorCategoriaeID', dadosOrdenarPorCategoriaeID)
  
  const dadoSomaPorCategoria = somaPorCategoria(dadosTratados);
  console.log('DadosSomaPorCategoria', dadoSomaPorCategoria)

  salvaDados(dadosTratados);
}



function tratarNome(name = '') {
  name = name.replaceAll('ø', 'o')
      .replaceAll('æ', 'a')
      .replaceAll('¢', 'c')
      .replaceAll('ß', 'b');

  return name;
}

function tratarPreco(price = 0) {
  return Number(price);
}

function tratarQuantidade(quantity = 0) {
  return Number(quantity);
}

function ordenarPorCategoriaeID(dados) {
  return [...dados].sort((a, b) => {
    if (a.category < b.category) return -1;
    if (a.category > b.category) return 1;
    if (a.category==b.category){
      return (a.id-b.id);}
    return 0;
}) //https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
}



function somaPorCategoria(dados){
    
  return dados.reduce((resume, current) => {
      const precoXquantidade = 
    Number(current.quantity*current.price);
      const totalAtual =
    Number(resume[current.category] ?? 0);

     resume[current.category] = parseFloat(precoXquantidade + totalAtual).toFixed(2);
    
     return resume;
  },{});//https://raullesteves.medium.com/javascript-entendendo-o-reduce-de-uma-vez-por-todas-c4cbaa16e380
 

}

  
     




function salvaDados(saida) {
  fs.writeFile('saida.json', JSON.stringify(saida), (err) => {
    if (err) throw err;
  });
}
  
  init(dados);