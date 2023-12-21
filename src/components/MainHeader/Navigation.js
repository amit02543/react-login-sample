import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';

import classes from './Navigation.module.css';

const Navigation = (props) => {

    const token = useRouteLoaderData('root');

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
                {!token && (
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
                {!token && (
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
                {/* {!props.isLoggedIn && (
                <li>
                    <a href="/register">Register</a>
                </li>
                )} */}
                {token && (
                <li>
                    <a href="/collection">Collection</a>
                </li>
                )}
                {token && (
                <li>
                    <a href="/profile">Profile</a>
                </li>
                )}
                {token && (
                    <li>
                        {/* <button onClick={props.onLogout}>Logout</button> */}
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
