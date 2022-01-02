const { beforeEach } = require('@jest/globals');
const { getProducts } = require('./APIfunctions');
const httpMocks = require('node-mocks-http');
const products = require('./mock-data/products.json');

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
})

describe('getProducts', () => {
  
  it('returns product from database that match the name', async () => {
    const testSearchString = 'Fotboll';

    const filterdResult = await getProducts(testSearchString, products);

    expect(filterdResult).toBe({
      id: '1hjjh2h2',
      name: 'Fotboll',
      details: 'En boll man kan sparka på',
      price: 120,
      inStock: 20,
      image: 'https://jkashdkasjdja.jpg',
    });
  });

  // it returns product even with small or big letter
  // it returns product even with white space
  // it returns false/message if no matching product
  // it returns false if invalid search-string
  // it returns message if product out of stock
});
