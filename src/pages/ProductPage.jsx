
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { PageHeader } from "../components/PageHeader"
import { ProductDetails } from "../components/ProductPage/ProductDetails"
import { FetchProduct } from "../utils/Service/FetchProduct"
import { Loading } from "./Loading"

/**
 * Product page
 * @returns JSX element
 */
export const ProductPage = () => {
    //Get product's id
    const {id} = useParams()
    const [currentProduct, setCurrentProduct] = useState()

    const [isLoading, setLoading] = useState(true)
    const [hasError, setError] = useState(false)


    useEffect(() => {
        FetchProduct.getCurrentProduct(id, setCurrentProduct, setLoading, setError)
        if(currentProduct) { document.title = currentProduct.title}
     // eslint-disable-next-line
    }, [])


    if(isLoading) { return (<Loading />)}
    if(hasError) { return (<span>Opps ! an error has occured.</span>)}

    return(
        currentProduct && 
        <main className="page-wrapper">
            <PageHeader backButton={true} title={currentProduct.title} />
            <ProductDetails />    
        </main>
    )
}