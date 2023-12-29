import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import PageContent from '../components/PageContent/PageContent';
import Profile from '../components/Profile/Profile';

function ProfilePage() {

    const { events } = useLoaderData();

    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={events}>
                { response => (
                    <PageContent title="Your Profile">
                        <Profile data={response} />
                    </PageContent>
                )}
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
        return resData;
    }
}
  

export function loader() {
    return defer({
        events: loadProfile(),
    });
}
  