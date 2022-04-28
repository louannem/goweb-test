import { useState, useEffect } from "react"
import { Loading } from "../../pages/Loading"
import { FetchProduct } from "../../utils/Service/FetchProduct"
import "../../utils/styles/ProductsTable.css"
import { TableProductRow } from "./TableProductRow"

export const ProductsTable = () => {
    const  [products, setProducts] = useState()
    const [isLoading, setLoading] = useState(true)

    const changeLoading = () => {
        setLoading(false)
    }

    const getData = (data) => {
        setProducts(data)
    }
    
    useEffect(() => {
        document.title = "Circle Products"

        
        //If no fetching has been done, we fetch the products
        if(!localStorage.getItem('Products array')) { 
            FetchProduct.getProducts(getData, changeLoading)

        //Updates current data in localStorage
        } else { 
            //FetchProduct.getProducts(getData, changeLoading) 
            setProducts(JSON.parse(localStorage.getItem('Products array')))

            let updatedProductsArray = []

            for(let product of JSON.parse(localStorage.getItem('Products array'))) {
                if(localStorage.getItem(`Updated product ${product.id}`)) {
                    let updatedProduct = JSON.parse(localStorage.getItem(`Updated product ${product.id}`))

                    product = { ...product, price: updatedProduct.price, priceWithVAT: updatedProduct.price + updatedProduct.price*0.2}
                    updatedProductsArray.push(product)
                    setProducts(updatedProductsArray)
                    setLoading(false)
                    //console.log(products)
                }
            }
        }

    }, [])

    if(isLoading) { return ( <Loading />)}
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
