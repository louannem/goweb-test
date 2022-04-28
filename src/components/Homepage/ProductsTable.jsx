import { useState, useEffect } from "react"
import { FetchProduct } from "../../utils/Service/FetchProduct"
import "../../utils/styles/ProductsTable.css"
import { TableProductRow } from "./TableProductRow"

export const ProductsTable = () => {
    const  [products, setProducts] = useState()
    const [isLoading, setLoading] = useState(true)

    
    useEffect(() => {
        document.title = "Circle Products"

        FetchProduct.getProducts(setProducts, setLoading)
       
        
        if(products) {
            let updatedProductsArray = []
            for(let product of products) {
                
                if(localStorage.getItem(`Updated product ${product.id}`)) {
                    let updatedProduct = JSON.parse(localStorage.getItem(`Updated product ${product.id}`))
                
                    product = { ...product, price: updatedProduct.price, priceWithVAT: updatedProduct.price + updatedProduct.price*0.2}
                    updatedProductsArray.push(product)
                    setProducts(updatedProductsArray)

                } 
            }
        }
    }, [])

    if(isLoading) { return ( <span>Loading...</span>)}
    return(
        <main>
            <table>
                <thead>
                    <tr>
                        <th>Product name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Price <span>(including VAT)</span></th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map(product => (
                        <TableProductRow key={product.id} product={product}  />
                    ))}
                </tbody>
            </table>
        </main>
    )
}
