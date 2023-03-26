import React from "react";
import "./SignUp.css";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
const SignUp = () => {
  const history=useHistory()
  const email = useRef("");
  const password = useRef("");
  const confirmPassword = useRef("");

  //SignUp Form
  const signupHandler = async (event) => {
    event.preventDefault();

    //validation of data
    if (password.current.value.trim().length <= 5) {
      return alert("password Should be atleast 6 Characters");
    } else if (password.current.value !== confirmPassword.current.value) {
      return alert("passwords are not matching");
    }
    //Async Code
    try {
      const sendSignupData = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC_rvgnAoPoAtDLCLNcgx2KoA0BBVmbA4E`,
        {
          method: "POST",
          body: JSON.stringify({
            email: email.current.value,
            password: password.current.value,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ); //fetch ends
      if (sendSignupData.ok) {
        const response = await sendSignupData.json();
        console.log(response);
        if(response.idToken){
            history.replace('/login')
        }
      } else {
        const response = await sendSignupData.json();
        throw response.error;
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="card">
      <form className="form" onSubmit={signupHandler}>
        <label htmlFor="email">Email</label>
        <input type="email" ref={email} id="email" required></input>
        <label htmlFor="password">Password</label>
        <input type="password" ref={password} id="password" required></input>
        <label htmlFor="confirm">Confirm Password</label>
        <input
          type="password"
          ref={confirmPassword}
          id="confirm"
          required
        ></input>
        <button type="submit">SignUp</button>
      </form>
      <div>
        <button className="login" onClick={() => {history.replace('/login')}}>
          Already Have An Account? Log In Here
        </button>
      </div>
    </div>
  );
};
export default SignUp;