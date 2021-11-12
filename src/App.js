import React from "react";
import Routes from "./config/routepages";
import ContextProvider from "./screens/context/context";
function App() {
  return(
    <ContextProvider>
        <Routes/>
    </ContextProvider>
  )

}

export default App;
