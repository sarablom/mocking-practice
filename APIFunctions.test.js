const { beforeEach } = require("@jest/globals");
const { getProducts, getById } = require("./APIfunctions");
const collection = require("./collection");
jest.mock("./collection");

describe("getProducts", () => {
	it("returns a list of products that match the name", async () => {
		const searchString = "boll";

		const expectedResult = [
			{
				id: "1",
				name: "Fotboll",
				details: "En boll man kan sparka på",
				price: 120,
				inStock: 20,
				image: "https://jkashdkasjdja.jpg",
			},
			{
				id: "2",
				name: "Basketboll",
				details: "En boll att kasta i en korg",
				price: 310,
				inStock: 15,
				image: "https://hjkdfksjdf.se",
			},
		];

		const actualResult = await getProducts(searchString);

		expect(actualResult).toEqual(expectedResult);
	});

	it("returns correct result no matter the combination of upper and lowercase letters", async () => {
		const searchString = "pINGisRACK";

		const expectedResult = [
			{
				id: "5",
				name: "Pingisrack",
				details: "Ska du bli bäst på pingis? Då är detta racket för dig.",
				price: 150,
				inStock: 8,
				image: "https://dfsdfdjghs.se",
			},
		];

		const actualResult = await getProducts(searchString);

		expect(actualResult).toEqual(expectedResult);
	});

	it("returns correct result even with trailing or leading whitespace", async () => {
		const searchString = "   innebandyklubba  ";

		const expectedResult = [
			{
				id: "4",
				name: "Innebandyklubba",
				details: "Den bästa klubban för dig och ditt bandylag",
				price: 1500,
				inStock: 3,
				image: "https://ghs.se",
			},
		];

		const actualResult = await getProducts(searchString);

		expect(actualResult).toEqual(expectedResult);
	});

	// it returns product even with white space
	// it returns false/message if no matching product
	// it returns false if invalid search-string
	// it returns message if product out of stock
});
