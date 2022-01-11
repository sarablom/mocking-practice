const { getProducts, getProductById, buyProduct } = require("./APIfunctions");
jest.mock("./database");

describe("getProducts", () => {
	it("returns a list of products that match the name", async () => {
		const testSearchString = "Fotboll";

		const filterdResult = await getProducts(testSearchString);

		expect(filterdResult).toStrictEqual([
			{
				id: "1hjjh2h2",
				name: "Fotboll",
				details: "En boll man kan sparka på",
				price: 120,
				inStock: 20,
				image: "https://jkashdkasjdja.jpg",
			},
		]);
	});

	it("returns product even with small or big letter", async () => {
		const searchString = "PINGISRACK";

		const filterdResult = await getProducts(searchString);

		expect(filterdResult).toStrictEqual([
			{
				id: "12343dsa",
				name: "Pingisrack",
				details: "Ska du bli bäst på pingis? Då är detta racket för dig.",
				price: 150,
				inStock: 8,
				image: "https://dfsdfdjghs.se",
			},
		]);
	});

	it("returns product even with white space", async () => {
		const searchString = "   FotBoll          ";

		const filterdResult = await getProducts(searchString);

		expect(filterdResult).toStrictEqual([
			{
				id: "1hjjh2h2",
				name: "Fotboll",
				details: "En boll man kan sparka på",
				price: 120,
				inStock: 20,
				image: "https://jkashdkasjdja.jpg",
			},
		]);
	});

	it("returns undefined if no matching product", async () => {
		const searchString = "Potatismos";
		const filterdResult = await getProducts(searchString);

		expect(filterdResult).toBe(undefined);
	});

	it("throws an error if searchString is not of type string", async () => {
		let searchString = ["1", "2", "3"];

		await expect(getProducts(searchString)).rejects.toThrow(
			"searchString must be a string"
		);

		searchString = 123;
		await expect(getProducts(searchString)).rejects.toThrow(
			"searchString must be a string"
		);

		searchString = null;
		await expect(getProducts(searchString)).rejects.toThrow(
			"searchString must be a string"
		);

		searchString = undefined;
		await expect(getProducts(searchString)).rejects.toThrow(
			"searchString must be a string"
		);

		searchString = NaN;
		await expect(getProducts(searchString)).rejects.toThrow(
			"searchString must be a string"
		);

		searchString = {};
		await expect(getProducts(searchString)).rejects.toThrow(
			"searchString must be a string"
		);
	});
});

describe("getProductById function", () => {
	it("returns the product object that matches the id", async () => {
		const id = "a1243arte";

		const expectedResult = {
			id: "a1243arte",
			name: "Basketboll",
			details: "En boll att kasta i en korg",
			price: 310,
			inStock: 15,
			image: "https://hjkdfksjdf.se",
		};

		const actualResult = await getProductById(id);

		expect(actualResult).toStrictEqual(expectedResult);
	});

  it('returns undefined if no object matches the id', async () => {
    const id = 'lllll';
    const expectedResult = undefined;

    const actualResult = await getProductById(id);

    expect(actualResult).toBe(expectedResult);
  })

  it('throws an error if id is not of type string', async () => {
    const id = null;

    await expect(getProductById(id)).rejects.toThrow(
			"id must be a string"
		);    
  })
});

describe('buyProducts', () => {
  it('decreases the stock value by one when someone buys a product', async () => {
    const id = '1hjjh2h2';

    const expectedResult = {
      id: "1hjjh2h2",
      name: "Fotboll",
      details: "En boll man kan sparka på",
      price: 120,
      inStock: 19,
      image: "https://jkashdkasjdja.jpg",
    }

    const actualResult = await buyProduct(id);

    expect(actualResult).toStrictEqual(expectedResult);
  })

  // it returns undefined if no object matches the id
})
