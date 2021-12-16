// Product {
//     id: string;
//     name: string;
//     details: string;  // längre beskrivning av produkten
//     price: number;
//     inStock: number;  // antal kvar i lager
//     image?: string;   // bild-URL, valfri
// }
const { collection } = require('./database');

//: Product[]  // returnerar lista med produkter vars namn matchar
function getProducts(filter) {
    const products = await collection('products').filter(filter);
    return products;
}

// //: Product  // returnerar en produkt med ett visst id
// function getProductById(id) {}

// //: void  // drar ifrån 1 av den valda produkten från lagret
// function buyProduct(id) {}

// // lägger till en ny produkt
// function addProduct(newProduct) {}

// // ändrar en produkt genom att byta ut den
// function modifyProduct(id, updatedProduct) {}

// // tar bort en produkt från lagret
// function deleteProduct(id) {}

module.exports = { getProducts };
