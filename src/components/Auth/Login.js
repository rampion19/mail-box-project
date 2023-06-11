import { useRef } from "react";
import { useHistory } from "react-router-dom";
import './Login.css'
import { useDispatch } from "react-redux";
import { authSliceActions } from "../store/AuthSlice";
import {mailActions} from "../store/MailSlice";

const LogIn = () => {
    const email = useRef("");
    const password = useRef("");
    const history = useHistory();
    const dispatch = useDispatch();

    //login form Validation
    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const sendLoginData = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD4Ppx44lrCv7O_UQDI3JXseDARLXHuhLM`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        email: email.current.value,
                        password: password.current.value,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (sendLoginData.ok) {
                const response = await sendLoginData.json();
                localStorage.setItem('token', response.idToken);
                localStorage.setItem('email', response.email);
                history.replace('/home')
                dispatch(authSliceActions.login())
                dispatch(mailActions.onLogin(localStorage.getItem('email')))

            } else {
                const response = await sendLoginData.json();
                throw response.error
            }
        } catch (error) {
            alert(error.message)
        }
    };
    return (
        <>
            <div className="cardlogin">
                <form className="formlogin" onSubmit={loginHandler}>
                    <label htmlFor="email">Email</label>
                    <input type="email" ref={email} id="email" required></input>
                    <label htmlFor="password">Password</label>
                    <input type="password" ref={password} id="password" required></input>
                    <button type="submit">LogIn</button>
                </form>
                <div>
                    <button className="login" onClick={() => { history.replace('/signup') }}>
                        Dont Have an Account Signup Here
                    </button>
                </div>
            </div>
        </>
    );
};
export default LogIn;