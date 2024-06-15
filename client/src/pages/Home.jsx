import { useOutletContext } from "react-router-dom"

export default function Home() {
    const userContext = useOutletContext();
    return (
        <div className="wrapper-normal-flow">
            <section className="home-container">
                {userContext ? <h1>Hello {userContext.user?.username}!</h1> : <h1>Hello!</h1>}
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis sapiente soluta unde explicabo voluptatum, vel iure ex facere corrupti vero aut quisquam a enim illo nam dignissimos aperiam doloribus error.</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis laborum exercitationem corporis, nobis itaque maxime praesentium laudantium alias, tenetur, voluptatem qui architecto quia ea voluptates hic quod nam ducimus sequi quis neque voluptatum ipsum? Recusandae id officiis porro? Facere facilis deleniti tempora hic, doloremque aut vel minima earum sint commodi!</p>
            </section>
        </div>
    )
}