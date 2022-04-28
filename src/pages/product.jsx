
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { PageHeader } from "../components/PageHeader"
import { ProductDetails } from "../components/ProductPage/ProductDetails"
import { FetchProduct } from "../utils/Service/FetchProduct"
import { Loading } from "./Loading"

export const ProductPage = () => {
    const {id} = useParams()
    const [currentProduct, setCurrentProduct] = useState()

    const [isLoading, setLoading] = useState(true)

    const changeLoading = () => {
        setLoading(false)
    }

    

    useEffect(() => {
        FetchProduct.getCurrentProduct(id, setCurrentProduct, changeLoading)

        if(currentProduct) { document.title = currentProduct.title}

    }, [])


    if(isLoading) { return (<Loading />)}
    return(
        currentProduct && 
        <main className="page-wrapper">
            <PageHeader backButton={true} title={currentProduct.title} />
            <ProductDetails />    
        </main>
        
        
    )
}