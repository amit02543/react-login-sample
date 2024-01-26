import { json, redirect } from 'react-router-dom';

import Login from '../components/Login/Login';
import PageContent from '../components/PageContent/PageContent';
import Toast from '../components/UI/Toast/Toast';

import api from '../Helpers/AxiosClient';


function LoginPage() {
    return (
        <PageContent title="Login">
            <Login />
        </PageContent>
    );
}

export default LoginPage;


export async function action({ request }) {

    const data = await request.formData();

    const loginData = {
        username: data.get('username'),
        password: data.get('password')
    };


    let responseData;

    let error;


    await api.login(loginData)
        .then(response => { 
            Toast('success', response.data.message);
            responseData = response.data; 
        })
        .catch(err => { 
            Toast('error', err.response.data.message);
            error = err.response.data; 
        });


    if (error && (error.statusCode === 422 || error.statusCode === 401)) {
        return error;
    }


    if (error && error.statusCode !== 200) {
        return json({ message: 'Could not authenticate user.' }, { status: 500 });
    }


    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('user', responseData.username);
    localStorage.setItem('profileUrl', responseData.profileUrl);


    return redirect('/');
};