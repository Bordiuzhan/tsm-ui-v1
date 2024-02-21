import {Navigate, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/layout/Layout';
import {RestrictedRoute} from "./route/RestrictedRoute";
import {PrivateRoute} from "./route/PrivateRoute";
import Calendar from "./components/Calendar";
import Users from "./pages/Users";
import Customers from "./pages/Customers";
import Loads from "./pages/Loads";
import Drivers from "./pages/Drivers";
import Units from "./pages/Units";
import Trailers from "./pages/Trailers";

function App() {
    console.log("Current version:", process.env.REACT_APP_CURRENT_VERSION)
    return (<Routes>
        <Route path="/login" element={<RestrictedRoute redirectTo='/' component={<Login/>}/>}/>
        <Route path="/" element={<Layout/>}>
            <Route path="" element={<PrivateRoute redirectTo="/login" component={<Calendar/>}/>}/>

            <Route path="/users" element={<PrivateRoute redirectTo="/login" component={<Users/>}/>}/>
            <Route path="/customers" element={<PrivateRoute redirectTo="/login" component={<Customers/>}/>}>
                <Route path=":id" element={<PrivateRoute redirectTo="/login"
                                                         component={<Customers/>}/>}/>
            </Route>
            <Route path="/loads" element={<PrivateRoute redirectTo="/login" component={<Loads/>}/>}/>
            <Route path="/drivers" element={<PrivateRoute redirectTo="/login" component={<Drivers/>}/>}/>
            <Route path="/powerunits" element={<PrivateRoute redirectTo="/login" component={<Units/>}/>}/>
            <Route path="/trailers" element={<PrivateRoute redirectTo="/login" component={<Trailers/>}/>}/>
        </Route>
        <Route path="*" element={<Navigate to="/login"/>}/>
    </Routes>);
}

export default App;
