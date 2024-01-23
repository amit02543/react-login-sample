import { Suspense } from 'react';
import { Await, defer, json, useLoaderData } from 'react-router-dom';

import Albums from '../components/Albums/Albums';
import PageContent from '../components/PageContent/PageContent';


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

    const response = await fetch(`http://localhost:8080/user/${username}/albums`);


    if(!response.ok) {
        throw json(
            { message: 'Could not fetch user albums'},
            { status: 500 }
        )
    }


    const resData = response.json();

    return resData;
}


export function loader() {
    return defer({
        albums: loadUserAlbums()
    });
};