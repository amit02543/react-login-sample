import { Suspense } from 'react';
import { Await, defer, json, useLoaderData } from 'react-router-dom';

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
                        <PageContent title={`Edit ${response.name} collection!`}>
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

    // const response = await fetch(`http://localhost:8080/user/${username}/collections/${collectionName}/details`);

    // if(!response.ok) {
    //     throw json(
    //         { message: 'Could not fetch user collection music'},
    //         { status: 500 }
    //     )
    // }


    // const resData = await response.json();

    // return { name: collectionName, data: resData };

    let responseData = {
        name: collectionName,
        data: {}
    };


    await api.fetchUserCollectionDetailsByName(username, collectionName)
        .then(response => responseData.data = response.data )
        .catch(err => { Toast('error', err.response.data.message) });

    
    return responseData;
}


export async function loader({ request, params }) {
    return defer({
        collectionByName: loadUserCollectionByName(params.collectionName)
    });
};