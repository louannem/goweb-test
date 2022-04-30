import { Link } from "react-router-dom"
import PropTypes from 'prop-types'
import "../utils/styles/PageHeader.css"
import BackButton from "../assets/Back_button.svg"


/**
 * Page's header basic component
 * @param {boolean} backButton Display or hide go back button  
 * @param {string} title Page title 
 * @returns JSX element
 */
export const PageHeader = ({backButton, title}) => {
    return(
        <header>
            {backButton && 
            <Link to="/">
                <img src={BackButton} alt="Back button" />
            </Link>
            }
            
            <h1>{title}</h1>
        </header>
    )
}

PageHeader.defaultProps = {
    backButton : false,
    title: "Product title"
}

PageHeader.propTypes = {
    backButton: PropTypes.bool,
    title: PropTypes.string
}