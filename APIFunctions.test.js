const { beforeEach } = require('@jest/globals');
const { getProducts } = require('./APIfunctions');

describe('getProducts', () => {
  let databaseMock;
  beforeEach(() => {
    databaseMock = jest.fn(() => [
      {
        id: '1hjjh2h2',
        name: 'Fotboll',
        details: 'En boll man kan sparka på',
        price: 120,
        inStock: 20,
        image: 'https://jkashdkasjdja.jpg',
      },
      {
        id: 'a1243arte',
        name: 'Basketboll',
        details: 'En boll att kasta i en korg',
        price: 310,
        inStock: 15,
        image: 'https://hjkdfksjdf.se',
      },
      {
        id: 'ajgffhj21',
        name: 'Krocketspel',
        details: 'Ett härligt spel att spela på sommaren',
        price: 200,
        inStock: 5,
        image: 'https://fsdkjfghskdfjghs.se',
      },
      {
        id: 'ajgfgsjsd',
        name: 'Innebandyklubba',
        details: 'Den bästa klubban för dig och ditt bandylag',
        price: 1500,
        inStock: 3,
        image: 'https://ghs.se',
      },
      {
        id: '12343dsa',
        name: 'Pingisrack',
        details: 'Ska du bli bäst på pingis? Då är detta racket för dig.',
        price: 150,
        inStock: 8,
        image: 'https://dfsdfdjghs.se',
      },
    ]);
  });

  it('returns a list of products that match the name', () => {
    const testSearchString = 'fotboll';

    // it returns product even with small or big letter
    // it returns product even with white space
    // it returns false/message if no matching product
    // it returns false if invalid search-string
    // it returns message if product out of stock
  });
});
