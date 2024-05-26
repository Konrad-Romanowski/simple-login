import {
    createBrowserRouter,
    createRoutesFromElements,
    redirect,
    Route,
    RouterProvider
} from 'react-router-dom';
import Layout, {loader as layoutLoader} from './layouts/Layout';
import Login, {action as loginAction} from './pages/Login';
import Register, {action as registerAction} from './pages/Register';
import Home from './pages/Home';
import requireAuth from './auth/requireAuth';
import Error from './components/Error';
import User, {loader as userLoader} from './pages/User';
import Protected from './pages/Protected';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            errorElement={<Error />} 
        >
            <Route element={<Layout />} loader={layoutLoader}>
                <Route index element={<Home />} />
                <Route
                    path="protected"
                    element={<Protected />}
                    loader={()=> requireAuth()}
                />
                <Route
                    path="user/:id"
                    element={<User />}
                    loader={userLoader}
                />
            </Route>
            <Route
                path="/login"
                element={<Login />}
                action={loginAction}
            />
            <Route
                path="/register"
                element={<Register />}
                action={registerAction}
            />
            <Route 
                path="*"
                loader={()=>redirect('/')}
            />
        </Route>
    )
)

export default function App() {
    return <RouterProvider router={router} />
}