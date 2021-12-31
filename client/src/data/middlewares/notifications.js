import { toast } from 'react-toastify';

const notificationsMiddleware = () => next => action => {
    if (action.successMessage && /(.*)_(SUCCESS)/.test(action.type)) { // sukamy słowa success w wyrażenieach nieregularnych tz. RegExp..
        toast.success(action.successMessage, {
            position: toast.POSITION.TOP_RIGHT
        });
    }
    next(action); // if you don't add this your app will be loading all the time and don't start
}

export default notificationsMiddleware;