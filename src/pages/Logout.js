import { redirect } from "react-router-dom";

export function action() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('profileUrl');
    localStorage.removeItem('spotify-font-size');

    return redirect('/');
}