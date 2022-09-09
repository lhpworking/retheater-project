import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HOME_PATH } from "../../constants/path";
import Button from "../button/Button";
import './header.scss';

export default function Header() {
    const [scroll, setScroll] = useState(false)
    useEffect(() => {
        const { offsetHeight } = document.querySelector("header")
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > offsetHeight - 1)
        })
    }, [])
    return (
        <header className={ scroll ? "active" : "" }>
            <div className="container-fluid">
                <Link to={ HOME_PATH } className="logo">
                    <img src="/logo.png" alt="logo" />
                </Link>
                <div className="auth">
                    <Link to={ "" } className="search">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                        >
                            <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                        </svg>
                    </Link>
                    {/* <Link to={ "" } >
                        <Button className="btn-outline">
                            Login
                        </Button>
                    </Link> */}
                </div>
            </div>
        </header>
    )
}
