import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
  const { _id, firstName, lastName, email, phoneNo, type } = contact;
  const contactContext = useContext(ContactContext);
  const { delContact, setCurrent, clearCurrent } = contactContext;
  const onDelete = () => {
    delContact(_id);
    clearCurrent();
  };
  return (
    <div className='card bg-light'>
      <h4 className='text-primary text-left' style={{ position: 'relative' }}>
        {`${firstName} ${lastName}`}{' '}
        <span
          className={
            'badge' +
            ' ' +
            (type === 'professional' ? 'badge-success ' : 'badge-primary')
          }
          style={{ position: 'absolute', top: '-5px', right: 0 }}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h4>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open' />
            {email}
          </li>
        )}
        {phoneNo && (
          <li>
            <i className='fas fa-phone' />
            {phoneNo}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

export default ContactItem;

ContactItem.protoTypes = {
  contact: PropTypes.object.isRequired,
};
