import { useEffect, useState, useReducer } from "react"
import { useParams } from "react-router-dom"
import { initialState, productsReducer } from "../../utils/store/reducer"
import { FetchProduct } from "../../utils/Service/FetchProduct"
import "../../utils/styles/ProductDetails.css"
import { ProductCategory } from "../ProductCategory"

/**
 * Products details to display
 * @param {object} product Product's datas fetched & passed by the parent component
 * @returns JSX element
 */
export const ProductDetails = () => {
    const [product, setProduct] = useState(() => {
        const saved = localStorage.getItem("Updated product");
        const initialValue = JSON.parse(saved);
        return initialValue || ''
    })
    const [state, dispatch] = useReducer(productsReducer, initialState)


    useEffect(() => {
        //Datas will get fetched if we don't have any stored locally
        if(localStorage.getItem('Updated product') === null) { FetchProduct.getCurrentProduct(id, setProduct, dispatch) } 

        //Once we have fetched the data, they get added to the localStorage
        product && localStorage.setItem('Current product', product )
        
    }, [])

    //Get product id
    const param = useParams()
    const id = param.id



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

        let newProduct = {
            id: product.id,
            title : product.title,
            description: product.description,
            image: product.image,
            category: product.category,
            price: newPrice,
            pricewithVAT: newPrice + newPrice*0.2
        }

        setProduct(newProduct)
        dispatch({type: "updated_product", payload: newProduct})
        localStorage.setItem("Updated product", JSON.stringify(newProduct));

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
