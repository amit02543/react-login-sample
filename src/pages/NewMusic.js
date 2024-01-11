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
    
    const response = await fetch('http://localhost:8080/spotify/latest');

    if(!response.ok) {
        throw json(
            { message: 'Could not fetch latest music'},
            { status: 500 }
        );
    }

    const resData = await response.json();

    return resData;
};


export function loader() {
    return defer({
        latestMusic: loadLatestMusic()
    });
};
