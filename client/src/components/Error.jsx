import { useRouteError } from 'react-router-dom';

export default function Error() {
    const error = useRouteError();
    return (
        <div className='wrapper-normal-flow'>
            <section>
                <h1>An error occurred!</h1>
                <p>{error.message}</p>
            </section>
        </div>
    )
}
