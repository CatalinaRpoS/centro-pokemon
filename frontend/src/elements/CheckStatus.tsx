import status1 from "../assets/status1.png";
import status2 from "../assets/status2.png";
import status3 from "../assets/status3.png";
import status4 from "../assets/status4.png";
import status5 from "../assets/status5.png";

export const CheckStatus = () => {
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
