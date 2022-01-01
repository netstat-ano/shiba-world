const validate = (data, type, password = '') => {
    if (type === 'email') {
        if (data.includes('@') && data.includes('.')) {
            return true;
        }
        return false;
    } else if (type === 'password' || type === 'username') {
        if (data.length > 6) {
            return true;
        }
        return false;
    } else if (type === 'retypePassword') {
        if(data === password && data.length > 6){
            return true;
        }
        else{
            return false;
        }
    }
};
export default validate;
