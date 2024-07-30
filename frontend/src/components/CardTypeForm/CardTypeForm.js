// CardTypeForm.js
import React from 'react';
import { Form } from 'react-bootstrap';

const cardTypes = [
    "Card Type",
    "Effect Monster",
    "Flip Effect Monster",
    "Flip Tuner Effect Monster",
    "Gemini Monster",
    "Normal Monster",
    "Normal Tuner Monster",
    "Pendulum Effect Monster",
    "Pendulum Effect Ritual Monster",
    "Pendulum Flip Effect Monster",
    "Pendulum Normal Monster",
    "Pendulum Tuner Effect Monster",
    "Ritual Effect Monster",
    "Ritual Monster",
    "Spell Card",
    "Spirit Monster",
    "Toon Monster",
    "Trap Card",
    "Tuner Monster",
    "Union Effect Monster",
    "Fusion Monster",
    "Link Monster",
    "Pendulum Effect Fusion Monster",
    "Synchro Monster",
    "Synchro Pendulum Effect Monster",
    "Synchro Tuner Monster",
    "XYZ Monster",
    "XYZ Pendulum Effect Monster",
    "Skill Card",
    "Token"
];

function CardTypeForm({ selectedType, onSelect }) {
    return (
        <Form.Group controlId="formCardType">
            <Form.Control
                as="select"
                value={selectedType || "Card Type"}
                onChange={(e) => onSelect(e.target.value)}
            >
                {cardTypes.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </Form.Control>
        </Form.Group>
    );
}

export default CardTypeForm;
