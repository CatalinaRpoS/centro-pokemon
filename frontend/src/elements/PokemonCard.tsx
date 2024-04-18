interface PokemonCardProps {
  image: string;
  name: string;
  level: number;
  turn: number;
  status: Array<string>;
  type: Array<string>;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  image,
  name,
  level,
  turn,
  status,
  type,
}) => {
  return (
    <div className="card pokemon-card">
      <div className="card-body d-flex justify-content-between pokemon-title">
        <h5 className="card-title">{name}</h5>
        <h5 className="card-title">Nivel {level}</h5>
      </div>
      <img src={image} className="card-img" alt={image} />
      <div className="card-img-overlay">
        <div className="blank-space"></div>
        <div className="d-flex align-items-start">
          {type.map((path, index) => (
            <div key={index}>
              <img className="pokemon-type" src={path} alt={path} />
            </div>
          ))}
        </div>
      </div>

      <div className="card-body d-flex flex-column">
        <div className="flex-grow-1">
          <div className="flex-container">
            {status.map((path, index) => (
              <div key={index}>
                <img className="pokemon-status" src={path} alt={path} />
              </div>
            ))}
          </div>
        </div>
        <button className="btn btn-primary pokemon-turn rounded-pill mt-auto">
          Turno {turn}
        </button>
      </div>
    </div>
  );
};
