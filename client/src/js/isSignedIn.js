const getCookies = require('./getCookies');

const isSignedIn = () => {
    const cookies = getCookies.getCookies();
    return cookies['signedIn'] === 'true' ? true : false;
}

export { isSignedIn };