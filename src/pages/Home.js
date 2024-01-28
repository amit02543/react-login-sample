import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';

import Home from '../components/Home/Home';
import PageContent from '../components/PageContent/PageContent';
import Toast from '../components/UI/Toast/Toast';

import api from '../helpers/AxiosClient';


function HomePage() {

    const { randomMusic } = useLoaderData();

    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={randomMusic}>
                {
                    response => (
                        <PageContent title="Welcome!">
                            <p>Browse all our amazing songs collection!</p>
                            <Home data={response} />
                        </PageContent>
                    )
                }
            </Await>
        </Suspense>
    );
}

export default HomePage;


async function loadRandomMusic() {

    const username = localStorage.getItem('user');

    const responseData = {
        tracks: [],
        collections: []
    };


    
    await api.fetchRandomSongs(username)
        .then(response => responseData.tracks = response.data.tracks )
        .catch(err => Toast('error', err.response ? err.response.data.message : err.message));

    
    
    await api.fetchUserCollection(username)
        .then(response => responseData.collections = response.data )
        .catch(err => Toast('error', err.response ? err.response.data.message : err.message));


    return responseData;
};


export function loader() {
    return defer({
        randomMusic: loadRandomMusic()
    });
};