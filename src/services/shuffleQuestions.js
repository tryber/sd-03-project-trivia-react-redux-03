/* Recebe uma array, cria uma nova array de
objetos com uma chave sort randomica
(adicionei um segundo Math.random() para
  garantir que a propriedade sort tenha chances
  reduzidas de ter o mesmo valor para dois
  itens), retorna uma nova array com os itens
  da array original randomicamente organizados */

const shuffleQuestions = (array) => array
  .map((item) => ({ sort: (Math.random() * Math.random()), value: item }))
  .sort((itemA, itemB) => itemA.sort - itemB.sort)
  .map((item) => item.value);

export default shuffleQuestions;
