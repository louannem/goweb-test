import { useState, useEffect } from "react"
import "../../utils/styles/ProductsTable.css"
import { TableProductRow } from "./TableProductRow"

export const ProductsTable = () => {
    const  [products, setProducts] = useState()
    useEffect(() => {
        fetch('https://fakestoreapi.com/products?limit=7')
        .then(res=>res.json())
        .then(json=>{
            console.log(json)
            setProducts(json)
            return json
        })

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
