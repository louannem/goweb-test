
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { PageHeader } from "../components/PageHeader"
import { ProductDetails } from "../components/ProductPage/ProductDetails"
import { FetchProduct } from "../utils/Service/FetchProduct"

export const ProductPage = () => {
    const {id} = useParams()
    //const [currentProduct, setCurrentProduct] = useState({})

    const currentProduct = FetchProduct.getCurrentProduct(id)

    useEffect(() => {
        //setCurrentProduct(FetchProduct.getCurrentProduct(id))

    }, [])

    const article= {
        title:"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        category: "men's clothing",
        description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        price: 5
    }

    return(
        <main className="page-wrapper">
            <PageHeader title={currentProduct.title} />
            {currentProduct && <ProductDetails  article={currentProduct}/>}
            
        </main>
        
    )
}