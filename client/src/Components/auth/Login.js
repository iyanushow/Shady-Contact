import React, { useState, useContext,useEffect, useRef } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import ChangeForm from './ChangeForm';



const Login = (props) => {
  
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  
  const { email, password } = user;
  
  const { setAlert } = useContext(AlertContext);
  const { login, error, isAuthenticated, clearErrors } = useContext(
    AuthContext
  );


  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === ' Invalid Credentials, please check your details') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.hsitory]);

  const onSubmit = (e) => {
    e.preventDefault()
     if (
       email === '' ||
       password === ''
     ) {
       setAlert('enter all fields', 'danger');
     } else {
       login(user)
     }
  }
  
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
 

  const ref = useRef(null)
  return (
    <div className='form-container-a sign-in-container' ref={ref}>
      <form onSubmit={onSubmit}>
        <h1>Sign in</h1>

        <span>or use your account</span>
        <input
          type='email'
          name='email'
          placeholder='email'
          id=''
          value={email}
          onChange={onChange}
          required
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          id=''
          value={password}
          onChange={onChange}
          required
        />
        {/* <a href=''>Forgot your password?</a> */}
        <button>Sign In</button>
      <ChangeForm />
      </form>
    </div>
  );
}

export default Login
