const { beforeEach } = require("@jest/globals");
const { getProducts, getById } = require("./APIfunctions");
const collection = require("./collection");

const products = [
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
	{
		id: "3",
		name: "Krocketspel",
		details: "Ett härligt spel att spela på sommaren",
		price: 200,
		inStock: 5,
		image: "https://fsdkjfghskdfjghs.se",
	},
	{
		id: "4",
		name: "Innebandyklubba",
		details: "Den bästa klubban för dig och ditt bandylag",
		price: 1500,
		inStock: 3,
		image: "https://ghs.se",
	},
	{
		id: "5",
		name: "Pingisrack",
		details: "Ska du bli bäst på pingis? Då är detta racket för dig.",
		price: 150,
		inStock: 8,
		image: "https://dfsdfdjghs.se",
	},
];

jest.mock("./collection", () => () => ({
	getById: () => "mock result",
	filter: (filterString) => {
		return products.filter((product) => {
			return product.name.includes(filterString);
		});
	},
}));

describe("getProducts", () => {
	it("returns a list of products that match the name", async () => {
		const testSearchString = "Fotboll";

		const expectedResult = {
			id: "1",
			name: "Fotboll",
			details: "En boll man kan sparka på",
			price: 120,
			inStock: 20,
			image: "https://jkashdkasjdja.jpg",
		};

		const actualResult = await getProducts(testSearchString);

		expect(actualResult).toEqual(expectedResult);

		// it returns product even with small or big letter
		// it returns product even with white space
		// it returns false/message if no matching product
		// it returns false if invalid search-string
		// it returns message if product out of stock
	});
});

// describe("getById", () => {
// 	it("returns a product that matches the id", () => {
// 		const expectedResult = {
// 			id: "3",
// 			name: "Krocketspel",
// 			details: "Ett härligt spel att spela på sommaren",
// 			price: 200,
// 			inStock: 5,
// 			image: "https://fsdkjfghskdfjghs.se",
// 		};

// 		const actualResult = products.getById(3);

// 		expect(expectedResult).toEqual(actualResult);
// 	});
// });
