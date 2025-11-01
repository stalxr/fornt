import { NavLink } from 'react-router-dom';
import '../App.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Home
        </NavLink>
        <NavLink to="/users" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Users
        </NavLink>
        <NavLink to="/photos" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Photos
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;



