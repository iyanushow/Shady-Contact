import React, {useState, useContext} from 'react'
import Login from './Login';
import Register from './Register';

const Registration = (props) => {
  const [slider, setSlider] = useState(false);

  const onClick = (e) => {
    setSlider(!slider)
  }
  const activeSlider = slider ? 'active' : ''

  return (
    <div className='form-body'>
      <div className={`container-a ${activeSlider}`} id='container'>
        <Register {...props} />
        <Login {...props} />
        <div className='overlay-container'>
          <div className='overlay'>
            <div className='overlay-panel overlay-left'>
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className='ghost' id='signIn' onClick={onClick}>
                Sign In
              </button>
            </div>
            <div className='overlay-panel overlay-right'>
              <h1>Hello, Friend!</h1>
              <p>New to Shady Contact? </p>
              <button className='ghost' id='signUp' onClick={onClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration
