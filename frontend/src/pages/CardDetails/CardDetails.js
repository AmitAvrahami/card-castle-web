import { useParams } from "react-router-dom";
import { useCardsContext } from "../../components/context/cardsProvider";
import { useEffect, useState } from "react";
import "./CardDetails.css";
import NavScrollBar from "../../NavScrollBar/NavScrollBar";

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
                console.log("Card details", foundCard)
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

        <div className="origin-container">
            <NavScrollBar></NavScrollBar>

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
                                Buy now: {card.card_prices[0].tcgplayer_price || "N/A"}$
                            </button>
                        </div>
                    </div>
                    <div className="card-stats">
                        <h1>{card.name}</h1>
                        <div className="grid-container">
                            {card.type && (
                                <div className="info-box">
                                    <strong>Card Type:</strong>
                                    <p>{card.type}</p>
                                </div>
                            )}
                            {card.attribute && (
                                <div className="info-box">
                                    <strong>Attribute:</strong>
                                    <p>{card.attribute}</p>
                                </div>
                            )}
                            {card.typing && (
                                <div className="info-box">
                                    <strong>Typing:</strong>
                                    <p>{card.typing}</p>
                                </div>
                            )}
                            {card.level && (
                                <div className="info-box">
                                    <strong>Level/Rank:</strong>
                                    <p>{card.level}</p>
                                </div>
                            )}
                            {card.atk !== null && card.atk !== undefined && (
                                <div className="info-box">
                                    <strong>ATK:</strong>
                                    <p>{card.atk}</p>
                                </div>
                            )}
                            {card.def !== null && card.def !== undefined && (
                                <div className="info-box">
                                    <strong>DEF:</strong>
                                    <p>{card.def}</p>
                                </div>
                            )}
                            {card.archetype && (
                                <div className="info-box">
                                    <strong>Archetype:</strong>
                                    <p>{card.archetype}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="card-description">
                    <h4>Card Text</h4>
                    <p>{card.desc}</p>
                </div>
            </div>
        </div>
    );
}

export default CardDetails;
