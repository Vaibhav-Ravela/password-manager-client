import { useState } from "react";
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responseData = await login(username, password);
            if (responseData.isSuccess) {
                navigate('/');
            } else {
                setErrorMessage(responseData.errorMessage);
            }
        } catch (err) {
            console.log("login error:", err);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
                {(() => {
                    if (errorMessage) {
                        if (errorMessage === "invalid password") {
                            <p>Invalid Password</p>
                        } else if (errorMessage === "user not found") {
                            <p>No User Found. <a href='/register'>Register?</a></p>
                        }
                    }
                })()}
            </form>
        </div>
    );
};

export default Login;