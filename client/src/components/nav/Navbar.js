import TimeDate from './TimeDate';
import NavLinks from './NavLinks';

const Navbar = () => {
        return (
        <header className="invert-color">
            <div className="nav-container">
                <TimeDate /> 
                <NavLinks />  
            </div>
        </header>
    )
}

export default Navbar;