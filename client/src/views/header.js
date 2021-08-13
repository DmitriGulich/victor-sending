import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
    const { user, isAuth } = useSelector(state => state.auth);

    return ( 
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark mb-3">
            <div className="container">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/send">Send</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/smtp">Settings</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin">Admin</Link>
                    </li>
                </ul>

                <ul className="navbar-nav ml-auto">
                    {isAuth ? (
                        <>
                            <li className="nav-item">
                                <Link to="/profile" className="nav-link">{user.username}</Link>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link">Log out</span>
                            </li>
                        </>
                    ) : (
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
     );
}
 
export default Header;