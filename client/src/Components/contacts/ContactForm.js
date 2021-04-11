import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    type: 'personal',
  });

  const { firstName, lastName, email, phoneNo, type } = contact;

  const contactContext = useContext(ContactContext);

  const { addContact, current, clearCurrent, updateCurrent } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        firstName: '',
        lastName: '',
        email: '',
        phoneNo: '',
        type: 'personal',
      });
    }
    // return () => {

    // }
  }, [contactContext, current]);

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateCurrent(contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };
  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        name='firstName'
        placeholder='first-name'
        id=''
        value={firstName}
        onChange={onChange}
      />
      <input
        type='text'
        name='lastName'
        placeholder='last-name'
        id=''
        value={lastName}
        onChange={onChange}
      />
      <input
        type='email'
        name='email'
        placeholder='email'
        id=''
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        name='phoneNo'
        placeholder='phone-number'
        id=''
        value={phoneNo}
        onChange={onChange}
      />
      <h5>Type</h5>
      <input
        type='radio'
        name='type'
        id=''
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />
      Personal{' '}
      <input
        type='radio'
        name='type'
        id=''
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />
      Professional{' '}
      <div>
        <input
          type='submit'
          value={current ? 'Edit Contact' : 'Add Contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
