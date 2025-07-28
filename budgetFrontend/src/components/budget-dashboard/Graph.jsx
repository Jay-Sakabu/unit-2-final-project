import { Link } from "react-router";

const Graph = () => (
    <footer className="footer" >
        <p>
            Follow me on:
            <Link to="https://www.linkedin.com/in/jay-sakabu-b78a04136/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /></Link>
            <Link className="fa-brands fa-github" to="https://github.com/Jay-Sakabu" target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon icon={faGithub} /> </Link>
        </p>
    </footer>
);

export default Graph;