import { useEffect, useState, useReducer } from "react"
import { useParams } from "react-router-dom"
import { initialState, productsReducer } from "../../utils/store/reducer"
import { FetchProduct } from "../../utils/Service/FetchProduct"
import "../../utils/styles/ProductDetails.css"
import { ProductCategory } from "../ProductCategory"
import { Product } from "../../utils/Service/Product"

/**
 * Products details to display
 * @param {object} product Product's datas fetched & passed by the parent component
 * @returns JSX element
 */
export const ProductDetails = () => {
    //Get product id
    const param = useParams()
    const id = param.id

    //producct takes either no value or an object in localstorage as value 
    const [product, setProduct] = useState(() => {
        const saved = localStorage.getItem(`Updated product ${id}`);
        const initialValue = JSON.parse(saved);
        return initialValue || ''
    })
    const [state, dispatch] = useReducer(productsReducer, initialState)

    useEffect(() => {
        //Variables to store & parse localstorage datas
        let currentProduct, updatedProduct

        //First fetch if we don't have any saved data in localstorage
        if(localStorage.getItem(`Updated product ${id}`) === null) {
            FetchProduct.getCurrentProduct(id, setProduct) 

            //If we do have data, we parse every needed datas
        } else if(localStorage.getItem('Current product') !== null && localStorage.getItem(`Updated product ${id}`) !== null) {
             currentProduct = JSON.parse(localStorage.getItem('Current product'))
             updatedProduct = JSON.parse(localStorage.getItem(`Updated product ${id}`))

             //Check if we are on an already saved product page, then fetch
             if(currentProduct.id !== updatedProduct.id) {               
                FetchProduct.getCurrentProduct(id, setProduct) 
            } 
        }        
        
    }, [])





    /**
     * Enabled submit button after the price has been changed in the input
     * @param {event} e 
     */
    const enabledButton = (e) => { 
        const submitBtn = document.querySelector('button[type="submit"]')

        if(e.target.value === product.price) { 
            submitBtn.disabled = true
        } else { submitBtn.disabled = false }
    } 


    const handleUpdateProduct = (e) => {
        e.preventDefault()
        let input = document.querySelector('input')
        let newPrice = input.valueAsNumber



        let newProduct = new Product(product, newPrice)
        setProduct(newProduct)
        
        localStorage.setItem(`Updated product ${id}`, JSON.stringify(newProduct));

        FetchProduct.updateCurrentProduct(id, product)
    }

    return(
        product && 
        <article className="article-wrapper">
            <div className="article-image">
                <img  alt="Product" src={product.image} />
            </div>
            

            <div className="article-details-wrapper">
                <div className="article-description-category">
                    <div className="article-description">
                        <h2>Description</h2>
                        <p>{product.description}</p>
                    </div>

                    <div className="article-category">
                        <h2>Category</h2>
                        <ProductCategory category={product.category} />
                        
                    </div>
                </div>

                <div className="article-price">
                    <h2>Price</h2>
                    <div className="article-price-wrapper">
                        <div className="price-info-wrapper">
                            <form>
                                <label htmlFor="price-input"></label>
                                <input type="number" defaultValue={product.price} id="price-input"  onKeyUp={enabledButton} ></input>
                            </form>
                            <div className="price-with-vat"><span>Price</span> (including VAT): {product.price + product.price*0.2}€</div>
                        </div>
                        <div className="update-product">
                            <button type="submit" onClick={handleUpdateProduct}>Update product</button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}
