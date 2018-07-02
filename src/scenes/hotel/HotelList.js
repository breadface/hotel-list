import React from 'react';

const HotelList = ({list}) =>
  <div className="container center">{
    list.map(({image, rating, badge, name, cost}) =>
      <div
        key={image}
        className="hotel-card col-30">
        <div className="hotel-image"><img src={image} alt="Hotel information"/></div>
        <div className="content">
          <div className="details">
            <div className="rating">{rating}</div>
            <div className="badge">{badge}</div>
          </div>
          <div className="name">{name}</div>
          <div className="cost">Starting from $ {cost}</div>
        </div>
      </div>)}
  </div>

export default HotelList;
