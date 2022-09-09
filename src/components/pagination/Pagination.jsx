import React from "react";
import Button from "../button/Button";
import "./pagination.scss";
export default function Pagination(props) {

    return (
        <div className="pagination">
            <Button className="btn-outline">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" ><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>  Prev
            </Button>
            <ul>
                <li className="active">1</li>
                <li>2</li>
                <li>3</li>
            </ul>
            <Button className="btn-outline">
                Next <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" ><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
            </Button>
        </div>
    )
}
