/* Libraries */
const axios = require('axios');

/* Internal Requirements */
const popup = require('./popup');

const createLeague = async (name, password, dateTime) => {
    axios({
        method: 'POST',
        url: '/leagues/create',
        data: {
            leagueName: name,
            leaguePassword: password,
            draftDate: dateTime
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
        if (res.data.status === 'error') {
            popup.openPopup('#joinError');
            document.querySelector('#joinError .text').innerHTML = res.data.msg;
            console.log(res.data.msg);
        }
    })
    .catch((error) => {
        console.log('Request failed');
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

const getFixtures = async () => {
    return axios({
        method: 'GET',
        url: '/api/fixtures'
    })
    .then(res => res.data)
    .catch(error => console.log(error));
}

const getGroupStage = async () => {
    return axios({
        method: 'GET',
        url: '/api/groupStage'
    })
    .then(res => res.data)
    .catch(error => console.log(error));
}

const requestDraftSelection = async (team, playerNumber, leagueID) => {

    return axios({
        method: 'POST',
        url: '/leagues/pickConfirm',
        data: {
            team: team,
            playerNumber: playerNumber,
            leagueID: leagueID
        }
    })
    .then((res) => {
        if (res.data.status === 'error') {
            console.log('Error saving the pick');
        } else if (res.data.status === 'success') {
            console.log('Pick saved succesfully');
        }
        return res;
    })
    .catch((error) => {
        console.log('Request failed');
        console.log(error);
        return {
            "status": "error",
            "msg": "error sending post request"
        }
    });
    
}

export { createLeague, joinLeague, getLeagues, getLeagueData, getFixtures, getGroupStage,
         requestDraftSelection }