import { Suspense } from 'react';
import { Await, defer, json, redirect, useLoaderData } from 'react-router-dom';

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


// async function loadUserCollectionMusicByName(collectionName) {

//     const username = localStorage.getItem('user');

//     const response = await fetch(`http://localhost:8080/user/${username}/collections/${collectionName}`);

//     if(!response.ok) {
//         throw json(
//             { message: 'Could not fetch user collection music'},
//             { status: 500 }
//         )
//     }


//     const resData = response.json();

//     return resData;
// }


export async function loader({ request, params }) {
    return defer({
        collectionMusic: loadUserCollectionMusic(),
        // collectionMusicByName: await loadUserCollectionMusicByName()
    });
};


// export async function action({ params, request }) {
//     const username = params.username;
//     const collectionName = params.collectionName;


//     const response = await fetch(`http://localhost:8080/user/${username}/collections/${collectionName}`);

//     if(!response.ok) {
//         throw json(
//             { message: 'Could not fetch user collection music'},
//             { status: 500 }
//         )
//     }

//     return redirect(`/collections/${collectionName}`);
// }