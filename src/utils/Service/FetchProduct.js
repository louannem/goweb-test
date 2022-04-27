import { Product } from "./Product";

/**
 * Service to fetch & update products
 */
export class FetchProduct {
    constructor(object) {

    }

     /**
      * GET products
      */
    static async getProducts(resolve, dispatch){
        await fetch('https://fakestoreapi.com/products?limit=7')
        .then(response =>  response.json())
        .then(json =>  { 
            resolve(json) ; 
            dispatch({type: 'get_products', payload: json})
        })
        .catch( error => console.log(error.message) )
    }

    /**
     * GET a specific product based on id
     * @param {string} id Product's id retrived from path param
     * @param {function} resolve Gets the fetched data to a component
     * @returns Promise
     */
    static async getCurrentProduct(id, resolve, dispatch) {
        await fetch('https://fakestoreapi.com/products/'+id)
        .then(res=>res.json())
        .then(json=> {
            resolve(json) ;
            dispatch({type: 'current_product', payload: json})
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