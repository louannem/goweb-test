import { useState, useEffect } from "react"
import { Error } from "../../pages/Error"
import { Loading } from "../../pages/Loading"
import { FetchProduct } from "../../utils/Service/FetchProduct"
import "../../utils/styles/ProductsTable.css"
import { TableProductRow } from "./TableProductRow"

/**
 * Table component
 * @returns JSX element
 */
export const ProductsTable = () => {
    const  [products, setProducts] = useState()
    const [isLoading, setLoading] = useState(true)
    const [hasError, setError] = useState(false)

    const getData = (data) => {
        setProducts(data)
    }

    useEffect(() => {
        document.title = "Circle Products"
    })
    
    useEffect(() => {        
        //If no fetching has been done, we fetch the products
        if(!localStorage.getItem('Products array')) { 
            FetchProduct.getProducts(getData, setLoading, setError)

        //Updates current data in localStorage
        } else { 
            //FetchProduct.getProducts(getData, changeLoading) 
            setProducts(JSON.parse(localStorage.getItem('Products array')))

            let updatedProductsArray = []

            //For each product in our localStorage array item
            for(let product of JSON.parse(localStorage.getItem('Products array'))) {

                //If the product has been updated, we update the same product in the array and add it to a new array
                if(localStorage.getItem(`Updated product ${product.id}`)) {
                    let updatedProduct = JSON.parse(localStorage.getItem(`Updated product ${product.id}`))

                    product = { ...product, price: updatedProduct.price, priceWithVAT: updatedProduct.price + updatedProduct.price*0.2}
                    updatedProductsArray.push(product)
        
                //Else, we add the default product to the array
                } else { updatedProductsArray.push(product) }

                //Then we can send the array to the component state and end the loading state
                setProducts(updatedProductsArray)
                setLoading(false)
            }
        }
    }, [])

    //Loading & error handling
    if(isLoading) { return ( <Loading />)}
    if(hasError) { return(<Error />)}

    return(
        <main>
            <table>
                <thead>
                    <tr>
                        <th>Product name</th>
                        <th className="product-category-header">Category <div className="category-filter-icon"></div></th>
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
