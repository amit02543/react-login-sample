import { redirect } from "react-router-dom";

export function action() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('profileUrl');
    localStorage.removeItem('spotify-font-size');
    localStorage.removeItem('spotify-mode');
    localStorage.removeItem('spotify-toast-position');
    localStorage.removeItem('user');
    localStorage.removeItem('view-type');

    return redirect('/');
}