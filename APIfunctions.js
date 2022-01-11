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
        throw new Error(error)
    }
	
}

// //: void  // drar ifrån 1 av den valda produkten från lagret

/*
1. Hämta produkten
2. Skapa en updatedProduct - ett nytt objekt som vi vill uppdatera
3. Där drar vi även av en ur lagret
*/
async function buyProduct(id) {

    const product = await collection('products').getById(id);
    const newProduct = {...product, inStock: product.inStock -1};
    
    const updatedProduct = await collection('products').updateById(id, newProduct);

    return updatedProduct;
}

// // lägger till en ny produkt
// function addProduct(newProduct) {}

// // ändrar en produkt genom att byta ut den
// function modifyProduct(id, updatedProduct) {}

// // tar bort en produkt från lagret
// function deleteProduct(id) {}

module.exports = { getProducts, getProductById, buyProduct };
