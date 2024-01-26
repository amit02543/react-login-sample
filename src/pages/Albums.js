import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';

import Albums from '../components/Albums/Albums';
import PageContent from '../components/PageContent/PageContent';
import Toast from '../components/UI/Toast/Toast';

import api from '../Helpers/AxiosClient';


function AlbumsPage() {

    const { albums } = useLoaderData();

    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={albums}>
                {
                    response => (
                        <PageContent title="Your Albums!">
                            <p>Browse all your liked albums!</p>
                            <Albums data={response} />
                        </PageContent>
                    )
                }
            </Await>
        </Suspense>
    );
}

export default AlbumsPage;


async function loadUserAlbums() {

    const username = localStorage.getItem('user');

    let responseData;

    await api.fetchLikedAlbums(username)
        .then(response => responseData = response.data )
        .catch(err => Toast('error', err.response.data.message));
        

    return responseData;
}


export function loader() {
    return defer({
        albums: loadUserAlbums()
    });
};