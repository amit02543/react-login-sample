import PageContent from '../components/PageContent/PageContent';
import Search from '../components/Search/Search';

function SearchPage() {
    return (
        <PageContent title="Search Music!">
            <p>Search your favourite music, artist or album here!</p>
            <Search />
        </PageContent>
    );
}

export default SearchPage;
