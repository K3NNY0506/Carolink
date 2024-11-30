import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './components/Login/LGister.css';

function LoginRegister() {
    function switchContent(action) {
        const content = document.getElementById('content');
        if (action === 'register') {
            content.classList.add('active'); // Show Register Panel
        } else {
            content.classList.remove('active'); // Show Login Panel
        }
    }

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function register(event) {
        event.preventDefault();
        axios.post("http://localhost:8081/register", { username, email, password })
            .then(() => {
                switchContent('login'); // Switch to Login Panel
                alert("Registration successful! Please log in.");
            })
            .catch(err => console.log(err));
    }

    // Login
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    function login(event) {
        event.preventDefault();
        axios.post("http://localhost:8081/login", values)
            .then(res => {
                if (res.data.Status === "Success") {
                    localStorage.setItem("accessToken", res.data.accessToken); // Save the token in localStorage
                    navigate("/home");
                } else {
                    alert(res.data.Error);
                }
            }).catch(err => console.log(err));
    }

    return (
        <div className='login-register-container'>
            <div className='content justify-content-center align-items-center d-flex shadow-lg' id='content'>
                {/*------------- Register form ----------------------*/}
                <div className='col-md-6 d-flex justify-content-center'>
                    <form onSubmit={register}>
                        <div className='header-text mb-4'>
                            <h1>Create Account</h1>
                        </div>
                        <div className='input-group mb-3'>
                            <input type='text' placeholder='Username' className='form-control form-control-lg bg-light fs-6' onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div className='input-group mb-3'>
                            <input type='email' placeholder='Email' className='form-control form-control-lg bg-light fs-6' onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className='input-group mb-3'>
                            <input type='password' placeholder='Password' className='form-control form-control-lg bg-light fs-6' onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className='input-group mb-3 justify-content-center'>
                            <button className='btn border-white text-white w-59 fs-6'>Register</button>
                        </div>
                    </form>
                </div>

                {/*------------- Login form ----------------------*/}
                <div className='col-md-6 right-box'>
                    <form onSubmit={login}>
                        <div className='header-text mb-4'>
                            <h1>Sign In</h1>
                        </div>
                        <div className='input-group mb-3'>
                            <input type='email' placeholder='Email' className='form-control form-control-lg bg-light fs-6' onChange={e => setValues({ ...values, email: e.target.value })} />
                        </div>
                        <div className='input-group mb-3'>
                            <input type='password' placeholder='Password' className='form-control form-control-lg bg-light fs-6' onChange={e => setValues({ ...values, password: e.target.value })} />
                        </div>
                        <div className='input-group mb-3 justify-content-center'>
                            <button className='btn border-white text-white w-59 fs-6'>Login</button>
                        </div>
                    </form>
                </div>

                {/*--------------- switch panel -------------*/}
                <div className='switch-content'>
                    <div className='switch'>
                        <div className='switch-panel switch-left'>
                            <h1>Hello, Again</h1>
                            <p>We are happy to see you back</p>
                            <button className='hidden btn text-white w-50 fs-6' id='login' onClick={() => switchContent('login')}>Login</button>
                        </div>
                        <div className='switch-panel switch-right'>
                            <h1>Welcome</h1>
                            <p>Join Carolink, Link with Carolinians</p>
                            <button className='hidden btn border-white text-white w-50 fs-6' id='register' onClick={() => switchContent('register')}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginRegister;
