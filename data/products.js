
//import { cart } from './cart.js'
export function productGenerator(fun, page) {
  class product {

    id;
    image;
    name;
    rating;
    priceCents;

    constructor(productDetails) {

      this.id = productDetails.id
      this.image = productDetails.image
      this.name = productDetails.name
      this.rating = productDetails.rating
      this.priceCents = productDetails.priceCents

    }

  }
  class Clothing extends product {
    sizeChartLink;

    constructor(productDetails) {
      super(productDetails)
      this.sizeChartLink = productDetails.sizeChartLink;
    }

  }


  /* const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    const products = JSON.parse(xhr.response);

    products.map((productDetails) => {
      if (productDetails.type === "clothing") {
        return new Clothing(productDetails)
      }
      return new product(productDetails)
    })
    if (page === 'main') {
      fun(products)
    }
    else if (page === 'cart') {
      fun(products)
    }
    console.log(products)
  })
  xhr.addEventListener('error', (error) => {
    console.error('unexpected error. please try again later');
  })
  xhr.open('GET', 'https://supersimplebackend.dev/products')
  xhr.send() */


  const fetching = new Promise((resolve, reject) => {
    fetch('https://supersimplebackend.dev/products')

      .then((productstring) => {
        const products = productstring.json()
        resolve(products)
      }).catch(() => {
        console.error('cant able to load products')
        reject()
      })
  })
  fetching.then(
    (productsclass) => {
      productsclass.map((productDetails) => {

        //throw 'error1' /* this is for throwing errors  */

        if (productDetails.type === "clothing") {
          return new Clothing(productDetails)
        }
        return new product(productDetails)
      })
      if (page === 'main') {
        fun(productsclass)
      }
      else if (page === 'cart') {
        fun(productsclass)
        /* document.querySelector('.js-place-order')
          .addEventListener('click', () => {
            fetch('https://supersimplebackend.dev/orders', {
              method: 'POST',
              headers: {
                'Content-Type': "application/json"
              },
              body: JSON.stringify({
                cart: cart
              })
            })
          }) */
      }
      console.log(productsclass)

    }).catch(() => {
      console.error("can't able to display products")
    })

  /*   productsFromAsync()
    async function productsFromAsync() {
      try {
        const fetching = await fetch('https://supersimplebackend.dev/products')
        const products = await fetching.json()
        products.map((productDetails) => {
          if (productDetails.type === "clothing") {
            return new Clothing(productDetails)
          }
          return new product(productDetails)
        })
        if (page === 'main') {
          fun(products)
        }
        else if (page === 'cart') {
          fun(products)
        }
        console.log(products)
      }
      catch (error) {
        console.error('something went wrong')
      }
    } */


  /*  productsFromAsync()
   async function productsFromAsync() {
 
     let products;
 
     try {
       const fetching = await fetch('https://supersimplebackend.dev/products')
       products = await fetching.json()
 
     }
     catch (error) {
       console.error('something went wrong')
     }
     products.map((productDetails) => {
       if (productDetails.type === "clothing") {
         return new Clothing(productDetails)
       }
       return new product(productDetails)
     })
     if (page === 'main') {
       fun(products)
     }
     else if (page === 'cart') {
       fun(products)
     }
     console.log(products)
 
   } */
}



