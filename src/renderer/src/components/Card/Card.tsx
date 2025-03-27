import "./card.css";

const Card = ({ image, title }) => {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
      </div>
    </div>
  );
};

export default Card;
