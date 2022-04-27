import "../utils/styles/PageHeader.css"

/**
 * Page's header basic component
 * @param {string} title Page title 
 * @returns JSX element
 */
export const PageHeader = ({title}) => {
    return(
        <header>
            <h1>{title}</h1>
        </header>
    )
}