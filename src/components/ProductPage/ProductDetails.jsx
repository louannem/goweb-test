import "../../utils/styles/ProductDetails.css"
import { ProductCategory } from "../ProductCategory"

export const ProductDetails = ({article}) => {
    return(
        <article className="article-wrapper">
            <div className="article-image">
                <img  alt="Product" src={article.img} />
            </div>
            

            <div className="article-details-wrapper">
                <div className="article-description-category">
                    <div className="article-description">
                        <h2>Description</h2>
                        <p>{article.description}</p>
                    </div>

                    <div className="article-category">
                        <h2>Category</h2>
                        <ProductCategory category={article.category} />
                        
                    </div>
                </div>

                <div className="article-price">
                    <h2>Price</h2>
                    <div className="article-price-wrapper">
                        <div className="price-info-wrapper">
                            <form>
                                <label for="price-input"></label>
                                <input id="price-input" placeholder={article.price}></input>
                            </form>
                            <div className="price-with-vat"><span>Price</span> (including VAT): {article.price + article.price*0.2}€</div>
                        </div>
                        <div className="update-product">
                            <button type="submit">Update product</button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}
