import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';

import CollectionEdit from '../components/Collections/CollectionEdit';
import PageContent from '../components/PageContent/PageContent';
import Toast from '../components/UI/Toast/Toast';

import api from '../Helpers/AxiosClient';


function CollectionEditPage() {

    const { collectionByName } = useLoaderData();

    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={collectionByName}>
                {
                    response => (
                        <PageContent title={`Update ${response.name} collection!`}>
                            <p>You can upload image for your music collection here!</p>
                            <CollectionEdit data={response.data} />
                        </PageContent>
                    )
                }
            </Await>
        </Suspense>
    );
}

export default CollectionEditPage;


async function loadUserCollectionByName(collectionName) {

    const username = localStorage.getItem('user');

    let responseData = {
        name: collectionName,
        data: {}
    };


    await api.fetchUserCollectionDetailsByName(username, collectionName)
        .then(response => responseData.data = response.data )
        .catch(err => Toast('error', err.response ? err.response.data.message : err.message));

    
    return responseData;
}


export async function loader({ request, params }) {
    return defer({
        collectionByName: loadUserCollectionByName(params.collectionName)
    });
};