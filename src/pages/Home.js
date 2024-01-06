import { Suspense } from 'react';
import { Await, defer, json, useLoaderData } from 'react-router-dom';

import Home from '../components/Home/Home';
import PageContent from '../components/PageContent/PageContent';


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

    const response = await fetch('http://localhost:8080/spotify/random');

    if(!response.ok) {
        throw json(
            { message: 'Could not fetch random music.'},
            { status: 500 }
        );
    } 
    
    const resData = await response.json();
    console.log(resData.tracks)

    return resData.tracks;
};


export function loader() {
    return defer({
        randomMusic: loadRandomMusic()
    });
};