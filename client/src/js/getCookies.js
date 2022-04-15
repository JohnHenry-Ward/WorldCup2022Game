/* Gets all cookies from the document and puts them into a hashable dictionary */
const getCookies = () => {
    const cookiesString = document.cookie.split(';');
    if (cookiesString.length === 1) { //probably a better way to do this, array is length 1 when there are no cookies
        return {};
    }
    const cookies = {};
    let c;
    for (let i = 0; i < cookiesString.length; i++) {
        c = cookiesString[i].split('=');
        cookies[c[0].trim()] = c[1].trim();
    }
    return cookies;
}

const clearCookies = () => {
    document.cookie = 'signedIn=; Max-Age=-9999999';
    document.cookie = 'userName=; Max-Age=-9999999';
    document.cookie = 'id=; Max-Age=-9999999';
    //need to set expiration of userName and id to expire immediatly
}

export { getCookies, clearCookies };