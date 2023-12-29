import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';
import { FaUser } from "react-icons/fa";

import classes from './Navigation.module.css';


const Navigation = () => {

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const profileUrl = localStorage.getItem('profileUrl');

    useRouteLoaderData('root');

    return (
        <nav className={classes.nav}>
            <ul>
                <li>
                    <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                            end
                        >
                        Home
                    </NavLink>
                </li>
                {!isLoggedIn && (
                    <li>
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                            end
                        >
                        Login
                        </NavLink>
                    </li>
                )}
                {!isLoggedIn && (
                    <li>
                        <NavLink
                            to="/register"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                            end
                        >
                        Register
                        </NavLink>
                    </li>
                )}
                {isLoggedIn && (
                    <li>
                        <NavLink
                            to="/search"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                            end
                        >
                        Search
                        </NavLink>
                    </li>
                )}
                {/* {isLoggedIn && (
                    <li>
                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                            end
                        >
                        Profile
                        </NavLink>
                    </li>
                )} */}
                {isLoggedIn && (
                    <li className={classes.dp}>
                        <NavLink
                            to="/search"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                            onClick={e => e.preventDefault()}
                            end
                        >
                        { (!profileUrl || 'null' === profileUrl) && <FaUser /> }
                        { profileUrl && 'null' !== profileUrl && <img src={profileUrl} alt='profile' className={classes.dpImage} />}
                        </NavLink>
                        <ul>
                            <li>
                                <NavLink
                                    to="/profile"
                                    className={({ isActive }) =>
                                        isActive ? classes.active : undefined
                                    }
                                    end
                                >
                                Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/settings"
                                    className={({ isActive }) =>
                                        isActive ? classes.active : undefined
                                    }
                                    end
                                >
                                Settings
                                </NavLink>
                            </li>
                            <li>
                                <Form action="/logout" method="post">
                                    <button>Logout</button>
                                </Form>
                            </li>
                        </ul>
                    </li>
                )}
                {/* {isLoggedIn && (
                    <li>
                        <Form action="/logout" method="post">
                            <button>Logout</button>
                        </Form>
                    </li>
                )} */}
            </ul>
        </nav>
    );
};

export default Navigation;
