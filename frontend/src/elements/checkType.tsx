import Type1 from "../assets/Type1.png";
import Type2 from "../assets/Type2.png";
import Type3 from "../assets/Type3.png";
import Type4 from "../assets/Type4.png";
import Type5 from "../assets/Type5.png";
import Type6 from "../assets/Type6.png";
import Type7 from "../assets/Type7.png";
import Type8 from "../assets/Type8.png";
import Type9 from "../assets/Type9.png";
import Type10 from "../assets/Type10.png";
import Type11 from "../assets/Type11.png";
import Type12 from "../assets/Type12.png";
import Type13 from "../assets/Type13.png";
import Type14 from "../assets/Type14.png";
import Type15 from "../assets/Type15.png";
import Type16 from "../assets/Type16.png";
import Type17 from "../assets/Type17.png";
import Type18 from "../assets/Type18.png";

export const CheckType = () => {
  const imagePaths = [
    Type1,
    Type2,
    Type3,
    Type4,
    Type5,
    Type6,
    Type7,
    Type8,
    Type9,
    Type10,
    Type11,
    Type12,
    Type13,
    Type14,
    Type15,
    Type16,
    Type17,
    Type18,
  ];

  return (
    <div className="flex-container">
      {imagePaths.map((path, index) => (
        <div className="form-check" key={index}>
          <input
            className="form-check-input"
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
