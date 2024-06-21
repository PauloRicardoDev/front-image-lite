import {toast, TypeOptions} from 'react-toastify'

export const useNotification = () => {
    function notify(message: string, level: 'success' | 'info' | 'warning' | 'error') {
        toast(message, {
            type: level as TypeOptions,
        });
    }

    return {
        notify,
    };

}