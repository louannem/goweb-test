import { Product } from "./Product";

/**
 * Service to fetch & update products
 */
export class FetchProduct {

     /**
      * GET products
      */
    static async getProducts(resolve, loading, setError){
        await fetch('https://fakestoreapi.com/products?limit=7')
        .then(response =>  response.json())
        .then(json =>  { 
            let productsArray = []

            //Uses the Product class to creates our clean up product array
            for(let product of json) {
                let newProduct = new Product(product, product.price)
                productsArray.push(newProduct)
            }
            //Get our data into our component's state, store it in localStorage & stop loading state
            resolve(productsArray)
            localStorage.setItem('Products array', JSON.stringify(json))
            loading(false) 
        })
        .catch( error => setError(true) )
    }

    /**
     * GET a specific product based on id
     * @param {string} id Product's id retrived from path param
     * @param {function} resolve Gets the fetched data to a component
     * @returns Promise
     */
    static async getCurrentProduct(id, resolve, loading, hasError) {
        await fetch('https://fakestoreapi.com/products/'+id)
        .then(res=>res.json())
        .then(json=> {
            //Get our data into our component's state, store it in localStorage & stop loading state
            resolve(json) 
            loading()
            localStorage.setItem('Current product', JSON.stringify(json) )

        })
        .catch( error => hasError(true))
    }



    /**
     * Sends an updated product
     * @param {number} id Updated product's id
     * @param {object} product Updates products to send 
     */
    static updateCurrentProduct(id, product) {
        fetch(`https://fakestoreapi.com/products/${id}`,{
            method:"PUT",
            body:JSON.stringify(product)
        })
            .then(res=>res.json())
            .then(json=> {
               //
            })
            .catch( error => console.log(error))
    }
}