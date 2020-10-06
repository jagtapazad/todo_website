import React from "react";

const Login = (props) => {
  const {
    email,
    setemail,
    pass,
    setpass,
    dologin,
    dosignup,
    hasacc,
    sethasacc,
    emailerr,
    passerr,
  } = props;

  return (
    <section className="login">
      <div className="loginContainer">
        <label>Username</label>
        <input
          type="text"
          required
          autoFocus
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <p className="errorMsg">{emailerr}</p>
        <label>Password</label>
        <input
          type="password"
          required
          autoFocus
          value={pass}
          onChange={(e) => setpass(e.target.value)}
        />
        <p className="errorMsg">{passerr}</p>
        <div className="btnContainer">
          {hasacc ? (
            <>
              <button onClick={dosignup}>Sign Up</button>
              <p>
                Already Have an Account?
                <span onClick={() => sethasacc(!hasacc)}>Sign In!</span>
              </p>
            </>
          ) : (
            <>
              <button onClick={dologin}>Sign In</button>
              <p>
                Don't Have an Account?
                <span onClick={() => sethasacc(!hasacc)}>Sign Up!</span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
