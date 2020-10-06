import React, { Component } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

import uuid from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";

// class Main extends Component {
//   // Declaring static variable
//   static num1 = 3.1416;

//   constructor() {
//     super();
  
//       this.logout;
    
//   }

//   render() {
//     return (
//       <section className="hero">
//         <nav>
//           <h2>SAELOUN | TODO APP</h2>
//           <button onClick={logout}>Logout</button>
//         </nav>
//       </section>
//     );
//   }
// }

const Main = ({ logout }) => {
  return (
    <section className="hero">
      <nav>
        <h2>SAELOUN | TODO APP</h2>
        <button onClick={logout}>Logout</button>
      </nav>
    </section>
  );
};

export default Main;
