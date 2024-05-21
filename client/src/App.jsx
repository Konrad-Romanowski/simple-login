import {
    createBrowserRouter,
    createRoutesFromElements,
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
        <Route path="/">
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
                    errorElement={<Error />}
                />
            </Route>
            <Route
                path="/login"
                element={<Login />}
                errorElement={<Error />}
                action={loginAction}
            />
            <Route
                path="/register"
                element={<Register />}
                errorElement={<Error />}
                action={registerAction}
            />
        </Route>
    )
)

export default function App() {
    return <RouterProvider router={router} />
}