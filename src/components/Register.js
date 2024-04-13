import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { usernameAvailability, register } = useAuth();
    const [username, setUsername] = useState('');
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);
    const [password, setPassword] = useState('');
    const [retype_password, setRetypePassword] = useState('');
    const [isPasswordMatched, setIsPasswordMatched] = useState(null);
    const navigate = useNavigate();

    const checkUsernameAvailability = async (e) => {
        try {
            const isAvailable = await usernameAvailability(e.target.value);
            setIsUsernameAvailable(isAvailable);
        } catch (err) {
            console.log("usernameAvailability error:", err);
        }
    };

    const handleRetypePasswordChange = (e) => {
        const value = e.target.value;
        setIsPasswordMatched(password === value);
        setRetypePassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isPasswordMatched && isUsernameAvailable) {
            //checksum
            try {
                await register(username, password);
                navigate('/');
            } catch (err) {
                console.log("register error:", err);
            }
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Set Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onBlur={checkUsernameAvailability}
                    />
                </div>
                <div>
                    <label htmlFor="password">Set Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="retype_password">Retype Password:</label>
                    <input
                        type="password"
                        id="retype_password"
                        value={retype_password}
                        onChange={handleRetypePasswordChange}
                    />
                </div>
                <button type="submit">Register</button>
                {isUsernameAvailable && isUsernameAvailable.value === false && <p>Username is not available.</p>}
                {isPasswordMatched && isPasswordMatched.value === false && <p>Password didn't matched.</p>}
            </form>
        </div>
    );
};

export default Register;
