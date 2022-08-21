import React, { useState } from "react";
import "bootstrap/scss/bootstrap.scss";
import "../styles/App.scss";

import Header from "./header";
import Capabilities from "./capabilities";
import Team from "./team";
import Footer from "./footer";

function App() {
  return (
    <main>
      <Header />
      <Capabilities />
      <Team />
      <Footer />
    </main>
  );
}

export default App;
