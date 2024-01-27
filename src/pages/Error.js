import { useRouteError } from 'react-router-dom';

import MainHeader from '../components/MainHeader/MainHeader';
import PageContent from '../components/PageContent/PageContent';
import Wrapper from '../Helpers/Wrapper';


function ErrorPage() {
    const error = useRouteError();

    let title = 'An error occurred!';
    let message = 'Something went wrong!';

    if (error.status === 500) {
        message = error.data.message;
    }

    if (error.status === 404) {
        title = 'Not found!';
        message = 'Could not find resource or page.';
    }

    return (
        <Wrapper>
            <MainHeader />
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </Wrapper>
    );
}

export default ErrorPage;
