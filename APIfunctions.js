const { collection } = require('./database');

//: Product[]  // returnerar lista med produkter vars namn matchar
async function getProducts(searchString) {
  try {
    const products = await collection('products').filter(
      searchString.toLowerCase().trim()
    );

    if (products.length === 0) {
      return undefined;
    }

    return products;
  } catch (error) {
    console.log(error);
  }
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
