import { Slide, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Toast = (type, message) => {

    const options = {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide
    };


    switch(type) {
        
        case 'success': 
            return toast.success(message, options);

        case 'error': 
            return toast.error(message, options);

        case 'info': 
            return toast.info(message, options);

        case 'warning': 
            return toast.warn(message, options);

        default: 
            return toast(message, options);
    }

}

export default Toast;