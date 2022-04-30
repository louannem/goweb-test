import { PageHeader } from "../components/PageHeader"
import { ProductsTable } from "../components/Homepage/ProductsTable"


export const Home = () => {
    return(
        <section className="page-wrapper">
            <PageHeader title="Products management" />
            <ProductsTable />
        </section>
        
    )
}