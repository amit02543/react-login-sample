import { json } from 'react-router-dom';

import PageContent from '../components/PageContent/PageContent';
import Register from '../components/Register/Register';
import Toast from '../components/UI/Toast/Toast';

import api from '../Helpers/AxiosClient';


function RegisterPage() {
    return (
        <PageContent title="Register">
            <Register />
        </PageContent>
    );
}

export default RegisterPage;


export async function action({ request }) {

    const data = await request.formData();

    const registerData = {
        username: data.get('username'),
        email: data.get('email'),
        password: data.get('password'),
        confirmPassword: data.get('cpassword')
    };


    let responseData;

    let error;


    await api.register(registerData)
        .then(response => { 
            Toast('success', response.data.message); 
            responseData = {
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            }; 
        })
        .catch(err => {
            Toast('error', err.response ? err.response.data.message : err.message);
            error = err.response ? err.response.data : err;
        });


    if (error && (error.statusCode === 422 || error.statusCode === 401)) {
        return error;
    }


    if (error && error.statusCode !== 200) {
        return json({ message: 'Could not register user.' }, { status: 500 });
    }


    return responseData;
};