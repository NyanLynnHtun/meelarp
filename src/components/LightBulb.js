// src/components/LightBulb.js
import React from "react";

export default function LightBulb({ isOn }) {
  return (
    <div className="bulb-scene">
      <div className="bulb-wire"></div>
      <div className={`bulb${isOn ? "" : " off"}`}>
        <div className="bulb-base"></div>
        <div className="bulb-glass"></div>
      </div>
    </div>
  );
}
