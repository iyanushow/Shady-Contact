import React, { useEffect, useContext } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import Filter from '../contacts/Filter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const { loadUser } = useContext(AuthContext)
  useEffect(() => {
    loadUser()
    // eslint-disable-next-line
  }, [])
  return (
    <div className='grid-2'>
      <div className='item'>
        <ContactForm />{' '}
      </div>
      <div>
        <Filter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
