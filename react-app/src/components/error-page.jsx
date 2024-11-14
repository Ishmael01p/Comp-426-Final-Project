import { useRouteError } from "react-router-dom"

export default function ErrorPage() {
    const error = useRouteError(); //returns the most recent error
    console.error(error)
    return(
        <div id="error-page">
            <h2> Oh Nooo! </h2>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    )
}