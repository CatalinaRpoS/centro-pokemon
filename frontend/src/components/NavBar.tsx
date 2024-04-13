import pokeball from "../assets/Pokeball.png";
import account from "../assets/Account.png";

export const NavBar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <div className="container-fluid">
        <a className="navbar-brand" href="index.html">
          <img
            src={pokeball}
            alt="Logo de la página"
            width="40"
            height="40"
            className="d-inline-block align-top"
          />
        </a>
        <h1
          className="h1"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 600,
            fontSize: 30,
          }}
        >
          CENTRO POKÉMON
        </h1>

        <button className="btn">
          <img
            src={account}
            alt="Logo de la página"
            width="40"
            height="40"
            className="d-inline-block align-top"
          />
        </button>
      </div>
    </nav>
  );
};
