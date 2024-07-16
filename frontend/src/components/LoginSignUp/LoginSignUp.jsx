import React, { useState, useEffect } from 'react'
import "./loginSignUp.css"
import Loader from '../Layout/Loader/Loader'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginuser, registeruser } from '../../Actions/userActions'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import MetaData from '../Layout/MetaData'

const LoginSignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginemail, setLoginEmail] = useState("");
    const [loginpassword, setLoginPassword] = useState("");
    const [ipuser, setipUser] = useState({
        name: "",
        email: "",
        password: ""
    })
    const { name, email, password } = ipuser;
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.jpeg");

    const registerDataChange = (e) => {
        e.preventDefault();
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatar(reader.result);
                    setAvatarPreview(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }
        else {
            setipUser({ ...ipuser, [e.target.name]: e.target.value });
        }
    }
    const login = (e) => {
        e.preventDefault();
        // console.log("Login Form Submitterd");
        // console.log(`LoginEmail : ${loginemail} & LoginPassword : ${loginpassword}`);
        dispatch(loginuser(loginemail, loginpassword));
    }
    const register = (e) => {
        e.preventDefault();
        console.log("Form Registered");
        dispatch(registeruser(name,email,password,avatar));
    }
    const { loading, isAuthenticated, error,user } = useSelector((state) => state.User);

    useEffect(() => {
        if (error) {
            console.log(error);
            toast.error(error);
        }
        if(isAuthenticated && user.user.role ==="admin"){
            navigate("/admin/dashboard"); //Atlast Change to Dashboard 
        }
        else if(isAuthenticated && user.user.role==="user"){
            if(window.location.href){
                if(window.location.href.split("=")[1]){
                    navigate(window.location.href.split("=")[1]); 
                    window.location.reload();  //temporary used
                }
                else{
                    navigate("/products");
                }
            }
            else{
                navigate("/products");
            }
        }
    }, [dispatch,error,navigate,isAuthenticated,user]);

    return (
        <>
        {loading ? (<Loader/>) : (
            <>
        <ToastContainer />
        <MetaData title="Ecommerce Sign In"/>
        <div className="loginsignup">
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Create Account</h1>
                        {/* <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div> */}
                        {/* <span>or use your email for registration</span> */}
                        <input type="text"
                            name='name'
                            required
                            placeholder="Name"
                            value={name}
                            onChange={registerDataChange} />
                        <input type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={registerDataChange}
                            required
                        />
                        <input type="password"
                            name='password'
                            required
                            placeholder="Password"
                            value={password}
                            onChange={registerDataChange} />
                        <div className="registerimg">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input type="file"
                                name='avatar'
                                accept='image/*'
                                onChange={registerDataChange} />
                        </div>
                        <button onClick={register}>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form >
                        <h1>Sign in</h1>
                        {/* <div className="social-container">
                            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                        </div> */}
                        {/* <span>or use your account</span> */}
                        <input type='email'
                            value={loginemail} placeholder="Email" required
                            onChange={(e) => { setLoginEmail(e.target.value); }} />
                        <input type='password'
                            value={loginpassword} placeholder="Password" required
                            onChange={(e) => { setLoginPassword(e.target.value); }} />
                        <Link to="/password/forget" className="forget">Forget your password?</Link>
                        <button onClick={login}>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn" onClick={() => { document.getElementById('container').classList.remove("right-panel-active"); }}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp" onClick={() => { document.getElementById('container').classList.add("right-panel-active"); }}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div> </>)}
        </>
    )
}

export default LoginSignUp