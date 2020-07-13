import React from 'react';
import classes from './App.css';
import Hierarchy from "./containers/Hierarchy/Hierarchy"
import Store from "./containers/Store/Store"

function App() {
  return (
    <div className={classes.App}>
      <Hierarchy/>
      <Store/>
    </div>
  );
}

export default App;
