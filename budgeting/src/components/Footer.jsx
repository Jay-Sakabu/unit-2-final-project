import { Link } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Footer = () => (
    <footer className="footer" >
        <p>
            Follow me on:
            <Link to="https://www.linkedin.com/in/jay-sakabu-b78a04136/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /></Link>
            <Link className="fa-brands fa-github" to="https://github.com/Jay-Sakabu" target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon icon={faGithub} /> </Link>
        </p>
    </footer>
);

export default Footer;