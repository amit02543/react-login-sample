import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';

import CollectionDetails from '../components/Collections/CollectionDetails';
import PageContent from '../components/PageContent/PageContent';
import Toast from '../components/UI/Toast/Toast';

import api from '../Helpers/AxiosClient';


function CollectionDetailsPage() {

    const { collectionMusicByName } = useLoaderData();

    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={collectionMusicByName}>
                {
                    response => (
                        <PageContent title={response.name}>
                            <p>You can view or updte your music collection here!</p>
                            <CollectionDetails data={response.data} />
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

    const responseData = {
        name: collectionName,
        data: []
    };

    await api.fetchUserCollectionByName(username, collectionName)
        .then(response => responseData.data = response.data)
        .catch(err => Toast('error', err.response ? err.response.data.message : err.message));


    return responseData;
}


export async function loader({ request, params }) {
    return defer({
        collectionMusicByName: loadUserCollectionMusicByName(params.collectionName)
    });
};