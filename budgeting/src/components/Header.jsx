import { Link } from 'react-router';

const Header = () => (
    <header className='side-navbar'>
        <nav className=''>
            <Link className="link-styling" to="/">Home</Link>
            <Link className="link-styling" to="/budget">Create Budget</Link>
            <Link className="link-styling" to="/about">About</Link>
        </nav>
    </header>
);

export default Header;