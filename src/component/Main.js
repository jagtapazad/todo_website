import React from "react";

const Main = ({logout}) => {
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
