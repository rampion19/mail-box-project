import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import classes from "./AuthForm.module.css";
import { authActions } from "../Store/Auth-redux";


const AuthForm = () => {
    console.log("insideAuth");
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setisLoading] = useState();
    const emailInputref = useRef();
    const passwordInputref = useRef();

    const [loginState, setlogingState] = useState(false);
    const dispatch = useDispatch();

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputref.current.value;
        const enteredPassword = passwordInputref.current.value;

        //validation
        setisLoading(true);
        let url;
        if (isLogin) {
            url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC_rvgnAoPoAtDLCLNcgx2KoA0BBVmbA4E";
        } else {
            url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC_rvgnAoPoAtDLCLNcgx2KoA0BBVmbA4E";
        }
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                setisLoading(false);
                if (res.ok) {
                    //...
                    return res.json();

                } else {
                    //...
                    return res.json().then((data) => {
                        // show an error modal
                        let eroorMessage = "Authentication failed";
                        // if (data && data.error && data.error.message) {
                        //   eroorMessage = data.error.message;
                        // }

                        throw new Error(eroorMessage);
                    });
                }
            })
            .then((data) => {
                console.log(data);
                dispatch(authActions.login(data.idToken));
                setlogingState(true);
                localStorage.setItem("Email", enteredEmail);
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <section className={classes.auth}>
            {loginState && <Redirect to="/mail" />}
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="email">Your Email</label>
                    <input type="email" id="email" required ref={emailInputref} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Your Password</label>
                    <input
                        type="password"
                        id="password"
                        required
                        ref={passwordInputref}
                    />
                </div>
                <div className={classes.actions}>
                    {!isLoading && (
                        <button>{isLogin ? "Login" : "Create Account"}</button>
                    )}
                    {isLoading && <p>Sending Request....</p>}
                </div>

            </form>
            <button
                type="button"
                className={classes.forgot}
                onClick={switchAuthModeHandler}
            >
                {isLogin ? "Create new account" : "Login with existing account"}
            </button>
        </section>
    );
};

export default AuthForm;