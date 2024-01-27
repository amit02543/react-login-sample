import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';

import Collections from '../components/Collections/Collections';
import PageContent from '../components/PageContent/PageContent';
import Toast from '../components/UI/Toast/Toast';

import api from '../Helpers/AxiosClient';


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

    let responseData = [];

    await api.fetchUserCollection(username)
        .then(response => responseData = response.data )
        .catch(err => { Toast('error', err.response ? err.response.data.message : err.message) });


    return responseData;
}


export async function loader({ request, params }) {
    return defer({
        collectionMusic: loadUserCollectionMusic()
    });
};