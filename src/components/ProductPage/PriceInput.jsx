import "../../utils/styles/PriceInput.css"

/**
 * Input component to modify product's price
 * @param {string} device Money device
 * @param {number} defaultValue Product's current value
 * @param {function} checkValueFunc Function to check product's new value
 * @returns JSX element
 */
export const PriceInput = ({device, defaultValue, checkValueFunc}) => {
    const preventReload = (e) => {
        if(e.keyCode === 13) {
            e.preventDefault()
        }
    }
    return(
        <form>
            <label htmlFor="price-input" style={{display: "none"}}>Label</label>
            <span>{device}</span>
            <input type="number" defaultValue={defaultValue} id="price-input" onKeyDown={preventReload} onKeyUp={checkValueFunc} />
        </form>
    )
}