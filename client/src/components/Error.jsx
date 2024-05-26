import { useNavigate, useRouteError, Link } from 'react-router-dom';

export default function Error() {
    const error = useRouteError();
    const previousRoute = sessionStorage.previousRoute;
    console.log(previousRoute)
    return (
        <div className='wrapper-normal-flow'>
            <section>
                <h1>An error occurred!</h1>
                <p>{error.message}</p>
                <br />
                <Link to="/">
                        &#8592; <span>back to Home</span>
                </Link>
            </section>
        </div>
    )
}
