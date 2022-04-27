import PropTypes from 'prop-types'

/**
 * Product's category component. The background color changes on category's value
 * @param {category} string
 * @returns JSX element
 */
export const ProductCategory = ({category}) => {
    return(
        <div className={`product-category  ${category === "men's clothing" ? "orange-category" : category === "jewelery" ? "green-category" : ""}`}>{category}</div>
    )
}

ProductCategory.propTypes = {
    category: PropTypes.string
}