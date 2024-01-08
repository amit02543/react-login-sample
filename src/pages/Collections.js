import { Suspense } from 'react';
import { Await, defer, json, useLoaderData } from 'react-router-dom';

import Collections from '../components/Collections/Collections';
import PageContent from '../components/PageContent/PageContent';

function CollectionsPage() {

    const { collectionMusic } = useLoaderData();

    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={collectionMusic}>
                {
                    response => (
                        <PageContent title="Your Collections!">
                            <p>Browse all your music collection!</p>
                            <Collections data={response} />
                        </PageContent>
                    )
                }
            </Await>
        </Suspense>
    );
}

export default CollectionsPage;


async function loadUserCollectionMusic() {

    const username = localStorage.getItem('user');

    const response = await fetch(`http://localhost:8080/user/${username}/collections`);

    if(!response.ok) {
        throw json(
            { message: 'Could not fetch user collection music'},
            { status: 500 }
        )
    }


    const resData = response.json();

    return resData;
}


export function loader() {
    return defer({
        collectionMusic: loadUserCollectionMusic()
    });
};