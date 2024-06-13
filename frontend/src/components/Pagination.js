import React from "react";
import './Pagination.css';

const Pagination = ({ totalSets, setsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalSets / setsPerPage)

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1)
        }
    }

    return (
        <div className="page-control">
            <div className="pagination">
                <button onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
                <span>
                    Page{currentPage} of {totalPages}
                </span>
                <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    )

}

export default Pagination
