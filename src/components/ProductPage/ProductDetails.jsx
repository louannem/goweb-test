import "../../utils/styles/ProductDetails.css"
import { ProductCategory } from "../ProductCategory"

/**
 * Products details to display
 * @param {object} product Product's datas fetched & passed by the parent component
 * @returns JSX element
 */
export const ProductDetails = ({product}) => {
    //Limits the number of decimals in prices including VAT
    const priceWithVAT = product.price + product.price*0.2

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

    return(
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
                                <input type="text" defaultValue={product.price} id="price-input"  onKeyUp={enabledButton} ></input>
                            </form>
                            <div className="price-with-vat"><span>Price</span> (including VAT): {priceWithVAT.toFixed(2)}€</div>
                        </div>
                        <div className="update-product">
                            <button type="submit" disabled>Update product</button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}
