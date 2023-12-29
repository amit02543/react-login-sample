import { json, redirect } from 'react-router-dom';
import Login from '../components/Login/Login';
import PageContent from '../components/PageContent/PageContent';

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
  
  
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });
  
  
    if(response.status === 422 || response.status === 401) {
      return response;
    }
  
  
    if(!response.ok) {
      throw json({ message: 'Could not authenticate user.'}, { status: 500 });
    }
  
  
    const resData = await response.json();
  
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('user', resData.username);
    localStorage.setItem('profileUrl', resData.profileUrl);

  
    return redirect('/');
  };