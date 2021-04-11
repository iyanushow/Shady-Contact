import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const Filter = () => {
  const contactContext = useContext(ContactContext);
  const container = useRef('');
  const { filterContacts, clearFilter, filtered } = contactContext;
  useEffect(() => {
    if (filtered === null) {
      container.current.value = '';
    }
    // return () => {
    //   cleanup
    // }
  });
  const onChange = (e) => {
    if (container.current.value !== '') {
      filterContacts(container.current.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        type='text'
        ref={container}
        placeholder='search...'
        onChange={onChange}
      />
    </form>
  );
};

export default Filter;
