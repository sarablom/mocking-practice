const { collection } = require("./database");

//: Product[]  // returnerar lista med produkter vars namn matchar
async function getProducts(searchString) {
	try {
		if (typeof searchString !== "string") {
			throw new Error("searchString must be a string");
		}

		const products = await collection("products").filter(
			searchString.toLowerCase().trim()
		);

		if (products.length === 0) {
			return undefined;
		}

		return products;
	} catch (error) {
		throw new Error(error);
	}
}

// //: Product  // returnerar en produkt med ett visst id
async function getProductById(id) {
	try {
		if (typeof id !== "string") {
			throw new Error("id must be a string");
		}

		const product = await collection("products").getById(id);
		return product;
	} catch (error) {
		throw new Error(error);
	}
}

// //: void  // drar ifrån 1 av den valda produkten från lagret

/*
1. Hämta produkten
2. Skapa en updatedProduct - ett nytt objekt som vi vill uppdatera
3. Där drar vi även av en ur lagret
*/
async function buyProduct(id) {
	try {
		const product = await collection("products").getById(id);

		if (!product) {
			return undefined;
		}

		if (product.inStock <= 0) {
			throw new Error("out of stock");
		}
		const newProduct = { ...product, inStock: product.inStock - 1 };

		const updatedProduct = await collection("products").updateById(
			id,
			newProduct
		);

		return updatedProduct;
	} catch (error) {
		throw new Error(error);
	}
}

// // lägger till en ny produkt
async function addProduct(newProduct) {
	try {
		if (!newProduct.name || typeof newProduct.name !== "string") {
			throw new Error("name is missing or not of type string");
		} else if (!newProduct.price || typeof newProduct.price !== "number") {
			throw new Error("price is missing or not of type number");
		} else if (!newProduct.details || typeof newProduct.details !== "string") {
			throw new Error("details is missing or not of type string");
		} else if (!newProduct.inStock || typeof newProduct.inStock !== "number") {
			throw new Error("inStock is missing or not of type number");
		}

		const addedProduct = await collection("products").add(newProduct);
		return addedProduct;
	} catch (error) {
		throw new Error(error);
	}
}

// ändrar en produkt genom att byta ut den
async function modifyProduct(id, updatedProduct) {
    const product = await collection('products').getById(id);
    const newProduct = {...product, ...updatedProduct}
    return newProduct;
}

// // tar bort en produkt från lagret
// function deleteProduct(id) {}

module.exports = { getProducts, getProductById, buyProduct, addProduct, modifyProduct };
