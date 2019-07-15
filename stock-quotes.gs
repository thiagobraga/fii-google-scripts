/**
 * Retorna a quantidade de papéis comprados
 *
 * @returns {Int} A quantidade total do ativo da linha atual
 */
function qtde(ativo) {
  var sum = 0;
  var sheet = SpreadsheetApp.getActive();
  var aba = SpreadsheetApp.getActiveSheet();

  var transacoes = sheet.getSheetByName('📈📉 Transações');
  var data = transformRange(transacoes.getRange('B6:B'));
  var codigos = transformRange(transacoes.getRange('C6:C'));
  var eventos = transformRange(transacoes.getRange('E6:E'));
  var qtdes = transformRange(transacoes.getRange('F6:F'));

  var linha = aba.getActiveCell().getRow();
  var ativo = aba.getRange('B' + linha).getValue().split('\n')[0];

  codigos.map(function (item, i) {
    var codigo = item[0].toString().split('\n')[0];
    var evento = eventos[i].toString();
    var qtde = qtdes[i].toString();
    
    if (codigo === ativo) {
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
