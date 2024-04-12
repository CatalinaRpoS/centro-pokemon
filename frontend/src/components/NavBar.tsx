import pokeball from "../assets/Pokeball.png";

export const NavBar: React.FC = () => {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src={pokeball}
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-text-top"
          />
          Bootstrap
        </a>
      </div>
    </nav>
  );
};
