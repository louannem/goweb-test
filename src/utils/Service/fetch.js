
const BASE_URL = 'https://fakestoreapi.com/products?limit=7'
export let productsArray
export default async function fetchProducts() {
    const response = await fetch(BASE_URL)
    const data = response.json()
    return data
}



