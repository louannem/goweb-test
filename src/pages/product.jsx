
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
    }, [])


    return(
        currentProduct && 
        <main className="page-wrapper">
            <PageHeader title={currentProduct.title} />
            <ProductDetails  product={currentProduct}/>    
        </main>
        
        
    )
}