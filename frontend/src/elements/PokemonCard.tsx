interface PokemonCardProps {
  image: string;
  name: string;
  level: number;
  turn: number;
  lifePoints: number;
  status: Array<string>;
  type: Array<string>;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  image,
  name,
  level,
  turn,
  lifePoints,
  status,
  type,
}) => {
  return (
    <div className="card pokemon-card">
      <div className="card-body d-flex justify-content-between pokemon-title">
        <h5 className="card-title">{name}</h5>
        <h5 className="card-title">Nivel {level}</h5>
      </div>
      <div className="card-body d-flex">
        <div className="d-flex flex-column pokemon-card-type">
          {type.map((path, index) => (
            <div key={index}>
              <img className="pokemon-type" src={path} alt={path} />
            </div>
          ))}
        </div>
        <img src={image} className="card-img pokemon-card-image" alt={image} />
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
        <button className="btn btn-danger pokemon-turn rounded-pill mt-auto mb-2">
          PV: {lifePoints}
        </button>
        <button className="btn btn-primary pokemon-turn rounded-pill mt-auto">
          Turno {turn}
        </button>
      </div>
    </div>
  );
};
