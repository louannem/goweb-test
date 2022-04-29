import "../../utils/styles/PriceInput.css"

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
            <input type="number" defaultValue={defaultValue} id="price-input" onKeyDown={preventReload}  onKeyUp={checkValueFunc} />
        </form>
    )
}