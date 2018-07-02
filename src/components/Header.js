//@flow
import React from "react";

const Header = () => (
  <React.Fragment>
    <div className="header">
      <div>Contact us directly at +971 (55) 895 8452 (Local time 22:19)</div>
      <div>
        <span>Join Now</span>
        <span>Guest Sign In</span>
        <button>ENG</button>
        <button>USD</button>
      </div>
    </div>
    <div className="navbar">
      <div className="left">
        <div className="logo">booknstay</div>
        <div className="search-input">
          <div className="search-icon">
            <span role="img" aria-label="Search">
              &#128269;
            </span>
          </div>
          <input placeholder="Downtown Dubai, United Arab Emirates" />
          <div className="search-date">
            April <span className="day-circle">29</span>{" "}
            <span className="day-circle">30</span>
          </div>
        </div>
      </div>

      <div className="right">
        <div>Accomodation</div>
        <div>Restaurants</div>
        <div>Rental Cars</div>
        <div>Flights</div>
      </div>
    </div>
  </React.Fragment>
);

export default Header;
