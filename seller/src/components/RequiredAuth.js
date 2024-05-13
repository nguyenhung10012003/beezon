import {useAuth} from "../context/AuthContext";
import {Redirect} from "react-router-dom";

export default function RequiredAuth({children}) {
    const {user} = useAuth();
    return user ? children : <Redirect to="/login"/>;
}