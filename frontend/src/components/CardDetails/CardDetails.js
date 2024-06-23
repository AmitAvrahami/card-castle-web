import { useParams } from "react-router-dom";
import { useCardsContext } from "../context/cardsProvider";
import { useEffect, useState } from "react";
import "./CardDetails.css";

function CardDetails() {
    const { cardId } = useParams();
    const { cards } = useCardsContext();
    const [card, setCard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (cards && cards.length > 0) {
            const foundCard = cards.find((card) => card.id === parseInt(cardId));
            if (foundCard) {
                setCard(foundCard);
                setLoading(false);
            }
        }
    }, [cardId, cards]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (!card) {
        return <h1>Card not found.</h1>;
    }

    return (
        <div className="card-details-container">
            <div className="card-info">
                <div className="card-image-container">
                    <img
                        src={card.card_images[0].image_url}
                        alt={card.name}
                        className="card-image"
                    />
                    <div className="price-button">
                        <button className="price-btn">
                            Buy now: {card.cardmarket_price || "N/A"}$
                        </button>
                    </div>
                </div>
                <div className="card-stats">
                    <h1>{card.name}</h1>
                    <div className="grid-container">
                        <p><strong>Card Type:</strong> {card.type}</p>
                        <p><strong>Attribute:</strong> {card.attribute}</p>
                        <p><strong>Typing:</strong> {card.typing || "N/A"}</p>
                        <p><strong>Level/Rank:</strong> {card.level || "N/A"}</p>
                        <p><strong>ATK:</strong> {card.atk || "N/A"}</p>
                        <p><strong>DEF:</strong> {card.def || "N/A"}</p>
                        <p><strong>Archetype:</strong> {card.archetype || "N/A"}</p>

                    </div>
                </div>
            </div>
            <div className="card-description">
                <h4>Card Text</h4>
                <p>{card.desc}</p>
            </div>
        </div>
    );
}

export default CardDetails;
