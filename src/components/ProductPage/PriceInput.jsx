import "../../utils/styles/PriceInput.css"

export const PriceInput = ({device, defaultValue}) => {
    return(
        <form>
            <label htmlFor="price-input"></label>
            <span>{device}</span>
            <input type="number" defaultValue={defaultValue} id="price-input" />
        </form>
    )
}