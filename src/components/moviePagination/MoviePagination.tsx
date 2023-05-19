import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useNavigate, useSearchParams} from "react-router-dom";

import {movieActions} from "../../redux/slices";



const MoviePagination = () => {
    const dispatch = useAppDispatch();

    const { currentPage } = useAppSelector(state => state.movieReducer);
    const [, setQuery] = useSearchParams();
    const [totalPages] = useState(500);
    const [pagesToShow] = useState(15);
    const navigate = useNavigate();

    const prev = async () => {
        dispatch(movieActions.prevPage(currentPage));
        navigate(`?page=${currentPage - 1}`);
    };

    const next = async () => {
        dispatch(movieActions.nextPage(currentPage));
        navigate(`?page=${currentPage + 1}`);
    };

      const generatePageNumbers = () => {
        const current = currentPage;
        const last = totalPages;
        const start = Math.max(1, current - Math.floor(pagesToShow / 2));
        const end = Math.min(last, start + pagesToShow - 1);

        const pageNumbers = [];

        for (let i = start; i <= end; i++) {
            pageNumbers.push(i);

        }

        return pageNumbers;
    };
    return (
        <div>
            <ul className="pagination">
                <button onClick={async () => {
                    dispatch(movieActions.setPage(1));
                    navigate(`?page=${1}`);
                }} className="page-number" disabled={!prev}>
                   First page
                </button>
                <button onClick={prev} className="page-number" disabled={currentPage === 1}>
                    Prev
                </button>
                {generatePageNumbers().map((number) => (
                    <li
                        key={number}
                        onClick={async () => {
                            dispatch(movieActions.setPage(number));
                            navigate(`?page=${number}`);
                        }}
                        className={'page-number ' + (number === currentPage ? 'active' : '')}
                    >
                        {number}
                    </li>
                ))}
                <button onClick={next} className="page-number" disabled={currentPage === 500}>
                    Next
                </button>
                <button onClick={async () => {
                    dispatch(movieActions.setPage(500));
                    navigate(`?page=${500}`);
                }} className="page-number" disabled={!prev}>
                    Last page
                </button>
            </ul>
        </div>
    );
};
export {MoviePagination}