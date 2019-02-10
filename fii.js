/**
 * Retorna a quantidade de papéis comprados de um FII
 *
 * Baseado na aba "Transações", busca os eventos de compra do ativo
 * da linha atual, somando-os. Para o cálculo de bonificação e 
 * grupamento, é necessário inverter o array de dados obtidos 
 * com getRange() e tratando com o método transformRange().
 * Abaixo segue o algoritmo para ambos.
 *
 * Bonificação
 * ===========
 *
 * Com o array de dados tratado, ordenado do mais antigo para
 * o mais atual (inverso do que é inserido na planilha), obtém-se 
 * a quantidade atual até um evento de bonificação, e então,
 * divide-se a quantidade pela proporção da bonificação, por exemplo,
 * possuindo 21 papéis de um FII e uma bonificação 4:1, resultaria
 * no cálculo 21 / 4 = 5.25, com arredondamento para 5, e em seguida,
 * somando esse resultado com a quantidade atual, ou seja, 26 papéis.
 * O resto da divisão não é utilizado.
 *
 * Grupamento
 * ==========
 * 
 * O algoritmo do grupamento é o mesmo da bonificação, porém, após
 * a divisão e arredondamento, não é somado o resultado à quantidade
 * atual, ou seja, a quantidade atual passa a ser o resultado arredondado
 * da operação. Exemplo: 17 papéis de um FII e um grupamento de fator 5:1,
 * resultaria no cálculo 17 / 5 = 3,4, arredondando para 3. O resto dos 
 * papéis da divisão é enviado para leilão pela B3, e deve voltar para o 
 * investidor futuramente.
 *
 * @returns {Int} A quantidade total do ativo da linha atual
 */
function qtde() {
  var sum = 0,
    sheet = SpreadsheetApp.getActive(),
    aba = SpreadsheetApp.getActiveSheet(),

    transacoes = sheet.getSheetByName('Transações'),
    data = transformRange(transacoes.getRange('B6:B')),
    codigos = transformRange(transacoes.getRange('C6:C')),
    eventos = transformRange(transacoes.getRange('D6:D')),
    qtdes = transformRange(transacoes.getRange('E6:E')),

    linha = aba.getActiveCell().getRow(),
    fii = aba.getRange('B' + linha).getValue().split('\n')[0];

  codigos.map(function (item, i) {
    var codigo = item.toString().split('\n')[0],
      evento = eventos[i].toString(),
      qtde = qtdes[i].toString();
    
    if (codigo === fii) {
      switch (evento) {
        case 'Compra': sum += +qtde; break;
        case 'Venda': sum -= +qtde; break;
        case 'Bonificação': sum += Math.floor(sum / qtde.split(':')[0]); break;
        case 'Grupamento': sum = Math.floor(sum / qtde.split(':')[0]); break;
      }
    }
  });
  
  return sum;
}

/**
 * Transforma um range de dados num array
 *
 * Neste método, é realizado alguns tratamentos nas colunas de dados
 * da aba de Transações, que facilitam na hora de realizar cálculos
 * de quantidade. Os tratamentos são:
 *
 * - obter valores do Range com getValues(), transformando num array;
 * - filtrar conteúdo utilizando o construtor nativo de string, 
 *   retornando somente elementos não nulos;
 * - invertendo a ordem do array, pois os dados são inseridos por ordem
 *   de data, sendo o mais atual no topo, e os dados precisam ser tratados
 *   do mais antigo para o mais novo, para cálculo de bonificação e grupamento.
 *
 * @see https://stackoverflow.com/a/17637159/1096219
 * @returns {Array} Os dados tratados e invertidos por ordem de data.
 */
function transformRange(range) {
  return range
    .getValues()
    .filter(String)
    .slice(0)
    .reverse();
}
