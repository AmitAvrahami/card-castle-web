import React from "react";
import { Form } from "react-bootstrap";

const SortForm = ({ selectedSort, onSortChange }) => {
    return (
        <Form.Group controlId="sortSelect" className="sort-form">

            <Form.Control
                as="select"
                value={selectedSort}
                onChange={(e) => onSortChange(e.target.value)}
            >
                <option value="name">Sort By</option>

                <option value="name">Name</option>
                <option value="atk">ATK</option>
                <option value="def">DEF</option>
                <option value="level">Level</option>
            </Form.Control>
        </Form.Group>
    );
};

export default SortForm;
