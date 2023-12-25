import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import Profile from '../components/Profile/Profile';

function ProfilePage() {

    const { events } = useLoaderData();

    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={events}>
                {(response) => <Profile data={response} />}
            </Await>
        </Suspense>
    );
}

export default ProfilePage;


async function loadProfile() {

    const username = localStorage.getItem('user');

    const response = await fetch(`http://localhost:8080/profile/${username}`);
  
    if (!response.ok) {
        throw json(
            { message: 'Could not fetch user profile.' },
            { status: 500 }
        );
    } else {
        const resData = await response.json();
        console.log('Response data: ', resData);
        return resData;
    }
}
  

export function loader() {
    return defer({
        events: loadProfile(),
    });
}
  