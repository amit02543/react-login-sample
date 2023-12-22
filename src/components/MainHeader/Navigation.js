import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';

import classes from './Navigation.module.css';

const Navigation = () => {

    const isLoggedIn = localStorage.getItem('isLoggedIn');

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
                        to="/collection"
                        className={({ isActive }) =>
                            isActive ? classes.active : undefined
                        }
                        end
                        >
                        Collection
                        </NavLink>
                    </li>
                )}
                {isLoggedIn && (
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
                )}
                {isLoggedIn && (
                    <li>
                        <Form action="/logout" method="post">
                            <button>Logout</button>
                        </Form>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navigation;
