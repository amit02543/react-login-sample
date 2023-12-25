import { redirect } from "react-router-dom";

export function action() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');

    return redirect('/');
}