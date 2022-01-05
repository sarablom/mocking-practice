const { beforeEach } = require("@jest/globals");
const { getProducts } = require("./APIfunctions");
const httpMocks = require("node-mocks-http");
const products = require("./mock-data/products.json");

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe("getProducts", () => {
  it("returns product from database that match the name", async () => {
    const testSearchString = "Fotboll";

    const filterdResult = await getProducts(testSearchString, products);

    expect(filterdResult).toBe(true);
  });

  it("returns false/message if no matching product", async () => {
    const testSeachString = "Banana";
    const filterResult = await getProducts(testSeachString, products);

    expect(filterResult).toBe(false);
  }) 



  // it returns product even with small or big letter
  // it returns product even with white space 
  // it returns false if invalid search-string
  // it returns message if product out of stock
});
