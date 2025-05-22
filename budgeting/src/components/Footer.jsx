import { Link } from "react-router";

const Footer = () => (
    <footer className="footer" >
        <p>
            Follow me on:
            <Link to="https://www.linkedin.com/in/jay-sakabu-b78a04136/" target="_blank" rel="noopener noreferrer">LinkedIn</Link>
            <Link to="https://github.com/Jay-Sakabu" target="_blank" rel="noopener noreferrer"> GitHub</Link>
        </p>
    </footer>
);

export default Footer;