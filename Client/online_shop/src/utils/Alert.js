import Swal from 'sweetalert2';

export const fireAlert = ( message, text = false, isError = false ) => {
    Swal.fire({
        icon: isError ? 'error' : 'success',
        title: message, 
        text: text ? text : null,
    });
};
