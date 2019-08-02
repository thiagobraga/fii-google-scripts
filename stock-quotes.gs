/**
 * stockQuotes
 *
 * Helper scripts for investment spreadsheet.
 * @version 0.0.1
 */

// Global variables
var sheet = SpreadsheetApp.getActive();
var transactions = sheet.getSheetByName('📈 Transações');
var codes = transformRange(transactions.getRange('C6:C'));
var events = transformRange(transactions.getRange('E6:E'));
var quantities = transformRange(transactions.getRange('F6:F'));

/**
 * 💰 Returns the number of quotas of the specified asset
 *
 * @param {String} stock The code of the stock to calculate
 * @returns {Int} The amount of stock holding
 * @customfunction
 */
function amount(stock) {
  // TODO: Get current line e.g. B9 if not specified.
  if (stock === undefined) return;

  var code, event, quantity, sum = 0;

  codes.map(function (item, i) {
    code = item[0].toString();
    event = events[i].toString();
    quantity = quantities[i].toString();

    if (code === stock) {
      switch (event) {
        case 'Venda': sum -= parseInt(quantity); break;
        case 'Compra': sum += parseInt(quantity); break;
        case 'Grupamento': sum = Math.floor(sum / quantity.split(':')[0]); break;
        case 'Bonificação': sum += Math.floor(sum / quantity.split(':')[0]); break;
        case 'Desdobramento': sum = Math.floor(sum * quantity.split(':')[1]); break;
      }
    }
  });

  return sum;
}

/**
 * Transforms a range of data in array
 *
 * @see https://stackoverflow.com/a/17637159/1096219
 * @returns {Array} Data inverted by date order.
 */
function transformRange(range) {
  return range
    .getValues()
    .filter(String)
    .slice(0)
    .reverse();
}
