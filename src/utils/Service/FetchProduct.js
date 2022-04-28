import { Product } from "./Product";

/**
 * Service to fetch & update products
 */
export class FetchProduct {

     /**
      * GET products
      */
    static async getProducts(resolve, loading){
        await fetch('https://fakestoreapi.com/products?limit=7')
        .then(response =>  response.json())
        .then(json =>  { 
            let productsArray = []

            //Uses the Product class to creates our clean up product array
            for(let product of json) {
                let newProduct = new Product(product, product.price)
                productsArray.push(newProduct)
            }
            //Function to get our data into our component's state
            resolve(productsArray)
            loading()
 
        })
        .catch( error => console.log(error) )
    }

    /**
     * GET a specific product based on id
     * @param {string} id Product's id retrived from path param
     * @param {function} resolve Gets the fetched data to a component
     * @returns Promise
     */
    static async getCurrentProduct(id, resolve, loading) {
        await fetch('https://fakestoreapi.com/products/'+id)
        .then(res=>res.json())
        .then(json=> {
            resolve(json) 
            loading()
            localStorage.setItem('Current product', JSON.stringify(json) )

        })
        .catch( error => console.log(error))
    }



    static updateCurrentProduct(id, product) {
        fetch(`https://fakestoreapi.com/products/${id}`,{
            method:"PUT",
            body:JSON.stringify(product)
        })
            .then(res=>res.json())
            .then(json=> {
                console.log(json)
            })
            .catch( error => console.log(error))
    }
}