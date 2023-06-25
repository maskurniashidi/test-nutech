import React, { useState } from 'react';
import styles from './styles/Table.module.css';

function Table({ columns, rows, itemsPerPage }) {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(rows.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPageButtons = () => {
        const pageButtons = [];

        if (totalPages <= 7) {
            for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
                pageButtons.push(
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={currentPage === pageNumber ? styles.active : ''}
                    >
                        {pageNumber}
                    </button>
                );
            }
        } else {
            let startPage, endPage;
            if (currentPage <= 4) {
                startPage = 1;
                endPage = 7;
            } else if (currentPage >= totalPages - 3) {
                startPage = totalPages - 6;
                endPage = totalPages;
            } else {
                startPage = currentPage - 3;
                endPage = currentPage + 3;
            }

            for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
                pageButtons.push(
                    <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={currentPage === pageNumber ? styles.active : ''}
                    >
                        {pageNumber}
                    </button>
                );
            }

            if (currentPage > 4) {
                pageButtons.unshift(<span key="ellipsis-start">...</span>);
                pageButtons.unshift(
                    <button
                        key={1}
                        onClick={() => handlePageChange(1)}
                        className={currentPage === 1 ? styles.active : ''}
                    >
                        1
                    </button>
                );
            }

            if (currentPage < totalPages - 3) {
                pageButtons.push(<span key="ellipsis-end">...</span>);
                pageButtons.push(
                    <button
                        key={totalPages}
                        onClick={() => handlePageChange(totalPages)}
                        className={currentPage === totalPages ? styles.active : ''}
                    >
                        {totalPages}
                    </button>
                );
            }
        }

        return pageButtons;
    };

    return (
        <div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((row, index) => (
                        <tr key={index}>
                            {columns.map((column) => (
                                <td key={column}>
                                    {typeof row[column] === 'object' ? (
                                        <>{row[column]}</>
                                    ) : (
                                        row[column]
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className={styles.pagination}>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &#60; Prev
                </button>
                {renderPageButtons()}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next &#62;
                </button>
            </div>
        </div>
    );
}

export default Table;
