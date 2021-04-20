import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

const ChangeForm = () => {
  const { slider, toggleSlider } = useContext(AuthContext)
  
   const changeToRegister = () => {
     toggleSlider(slider);
   };

  return (
    <p className='mobile-register'>
      
      {slider? 'Already':'Not' } a Member?{' '}
      {/* <a href='#' onClick={changeToRegister}>
        {!slider ? 'Register': 'Sign In'}
      </a> */}
      <a onClick={changeToRegister}>{slider ?"Sign In": "Register"  }</a>
    </p>
  );
}

export default ChangeForm
