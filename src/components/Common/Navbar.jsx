import { Link } from 'react-router-dom';
import Logo from '../../Assets/nav-logo.png';
import { useRef } from 'react';

const Navbar = () => {

    const navbarData = [
        {
            id: 1,
            title: "Home",
            path: "/"
        },
        {
            id: 2,
            title: "About",
            path: "/about"
        },
        {
            id: 3,
            title: "Services",
            path: "/service"
        },
        {
            id: 4,
            title: "Contact",
            path: "/contact"
        },
        {
            id: 6,
            title: "Blog",
            path: "/blog"
        },
        {
            id: 7,
            title: "FAQ",
            path: "/faq"
        },
    ];

    const navbarCollapseRef = useRef(null);

    const handleLinkClick = () => {
        if (navbarCollapseRef.current.classList.contains('show')) {
            navbarCollapseRef.current.classList.remove('show');
        }
    };

    return (
        <>
            <div
                className="d-flex  w-100 py-2 position-absolute "
                style={{
                    zIndex: 999
                }}
            >
                <nav
                    className="navbar navbar-expand-lg  w-100 nav_bg"
                    style={{
                        background: '#fff',
                        height: '100px'
                    }}
                >
                    <div className="container-fluid d-flex justify-content-between navbar_tab_container m-0 p-0 ">

                    <Link
                            className="navbar-brand"
                            to="/"
                        >
                            <img
                                src={Logo}
                                className="align-text-top"
                                alt='OBS_logo'
                                style={{
                                    width: '280px',
                                    height: '85px'
                                }}
                            />
                        </Link>
                        <button
                            className="navbar-toggler navbar-light"
                            style={{
                                color: 'white',
                                border: 'none'
                            }}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span
                                className="navbar-toggler-icon"
                                style={{
                                    color: 'red'
                                }}
                            >

                            </span>
                        </button>
                        
                        <div
                            className="collapse navbar-collapse justify-content-center nav_container "
                            id="navbarNav"
                            ref={navbarCollapseRef}>
                            <ul className="navbar-nav gap-5 p-4" >
                                {
                                    navbarData.map((navbar) => (
                                        <li
                                            className="nav-item"
                                            key={navbar.id}
                                            
                                        >
                                            <Link
                                                className="nav-link"
                                                to={navbar.path}
                                                onClick={handleLinkClick}
                                            >
                                                {navbar.title}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        
                        
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbar;