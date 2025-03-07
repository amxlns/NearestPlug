// src/Rewards.js
import React from 'react';
import './Rewards.css';

function Rewards({ userPoints }) {
  return (
    <div className="rewards-container">
      <h1>Your Recycling Rewards</h1>
      <p>Points Earned: {userPoints}</p>
      <div className="rewards-list">
        <h2>Redeem Your Points</h2>
        <div className="reward-item">
          <h3>Discount Coupon</h3>
          <p>100 Points</p>
          <button disabled={userPoints < 100}>Redeem</button>
        </div>
        <div className="reward-item">
          <h3>Free T-Shirt</h3>
          <p>200 Points</p>
          <button disabled={userPoints < 200}>Redeem</button>
        </div>
        <div className="reward-item">
          <h3>Gift Card</h3>
          <p>500 Points</p>
          <button disabled={userPoints < 500}>Redeem</button>
        </div>
      </div>
    </div>
  );
}

export default Rewards;