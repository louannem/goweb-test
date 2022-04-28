/**
 * Error component
 * @returns JSX element
 */
export const Error = () => {
    const refreshPage = () => { window.location.reload(false)}
    return(
        <div className="page-wrapper error-page">
            <span>Opps ! An error has occured.</span>
            <button onClick={refreshPage}>Try again</button>
        </div>
    )
}