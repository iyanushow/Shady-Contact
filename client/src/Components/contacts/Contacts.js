import React, { useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const Contacts = () => {
  const { contacts, filtered, getContacts, loading } = useContext(ContactContext);


  useEffect(() => {
    getContacts()
  //  eslint-disable-next-line
  }, [])
  
  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact</h4>;
  }
  return (
    <>
      {contacts !== null && !loading ? (
        <>
          {filtered
            ? filtered.map((contact) => (
                <ContactItem key={contact._id} contact={contact} />
              ))
            : contacts.map((contact) => (
                <ContactItem key={contact._id} contact={contact} />
              ))}
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Contacts;
