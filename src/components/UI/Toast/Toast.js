import React from "react";

import { Slide, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Toast = ({ type, message }) => {

    const successToast =  toast.success(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide
    });


    const errorToast =  toast.error(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide
    });


    const infoToast =  toast.info(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide
    });


    const defaultToast =  toast(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide
    });


    const toastType = defaultToast;

    if(type === 'success') {
        console.log('in success toast');
        toastType = successToast;
    } 

    if(type === 'error') {
        console.log('in error toast');
        toastType = errorToast;
    }

    if(type === 'info') {
        console.log('in info toast');
        toastType = infoToast
    }


    return {toastType};
}

export default Toast;