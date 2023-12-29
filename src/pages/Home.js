import Home from '../components/Home/Home';
import PageContent from '../components/PageContent/PageContent';

function HomePage() {
    return (
        <PageContent title="Welcome!">
            <p>Browse all our amazing songs collection!</p>
            <Home />
        </PageContent>
    );
}

export default HomePage;
