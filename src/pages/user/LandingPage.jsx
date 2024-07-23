import React, { useState } from 'react';
import openEye from '../../assets/icons/open-eye-password.png';
import closeEye from '../../assets/icons/close-eye-password.png';

function LandingPage() {
    const [ isOpen, setIsOpen ] = useState( false );
  return (
    <div>
      <div>
        <div style={{ width: '1200px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            style={{
              height: '40px',
              width: 'auto',
              marginRight: '4px',
              border: '3px solid #761236',
              padding: '9px 12px',
              borderRadius: '20px',
              fontWeight: '650',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            Sign In
          </button>
        </div>
      </div>
      <div style={{ marginTop: '20px', marginLeft: '50px' }}>
        <h2 style={{ fontSize: '60px', color: '#761236' }}>Welcome to your personal library</h2>
        <form style={ { marginTop: '35px' } }>
            <label htmlFor="email_or_phone" style={ { width: '117px', height: '26px',  marginBottom: '4px', marginLeft: '4px', color: '#761236' } }>Email or phone</label>
            <br />
            <div>
                <input type="text" id="email_or_phone" name="fname" style={ { width: '481px', height: '50px', padding: '2px', fontSize: '20px', outline: '2px solid #761236', borderRadius: '15px', backgroundColor: '#F7DADA', paddingLeft: '6px'  } } />
            </div>
            <br />
            <br />
            <label htmlFor="password" style={ { width: '117px', height: '26px',  marginBottom: '4px', marginLeft: '4px', color: '#761236' } }>Password</label>
            <br />
            <div style={ { display: 'flex', flexDirection: 'row' } }>
                <input type={ isOpen ? "text" : "password" } id="password" name="fname" style={ { width: '481px', height: '50px', padding: '2px', fontSize: '20px', outline: '2px solid #761236', borderRadius: '15px', backgroundColor: '#F7DADA', paddingLeft: '6px' } } />
                <img src={ isOpen ? openEye : closeEye } alt={ isOpen ? "openEye" : "closeEye" } style={ { height: '40px', width: 'auto', marginTop: '5px', marginLeft: '5px', cursor: 'pointer' } } onClick={ () => setIsOpen( state => !state ) } />
            </div>
        </form>
        <h3 style={ { marginTop: '40px', color: '#761236', cursor: 'pointer', fontWeight: '500' } }>
            Forgot Password?
        </h3>
        <div style={ { display: 'flex', flexDirection: 'column' } }>
            <button style={ { marginTop: '30px', width: '481px', backgroundColor: '#761236', color: '#F7DADA', borderRadius: '20px', height: '50px', fontWeight: '700' } }>
                Sign In
            </button>
            <button style={ { marginTop: '20px', width: '481px', backgroundColor: '#761236', color: '#F7DADA', borderRadius: '20px', height: '50px', fontWeight: '700' } }>
                Continue with Google
            </button>
            <button style={ { marginTop: '20px', width: '481px', backgroundColor: '#761236', color: '#F7DADA', borderRadius: '20px', height: '50px', fontWeight: '700' } }>
                New to LitLib? Join Now
            </button>
        </div>
      </div>
    </div>
  );
}

export { LandingPage };