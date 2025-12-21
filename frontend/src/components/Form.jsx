import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login");
            }
        } catch (err) {
            alert(err)
        } finally {
            setLoading(false)
        }

    }

    const name = method === "login" ? "Login" : "Register"

    return (
        <div>
            <form onSubmit={handleSubmit} className="form-container">
                <h1>{name}</h1>
                <input type="text"
                    className="form-input" value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Insert Username" />
                <input type="password"
                    className="form-input" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password" />

                {loading && <LoadingIndicator />}
                <button className="form-Button" type="submit">
                    {name}
                </button>
            </form>
        </div >
    )
}

export default Form



