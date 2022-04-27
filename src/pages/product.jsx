
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { PageHeader } from "../components/PageHeader"
import { ProductDetails } from "../components/ProductPage/ProductDetails"
import { FetchProduct } from "../utils/Service/FetchProduct"

export const ProductPage = () => {
    const {id} = useParams()
    const [currentProduct, setCurrentProduct] = useState()
    

    useEffect(() => {
        FetchProduct.getCurrentProduct(id, setCurrentProduct)

        if(currentProduct) { document.title = currentProduct.title}

    }, [])


    return(
        currentProduct && 
        <main className="page-wrapper">
            <PageHeader backButton={true} title={currentProduct.title} />
            <ProductDetails />    
        </main>
        
        
    )
}