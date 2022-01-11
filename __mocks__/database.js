const products = [
	{
		id: "1hjjh2h2",
		name: "Fotboll",
		details: "En boll man kan sparka på",
		price: 120,
		inStock: 20,
		image: "https://jkashdkasjdja.jpg",
	},
	{
		id: "a1243arte",
		name: "Basketboll",
		details: "En boll att kasta i en korg",
		price: 310,
		inStock: 15,
		image: "https://hjkdfksjdf.se",
	},
	{
		id: "ajgffhj21",
		name: "Krocketspel",
		details: "Ett härligt spel att spela på sommaren",
		price: 200,
		inStock: 5,
		image: "https://fsdkjfghskdfjghs.se",
	},
	{
		id: "ajgfgsjsd",
		name: "Innebandyklubba",
		details: "Den bästa klubban för dig och ditt bandylag",
		price: 1500,
		inStock: 3,
		image: "https://ghs.se",
	},
	{
		id: "12343dsa",
		name: "Pingisrack",
		details: "Ska du bli bäst på pingis? Då är detta racket för dig.",
		price: 150,
		inStock: 8,
		image: "https://dfsdfdjghs.se",
	},
	{
		id: "aslkfdj114ljkf0",
		name: "Paddelrack",
		details:
			"Har du inte börjat med Paddel ännu? Då har vi det perfekta racket för dig.",
		price: 1750,
		inStock: 0,
		image: "https://paddelracketarcoolt.se",
	},
];

const collection = (db) => {
	if (db === "products") {
		return {
			filter: (searchString) => {
				return products.filter((product) => {
					return product.name.toLowerCase().trim().includes(searchString);
				});
			},
			getById: (id) => {
				return products.find((product) => product.id === id);
			},
			updateById: (id, newObject) => {
				const index = products.findIndex((product) => product.id === id);
				products[index] = newObject;
				return products[index];
			},
			add: (newObject) => {
				const productToAdd = {
					...newObject,
					id: (Math.random() * 100000).toString(),
				};
				products.push(productToAdd);
				return productToAdd;
			},
		};
	}
};

// add(newObject)  // lägger till nytt objekt
// updateById(id, newObject)  // ersätter objekt
// deleteById(id)  // tar bort objekt

module.exports = { collection };
