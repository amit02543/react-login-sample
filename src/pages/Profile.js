import { Suspense } from 'react';
import { useLoaderData, defer, Await } from 'react-router-dom';

import PageContent from '../components/PageContent/PageContent';
import Profile from '../components/Profile/Profile';
import Toast from '../components/UI/Toast/Toast';

import api from '../helpers/AxiosClient';


function ProfilePage() {

    const { profile } = useLoaderData();

    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={profile}>
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

    let responseData = {};

    await api.fetchUserProfile(username)
        .then(response => responseData = response.data)
        .catch(err => Toast('error', err.response ? err.response.data.message : err.message));


    return responseData;
}
  

export function loader() {
    return defer({
        profile: loadProfile(),
    });
}
  