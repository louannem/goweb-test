import { useState, useEffect } from "react"
import { FetchProduct } from "../../utils/Service/FetchProduct"
import "../../utils/styles/ProductsTable.css"
import { TableProductRow } from "./TableProductRow"

export const ProductsTable = () => {
    const  [products, setProducts] = useState()
    
    useEffect(() => {
        FetchProduct.getProducts(setProducts)

        document.title = "Circle Products"
    }, [])

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
