import { useState } from "react";
import api from "../api-axios/api";

const AuthForm = ({ onLogin }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const switchMode = () => {
        setErrorMessage("");
        setIsRegistering((r) => !r);
        setName("");
        setEmail("");
        setPassword("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res;
            if (isRegistering) {
                res = await api.post("/auth/register", { name, email, password });
            } else {
                res = await api.post("/auth/login", { email, password });
            }
            const user = res.data;
            localStorage.setItem("user", JSON.stringify(user));
            onLogin(user);
        } catch (err) {
            console.error(err);
            setErrorMessage(
                isRegistering
                    ? "Registration failed. Please try again."
                    : "Invalid email or password."
            );
        }
    };

    return (
        <div className="auth-box">
            <h2>{isRegistering ? "Register" : "Login"}</h2>
            {errorMessage && (
                <p style={{ color: "red"}}>{errorMessage}</p>
            )}
            <form onSubmit={handleSubmit}>
                {isRegistering && (
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
    );
};

export default AuthForm;
