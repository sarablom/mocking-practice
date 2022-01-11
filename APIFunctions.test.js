const {
	getProducts,
	getProductById,
	buyProduct,
	addProduct,
} = require("./APIfunctions");
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

	it("returns undefined if no object matches the id", async () => {
		const id = "lllll";
		const expectedResult = undefined;

		const actualResult = await getProductById(id);

		expect(actualResult).toBe(expectedResult);
	});

	it("throws an error if id is not of type string", async () => {
		const id = null;

		await expect(getProductById(id)).rejects.toThrow("id must be a string");
	});
});

describe("buyProducts", () => {
	it("decreases the stock value by one when someone buys a product", async () => {
		const id = "1hjjh2h2";

		const expectedResult = {
			id: "1hjjh2h2",
			name: "Fotboll",
			details: "En boll man kan sparka på",
			price: 120,
			inStock: 19,
			image: "https://jkashdkasjdja.jpg",
		};

		const actualResult = await buyProduct(id);

		expect(actualResult).toStrictEqual(expectedResult);
	});

	it("returns undefined if no object matches the id", async () => {
		const id = "kalaspuff321";
		const expectedResult = undefined;

		const actualResult = await buyProduct(id);
		expect(actualResult).toBe(expectedResult);
	});

	it("throws error if inStock is below 1", async () => {
		const id = "aslkfdj114ljkf0";

		await expect(buyProduct(id)).rejects.toThrow("out of stock");
	});
});

describe("function addProduct", () => {
	it("adds a product to the database", async () => {
		const productsBefore = await getProducts("");
		const productsBeforeLength = productsBefore.length;

		const newProduct = {
			name: "Bowlingklot",
			details: "Den gör ont att få på tårna",
			price: 999,
			inStock: 10,
			image: "https://sdfsdfs.jpg",
		};

		await addProduct(newProduct);

		const productsAfterAdding = await getProducts("");

		expect(productsAfterAdding.length).toBe(productsBeforeLength + 1);
	});

	it("throws an error if name is missing", async () => {
		const newProduct = {
			details: "Den gör ont att få på tårna",
			price: 999,
			inStock: 15,
			image: "https://sdfsdfs.jpg",
		};

		await expect(addProduct(newProduct)).rejects.toThrow(
			"name is missing or not of type string"
		);
	});

	it("throws an error if name is not of type string", async () => {
		const newProduct = {
			name: 123,
			details: "Den gör ont att få på tårna",
			price: 999,
			inStock: 15,
			image: "https://sdfsdfs.jpg",
		};

		await expect(addProduct(newProduct)).rejects.toThrow(
			"name is missing or not of type string"
		);
	});

	it("throws an error if price is missing", async () => {
		const newProduct = {
			name: "Bowlingklot",
			details: "Den gör ont att få på tårna",
			inStock: 15,
			image: "https://sdfsdfs.jpg",
		};

		await expect(addProduct(newProduct)).rejects.toThrow(
			"price is missing or not of type number"
		);
	});

	it("throws an error if price is not of type number", async () => {
		const newProduct = {
			name: "Bowlingklot",
			details: "Den gör ont att få på tårna",
			price: "Hejhopp",
			inStock: 15,
			image: "https://sdfsdfs.jpg",
		};

		await expect(addProduct(newProduct)).rejects.toThrow(
			"price is missing or not of type number"
		);
	});

	it("throws an error if details is missing", async () => {
		const newProduct = {
			name: "Bowlingklot",
			price: 599,
			inStock: 15,
			image: "https://sdfsdfs.jpg",
		};

		await expect(addProduct(newProduct)).rejects.toThrow(
			"details is missing or not of type string"
		);
	});

	it("throws an error if details is not of type string", async () => {
		const newProduct = {
			name: "Bowlingklot",
			details: [],
			price: 599,
			inStock: 15,
			image: "https://sdfsdfs.jpg",
		};

		await expect(addProduct(newProduct)).rejects.toThrow(
			"details is missing or not of type string"
		);
	});

	it("throws an error if inStock is missing", async () => {
		const newProduct = {
			name: "Bowlingklot",
			details: "Den gör ont att få på tårna",
			price: 599,
			image: "https://sdfsdfs.jpg",
		};

		await expect(addProduct(newProduct)).rejects.toThrow(
			"inStock is missing or not of type number"
		);
	});

	it("throws an error if inStock is not of type number", async () => {
		const newProduct = {
			name: "Bowlingklot",
			details: "Den gör ont att få på tårna",
			price: 599,
			inStock: {},
			image: "https://sdfsdfs.jpg",
		};

		await expect(addProduct(newProduct)).rejects.toThrow(
			"inStock is missing or not of type number"
		);
	});
});
