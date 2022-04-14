/* Libraries */
const axios = require('axios');

const createLeague = async (name, password, count) => {
    axios({
        method: 'POST',
        url: '/leagues/create',
        data: {
            leagueName: name,
            leaguePassword: password,
            numberOfPlayers: count
        }
    })
    .then((res) => {
        console.log('SUCCESS');
        console.log(res);
    })
    .catch((error) => {
        console.log('FAILURE');
        console.log(error);
    });
}

const joinLeague = async (ID, password) => {
    axios({
        method: 'POST',
        url: '/leagues/join',
        data: {
            leagueID: ID,
            leaguePassword: password
        }
    })
    .then((res) => {
        console.log('SUCCESS');
        console.log(res);
    })
    .catch((error) => {
        console.log('FAILURE');
        console.log(error);
    });
}

const getLeagues = async (ID) => {
    ID = ID.replace('%40', '@');
    return axios({
        method: 'GET',
        url: `/users/${ID}`
    })
    .then(res => res.data['leagues'])
    .catch(error => console.log(error));
}

const getLeagueData = async (ID) => {
    return axios({
        method: 'GET',
        url: `/leagues/${ID}`
    })
    .then(res => res.data)
    .catch(error => console.log(error));
}

export { createLeague, joinLeague, getLeagues, getLeagueData }