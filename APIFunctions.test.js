const { beforeEach } = require("@jest/globals");
const { getProducts, getById } = require("./APIfunctions");
const collection = require("./collection");
jest.mock("./collection");

describe("getProducts", () => {
	it("returns a list of products that match the name", async () => {
		const testSearchString = "Fotboll";

		const expectedResult = [
			{
				id: "1",
				name: "Fotboll",
				details: "En boll man kan sparka på",
				price: 120,
				inStock: 20,
				image: "https://jkashdkasjdja.jpg",
			},
		];

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
