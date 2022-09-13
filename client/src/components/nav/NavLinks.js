import { Link } from 'react-router-dom'; // enables links
import { useLocation } from 'react-router-dom';

const NavLinks = () => {

    const location = useLocation();

    return (
        <div className="links">
            {
                (location.pathname === "/") ?
                    <Link to="/calendar" >
                        <h2>Calendar</h2>
                    </Link>
                    :
                    <Link to="/">
                        <h2>Home</h2>
                    </Link>
            }
        </div>
    )
}

export default NavLinks;              