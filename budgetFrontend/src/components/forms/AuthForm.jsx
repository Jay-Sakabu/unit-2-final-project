import { useState, useContext } from "react";
import api from "../api-axios/api";
import { AuthContext } from "../auth-context/AuthContext";

const AuthForm = () => {
    const { login } = useContext(AuthContext);
    const [isRegistering, setIsRegistering] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const switchMode = () => {
        setErrorMessage("");
        setIsRegistering(r => !r);
        setName("");
        setEmail("");
        setPassword("");
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            let res;
            if (isRegistering) {
                res = await api.post("/auth/register", { name, email, password });
            } else {
                res = await api.post("/auth/login", { email, password });
            }
            const user = res.data;

            // Hand over persistence & state to AuthContext
            login(user);
        } catch (error) {
            console.error(error);
            setErrorMessage(
                isRegistering
                    ? "Registration failed. Please try again."
                    : "Invalid email or password."
            );
        }
    };

    return (
        <div className="auth-box">
            <div className="dashboard-box">

                <h2>{isRegistering ? "Register" : "Log In"}</h2>

                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

                <form onSubmit={handleSubmit}>
                    {isRegistering && (
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        id="email-input"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        id="password-input"
                        required
                    />
                    <button type="submit">
                        {isRegistering ? "Register" : "Log In"}
                    </button>
                </form>
                <p>
                    {isRegistering ? "Already have an account?" : "No account yet?"}{" "}
                <button
                    onClick={switchMode}
                >
                        {isRegistering ? "Log In" : "Register"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;