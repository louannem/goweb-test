/**
 * Service to fetch & update products
 */
export class FetchProduct {
    constructor(object) {
        this.id = object.id;
        this.title = object.title
     }

     /**
      * GET products
      */
    static async getProducts(resolve){
        await fetch('https://fakestoreapi.com/products?limit=7')
        .then(response =>  response.json())
        .then(json =>  { resolve(json) })
        .catch( error => console.log(error.message) )
    }

    /**
     * GET a specific product based on id
     * @param {string} id Product's id retrived from path param
     * @param {function} resolve Gets the fetched data to a component
     * @returns Promise
     */
    static async getCurrentProduct(id, resolve) {
        let product = await fetch('https://fakestoreapi.com/products/'+id)
        .then(res=>res.json())
        .then(json=> {
            resolve(json) 
            return json 
        })
        
        return product
    }
}