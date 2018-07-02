//@flow

import React from "react";
import "./App.css";
import Header from "./components/Header";
import HotelPage from "./scenes/hotel/HotelPage";
import { FetchToken } from "./components/Utils";

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <FetchToken>{token => <HotelPage token={token} />}</FetchToken>
    </div>
  );
};

export default App;
