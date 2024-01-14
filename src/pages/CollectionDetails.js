import { Suspense } from 'react';
import { Await, defer, json, redirect, useLoaderData } from 'react-router-dom';

import CollectionDetails from '../components/Collections/CollectionDetails';
import PageContent from '../components/PageContent/PageContent';

function CollectionDetailsPage() {

    const { collectionMusicByName } = useLoaderData();

    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={collectionMusicByName}>
                {
                    response => (
                        <PageContent title="Your Collections!">
                            {/* <p>Browse all your music collection!</p> */}
                            <CollectionDetails data={response} />
                        </PageContent>
                    )
                }
            </Await>
        </Suspense>
    );
}

export default CollectionDetailsPage;


async function loadUserCollectionMusicByName(collectionName) {

    const username = localStorage.getItem('user');

    const response = await fetch(`http://localhost:8080/user/${username}/collections/${collectionName}`);

    if(!response.ok) {
        throw json(
            { message: 'Could not fetch user collection music'},
            { status: 500 }
        )
    }


    const resData = response.json();

    return resData;
}


export async function loader({ request, params }) {
    return defer({
        collectionMusicByName: loadUserCollectionMusicByName(params.collectionName)
    });
};