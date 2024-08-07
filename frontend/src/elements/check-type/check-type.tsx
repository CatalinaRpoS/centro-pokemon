import React from "react";
import { 
  type1, type2, type3, type4, type5, type6, type7, type8, type9, 
  type10, type11, type12, type13, type14, type15, type16, type17, type18, 
} from "@assets/types";

const CheckType: React.FC = () => {
  const imagePaths = [
    type1,
    type2,
    type3,
    type4,
    type5,
    type6,
    type7,
    type8,
    type9,
    type10,
    type11,
    type12,
    type13,
    type14,
    type15,
    type16,
    type17,
    type18,
  ];

  return (
    <div className="flex-container">
      {imagePaths.map((path, index) => (
        <div className="form-check flex-items" key={index}>
          <input
            className="form-check-input rounded-pill"
            type="checkbox"
            value=""
            id={`flexCheckDefault${index}`}
          />
          <img className="pokemon-type" src={path} alt="" />
        </div>
      ))}
    </div>
  );
};

export default CheckType;
