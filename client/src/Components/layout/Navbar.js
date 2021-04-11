import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';


const Navbar = ({ title, icon }) => {

  const { isAuthenticated, logout, user } = useContext(AuthContext)
  const { clearContacts } = useContext(ContactContext);

  const onLogout = () =>{
    logout();
    clearContacts()
  }

  const authLinks = (
    <>
      <li>
        Hello {user && user.firstName}
      </li>
      <li>
        <a href="#" onClick={onLogout}>
          <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout</span>
        </a>
      </li>
    </>
  );
  const guestLinks = (
    <>
      <li>
        <Link to='/registration'> Join Us</Link>
      </li>
      
    </>
  );
  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {title}
      </h1>

      <ul>
      {isAuthenticated? authLinks: guestLinks}  
      
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Shady Contact',
  icon: 'fas fa-id-card-alt',
};

export default Navbar;
