import PageContent from '../components/PageContent/PageContent';
import Settings from '../components/Settings/Settings';

function SettingsPage() {
    return (
        <PageContent title="Settings">
            <p>View or update your profile settings</p>
            <Settings />
        </PageContent>
    );
}

export default SettingsPage;