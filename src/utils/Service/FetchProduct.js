export class FetchProduct {
    constructor() { }

    static getProducts(){
        return fetch('https://fakestoreapi.com/products?limit=7')
        .then(response =>  response.json())
        .then(json =>  console.log(json))
        .catch( error => console.log(error.message) )
    }

    static getCurrentProduct(id) {
        return fetch('https://fakestoreapi.com/products/'+id)
        .then(res=>res.json())
        .then(json=>console.log(json))
    }
}