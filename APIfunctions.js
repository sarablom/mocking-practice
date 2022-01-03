const collection = require("./collection");

// Product {
//     id: string;
//     name: string;
//     details: string;  // längre beskrivning av produkten
//     price: number;
//     inStock: number;  // antal kvar i lager
//     image?: string;   // bild-URL, valfri
// }

//: Product[]  // returnerar lista med produkter vars namn matchar
async function getProducts(filterString) {
	try {
		const products = await collection("products").filter(
			filterString.trim().toLowerCase()
		);
		return products;
	} catch (exception) {
		console.log(exception);
	}
}

// //: Product  // returnerar en produkt med ett visst id
async function getProductById(id) {
	const product = await collection("products").getById(1);
	return product;
}

// //: void  // drar ifrån 1 av den valda produkten från lagret
// function buyProduct(id) {}

// // lägger till en ny produkt
// function addProduct(newProduct) {}

// // ändrar en produkt genom att byta ut den
// function modifyProduct(id, updatedProduct) {}

// // tar bort en produkt från lagret
// function deleteProduct(id) {}

module.exports = { getProducts, getProductById };
