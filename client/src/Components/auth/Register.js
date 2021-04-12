import React, { useState,useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';


const Register = (props) => {
  
  
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { firstName, lastName, email, password, passwordConfirm } = user;

  
  const { setAlert } = useContext(AlertContext);
  const { register, error ,isAuthenticated, clearErrors } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
    }
    if (error === ' A user with this email already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error,isAuthenticated,props.hsitory]);

  
  const onSubmit = (e) => {
    e.preventDefault();
    if (firstName === '' ||lastName === '' || email=== '' || password === '') {
      setAlert('enter all fields', 'danger')
    } else if (password !== passwordConfirm){
      setAlert('passwords must be same','danger')
    }else {
      register(user);
    }

  };
  
  const onChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})
  };

  return (
    <div className='form-container-a sign-up-container'>
      <form onSubmit={onSubmit}>
        <h1>Create Account</h1>

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
          type='password'
          placeholder='Password'
          name='password'
          id=''
          value={password}
          onChange={onChange}
          required
          minLength='8'
        />
        <input
          type='password'
          placeholder='Confirm Password'
          name='passwordConfirm'
          id=''
          value={passwordConfirm}
          onChange={onChange}
          required
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default Register
