import React, { useState, useEffect } from 'react'
import "./loginSignUp.css"
import Loader from '../Layout/Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { loginuser, registeruser } from '../../Actions/userActions'
import { useNavigate } from 'react-router-dom'
import MetaData from '../Layout/MetaData'
import { clearError } from '../../ReduxStore/Slices/User'
import { toast } from 'react-toastify'

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
        dispatch(loginuser(loginemail, loginpassword));
    }
    const register = (e) => {
        e.preventDefault();
        // console.log("Form Registered");
        dispatch(registeruser(name,email,password,avatar));
    }
    const { loading, isAuthenticated, error,user } = useSelector((state) => state.User);

    useEffect(() => {
        if (error) {
            toast.error(error,{
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                }); 
            // console.log(error);
            dispatch(clearError());
        }
        if(isAuthenticated && user.user.role ==="admin"){
            navigate("/admin/dashboard"); 
            toast.success("Sign In Successfully",{
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                }); 
        }
        else if(isAuthenticated && user.user.role==="user"){
            if(window.location.href){
                if(window.location.href.split("=")[1]){
                    navigate(window.location.href.split("=")[1]); 
                    window.location.reload();  //temporary used
                }
                else{
                    navigate("/products");
                    toast.success("Sign In Successfully",{
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        }); 
                }
            }
            else{
                navigate("/products");
                toast.success("Sign In Successfully",{
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    }); 
            }
        }
    }, [dispatch,error,navigate,isAuthenticated,user]);

    return (
        <>
        {loading ? (<Loader/>) : (
            <>
        <MetaData title="Ecommerce Sign In"/>
        <div className="loginsignup">
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={register}>
                        <h1>Create Account</h1>
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
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form onSubmit={login}>
                        <h1>Sign In</h1>
                        <input type='email'
                            value={loginemail} placeholder="Email" required
                            onChange={(e) => { setLoginEmail(e.target.value); }} />
                        <input type='password'
                            value={loginpassword} placeholder="Password" required
                            onChange={(e) => { setLoginPassword(e.target.value); }} />
                        {/* <Link to="/password/forget" className="forget">Forget your password?</Link> */}
                        <button type="submit">Sign In</button>
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