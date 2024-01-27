import { Outlet } from 'react-router-dom';

import { ToastContainer, Slide } from 'react-toastify';

import MainHeader from '../components/MainHeader/MainHeader';
import Wrapper from '../Helpers/Wrapper';


function RootLayout() {

    return (
        <Wrapper>
            <MainHeader />
            <main>
                <Outlet />
            </main>
            <ToastContainer 
                position="bottom-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Slide}
                // transition: Slide 
            />
        </Wrapper>
    );
}
    
export default RootLayout;