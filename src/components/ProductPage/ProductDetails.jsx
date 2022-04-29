import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { FetchProduct } from "../../utils/Service/FetchProduct"
import "../../utils/styles/ProductDetails.css"
import { ProductCategory } from "../ProductCategory"
import { PriceInput } from "./PriceInput"
import { Product } from "../../utils/Service/Product"
import PropTypes from "prop-types"
import { Loading } from "../../pages/Loading"
import { Error } from "../../pages/Error"

/**
 * Products details to display
 * @returns JSX element
 */
export const ProductDetails = () => {
    //Get product id
    const param = useParams()
    const id = param.id

    //Product takes either no value or an object in localstorage as value 
    const [product, setProduct] = useState(() => {
        const saved = localStorage.getItem(`Updated product ${id}`);
        const initialValue = JSON.parse(saved);
        return initialValue || ''
    })

    const [isLoading, setLoading] = useState(true)
    const [hasError, setError] = useState(false)

    //Const to handle enabling of the update button 
    const [enableButton, setEnableButton] = useState(true)
    const input = document.querySelector('input')
    const [inputValue, setInputValue] = useState()


    let roundedPrice
    if(product.priceWithVAT) { roundedPrice = product.priceWithVAT.toFixed(2)}


    useEffect(() => {
        //Variables to store & parse localstorage datas
        let currentProduct, updatedProduct

        //First fetch if we don't have any saved data in localstorage
        if(localStorage.getItem(`Updated product ${id}`) === null) {
            FetchProduct.getCurrentProduct(id, setProduct, setLoading, setError) 
            if(product) { document.title = product.title}

            //If we do have data, we parse every needed datas
        } else if(localStorage.getItem('Current product') !== null && localStorage.getItem(`Updated product ${id}`) !== null) {
             currentProduct = JSON.parse(localStorage.getItem('Current product'))
             updatedProduct = JSON.parse(localStorage.getItem(`Updated product ${id}`))

             //Check if we are on an already saved product page, then fetch if it's not the case
             if(currentProduct.id !== updatedProduct.id) {               
                FetchProduct.getCurrentProduct(id, setProduct, setLoading, setError) 

                //If the product hasn't been updated already, we juste take add it in the array
            } else {
                
                setLoading(false)
            }
        }   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    /**
     * Function to enable/disable the update button based on current product's price
     */
    const enableButtonFunc = () => {
        //Retreives input value
        input && setInputValue(input.valueAsNumber)
            //Change disabled attribute value based on input value
            if(inputValue !== product.price) {
                setEnableButton(false) 
            } else {
            setEnableButton(true)
        }
    }


    /**
     * Function to update a product's price & keep the new info into the localstorage
     * @param {e} e 
     */
    const handleUpdateProduct = (e) => {
        e.preventDefault()

        let input = document.querySelector('input')
        let newPrice = input.valueAsNumber

        //Creates our updated product with the Product class & adds it to the component state
        let newProduct = new Product(product, newPrice)
        setProduct(newProduct)
        
        //Adds the updated product into the localstorage
        localStorage.setItem(`Updated product ${id}`, JSON.stringify(newProduct));

        //Sends the updates product infos to the API
        FetchProduct.updateCurrentProduct(id, product)

        setEnableButton(true)

    }

    if(isLoading) { return ( <Loading />)}
    if(hasError) { return (<Error />)}

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
                        <PriceInput device="€" defaultValue={product.price} checkValueFunc={enableButtonFunc} />
                            {/* Price is manually rounded for the network adress */}
                            <div className="price-with-vat"><span>Price</span> (including VAT): {roundedPrice ? roundedPrice : (product.price + product.price*0.2).toFixed(2)}€</div>
                        </div>
                        <div className="update-product">
                            <button type="submit" onClick={handleUpdateProduct} disabled={enableButton} >Update product</button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}


ProductDetails.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        image: PropTypes.string,
        description: PropTypes.string,
        category: PropTypes.string,
        price: PropTypes.number,
        priceWithVAT: PropTypes.number
    })
}