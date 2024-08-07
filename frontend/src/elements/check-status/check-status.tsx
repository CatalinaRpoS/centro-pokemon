import React from "react";
import { status1, status2, status3, status4, status5 } from "@assets/status";

const CheckStatus: React.FC = () => {
  const imagePath = [status1, status2, status3, status4, status5];
  return (
    <div className="flex-container">
      {imagePath.map((path, index) => (
        <div className="form-check flex-items" key={index}>
          <input
            className="form-check-input rounded-pill"
            type="checkbox"
            value=""
            id={`flexCheckDefault${index}`}
          />
          <img className="pokemon-status" src={path} alt="" />
        </div>
      ))}
    </div>
  );
};

export default CheckStatus;
