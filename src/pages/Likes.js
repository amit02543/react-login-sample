import { Suspense } from 'react';
import { Await, defer, json, useLoaderData } from 'react-router-dom';

import Likes from '../components/Likes/Likes';
import PageContent from '../components/PageContent/PageContent';

function LikesPage() {

    const { likesMusic } = useLoaderData();

    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={likesMusic}>
                {
                    response => (
                        <PageContent title="Your Music!">
                            <p>Browse all your liked music!</p>
                            <Likes data={response} />
                        </PageContent>
                    )
                }
            </Await>
        </Suspense>
    );
}

export default LikesPage;


async function loadUserLikesMusic() {

    const username = localStorage.getItem('user');

    const response = await fetch(`http://localhost:8080/user/${username}/likes`);

    if(!response.ok) {
        throw json(
            { message: 'Could not fetch user liked music'},
            { status: 500 }
        )
    }


    const resData = response.json();

    return resData;
}


export function loader() {
    return defer({
        likesMusic: loadUserLikesMusic()
    });
};