import React, { useState, useEffect } from "react";
import "./App.css";
import fire from "./config/fire";
import Login from "./component/Login";
import Main from "./component/Main";

const App = () => {
  const [user, setuser] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [emailerror, setemailerror] = useState("");
  const [passerror, setpasserror] = useState("");
  const [hasacc, sethasacc] = useState(false);

  const clrinput = () => {
    setemail("");
    setpass("");
  };

  const clrerr = () => {
    setemailerror("");
    setpasserror("");
  };
  // console.log(setemailerror)

  const logout = () => {
    fire.auth().signOut();
  };

  const dologin = () => {
    clrerr();
    fire
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setemailerror(err.message);
            break;
          case "auth/wrong-password":
            setpasserror(err.message);
            break;
          default:
        }
        // console.log();
        // console.log(err);
      });
  };

  const dosignup = () => {
    clrerr();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email": {
            setemailerror(err.message);
            break;
          }
          case "auth/weak-password": {
            setpasserror(err.message);
            break;
          }
          default: {
          }
        }
        // console.log(setemailerror);
      });
  };

  const authuser = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clrinput();
        setuser(user);
      } else {
        setuser("");
      }
    });
  };

  useEffect(() => {
    authuser();
  });

  return (
    <div className="App">
      {user ? (
        <Main logout={logout} />
      ) : (
        <Login
          email={email}
          setemail={setemail}
          pass={pass}
          setpass={setpass}
          dologin={dologin}
          dosignup={dosignup}
          hasacc={hasacc}
          sethasacc={sethasacc}
          emailerror={emailerror}
          passerror={passerror}
        />
      )}
    </div>
  );
};

export default App;
