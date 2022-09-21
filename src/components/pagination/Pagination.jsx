import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./pagination.scss";
export default function Pagination(props) {
    const { search } = useLocation()
    const searchPage = new URLSearchParams(search);
    const currentPage = parseInt(searchPage.get('page') || "1")
    let totalPage = Math.floor(props.totalPage / 20)

    const renderPage = () => {
        if (totalPage <= 1) return null

        let startPos = currentPage - 2,
            endPos = currentPage + 2

        if (startPos < 1) {
            startPos = 1
            endPos = 5
        }

        if (endPos > totalPage) {
            endPos = totalPage
            startPos = endPos - 4

            if (startPos < 1) startPos = 1
        }

        let listPage = []


        for (let i = startPos; i <= endPos; i++) {

            searchPage.set('page', i)
            const pathSearch = searchPage.toString()
            listPage.push(
                <li key={ i } className={ `page-item ${i === currentPage ? 'active' : ''} ` } >
                    <Link className="page-link" to={ `?${pathSearch}` } >{ i }</Link>
                </li >
            )

        }


        return listPage


    }

    searchPage.set('page', currentPage - 1)
    let prevPath = '?' + searchPage.toString()

    searchPage.set('page', currentPage + 1)
    let nextPath = '?' + searchPage.toString()

    return (
        <div className="pagination">
            <ul>
                {
                    currentPage > 1 && (
                        <li className="prev">
                            <Link to={ prevPath }>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" ><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>  Prev
                            </Link>
                        </li>
                    )
                }

                {
                    renderPage()
                }
                {
                    currentPage < totalPage && (
                        <li className="next">
                            <Link to={ nextPath }>
                                Next <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" ><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
                            </Link>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}
