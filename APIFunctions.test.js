const { getProducts } = require('./APIfunctions');
const collection = require('./database');
jest.mock('./database');

describe('getProducts', () => {
  let databaseMock;

  it('returns a list of products that match the name', async () => {
    const testSearchString = 'Fotboll';

    const filterdResult = await getProducts(testSearchString);

    expect(filterdResult).toStrictEqual([{
      id: '1hjjh2h2',
      name: 'Fotboll',
      details: 'En boll man kan sparka på',
      price: 120,
      inStock: 20,
      image: 'https://jkashdkasjdja.jpg',
    }]);
  });

  it('returns product even with small or big letter', async () => {
    const searchString = 'PINGISRACK';

    const filterdResult = await getProducts(searchString);

    expect(filterdResult).toStrictEqual([{
      id: "12343dsa",
      name: "Pingisrack",
      details: "Ska du bli bäst på pingis? Då är detta racket för dig.",
      price: 150,
      inStock: 8,
      image: "https://dfsdfdjghs.se",
    }]);
  })
  // it returns product even with white space
  // it returns false/message if no matching product
  // it returns false if invalid search-string
  // it returns message if product out of stock
});
