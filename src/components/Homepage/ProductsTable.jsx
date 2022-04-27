import { useState, useEffect, useReducer } from "react"
import { FetchProduct } from "../../utils/Service/FetchProduct"
import { initialState, productsReducer } from "../../utils/store/reducer"
import "../../utils/styles/ProductsTable.css"
import { TableProductRow } from "./TableProductRow"

export const ProductsTable = () => {
    const  [products, setProducts] = useState()
    const [state, dispatch] = useReducer(productsReducer, initialState)
    
    useEffect(() => {
        FetchProduct.getProducts(setProducts, dispatch)
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
