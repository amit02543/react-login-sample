import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';

import Likes from '../components/Likes/Likes';
import PageContent from '../components/PageContent/PageContent';
import Toast from '../components/UI/Toast/Toast';

import api from '../Helpers/AxiosClient';


function LikesPage() {

    const { likesMusic } = useLoaderData();

    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={likesMusic}>
                {
                    response => (
                        <PageContent title="Your Music!">
                            <p>Browse all your liked music!</p>
                            <Likes data={response} />
                        </PageContent>
                    )
                }
            </Await>
        </Suspense>
    );
}

export default LikesPage;


async function loadUserLikesMusic() {

    const username = localStorage.getItem('user');

    let responseData = [];

    await api.fetchLikedSongs(username)
        .then(response => responseData = response.data )
        .catch(err => Toast('error', err.response ? err.response.data.message : err.message));
        

    return responseData;
}


export function loader() {
    return defer({
        likesMusic: loadUserLikesMusic()
    });
};