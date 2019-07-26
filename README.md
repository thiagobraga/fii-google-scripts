<h1 align="center">Stock Quotes | Google Scripts</h1>

<p align="center">
  📈 Funções do Google Scripts para auxílio em planilha de Investimentos em Fundos Imobiliários e Ações
</p>

## Cálculo de quantidade

Baseado na aba "Transações", busca os eventos de compra do ativo
especificado, somando-os. Para o cálculo de bonificação e 
grupamento, é necessário inverter o array de dados obtidos 
com getRange() e tratando com o método transformRange().
Abaixo segue o algoritmo para ambos.

### Bonificação

Com o array de dados tratado, ordenado do mais antigo para
o mais atual (inverso do que é inserido na planilha), obtém-se 
a quantidade atual até um evento de bonificação, e então,
divide-se a quantidade pela proporção da bonificação, por exemplo,
possuindo 21 papéis de um FII e uma bonificação 4:1, resultaria
no cálculo 21 / 4 = 5.25, com arredondamento para 5, e em seguida,
somando esse resultado com a quantidade atual, ou seja, 26 papéis.
O resto da divisão não é utilizado.

### Grupamento

O algoritmo do grupamento é o mesmo da bonificação, porém, após
a divisão e arredondamento, não é somado o resultado à quantidade
atual, ou seja, a quantidade atual passa a ser o resultado arredondado
da operação. Exemplo: 17 papéis de um FII e um grupamento de fator 5:1,
resultaria no cálculo 17 / 5 = 3,4, arredondando para 3. O resto dos 
papéis da divisão é enviado para leilão pela B3, e deve voltar para o 
investidor futuramente.

### Desdobramento

(WIP)
