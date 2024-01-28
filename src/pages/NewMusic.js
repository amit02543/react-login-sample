import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';

import NewMusic from '../components/NewMusic/NewMusic';
import PageContent from '../components/PageContent/PageContent';
import Toast from '../components/UI/Toast/Toast';

import api from '../helpers/AxiosClient';


function NewMusicPage() {

    const { latestMusic } = useLoaderData();

    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={ latestMusic }>
                {
                    response => (
                        <PageContent title="Latest Trending Albums">
                            <p>Find all latest trending music albums here</p>
                            <NewMusic data={response} />
                        </PageContent>
                    )
                }
            </Await>        
        </Suspense>
    );
}

export default NewMusicPage;


async function loadLatestMusic() {

    const username = localStorage.getItem('user');

    const responseData = {
        albums: [],
        collections: []
    };


    await api.fetchLatestAlbums(username)
        .then(response => responseData.albums = response.data.albums )
        .catch(err => Toast('error', err.response ? err.response.data.message : err.message));

    
    await api.fetchUserCollection(username)
        .then(response => responseData.collections = response.data )
        .catch(err => Toast('error', err.response ? err.response.data.message : err.message));


    return responseData;
};


export function loader() {
    return defer({
        latestMusic: loadLatestMusic()
    });
};
