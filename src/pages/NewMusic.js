import { Suspense } from 'react';
import { Await, defer, json, useLoaderData } from 'react-router-dom';

import NewMusic from '../components/NewMusic/NewMusic';
import PageContent from '../components/PageContent/PageContent';


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
    
    const response = await fetch(`http://localhost:8080/spotify/${username}/latest`);

    if(!response.ok) {
        throw json(
            { message: 'Could not fetch latest music'},
            { status: 500 }
        );
    }

    const latestAlbumData = await response.json();


    const collectionResponse = await fetch(`http://localhost:8080/user/${username}/collections`);

    if(!collectionResponse.ok) {
        throw json(
            { message: 'Could not fetch user collections name.'},
            { status: 500 }
        );
    } 

    const collectionData = await collectionResponse.json();

    return { albums: latestAlbumData.albums, collections: collectionData };
};


export function loader() {
    return defer({
        latestMusic: loadLatestMusic()
    });
};
