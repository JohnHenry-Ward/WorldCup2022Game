/* Libraries */
const axios = require('axios');

/* Internal Requirements */
const popup = require('./popup');

const createLeague = async (name, password, dateTime, userID) => {
    axios({
        method: 'POST',
        url: '/leagues/create',
        data: {
            leagueName: name,
            leaguePassword: password,
            draftDate: dateTime,
            username: userID
        }
    })
    .then((res) => {
        console.log('SUCCESS');
        popup.openPopup('#joinError');
        document.querySelector('#joinError .text').innerHTML = "League created! Refresh the page";
    })
    .catch((error) => {
        console.log('FAILURE');
        console.log(error);
        popup.openPopup('#joinError');
        document.querySelector('#joinError .text').innerHTML = "Error: " + error;
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
        } else {
            popup.openPopup('#joinError');
            document.querySelector('#joinError .text').innerHTML = "You've joined the league! Refresh the page"
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

const loginUser = async (username, password) => {
    
    return axios({
        method: 'POST',
        url: '/login/loginUser',
        data: {
            username: username,
            password: password
        }
    })
    .then((res) => {
        if (res.data.status === 'error') {
            return {
                "status": "error",
                "msg": "error signing in"
            }
        }
        else {
            return {
                "status": "success"
            };
        }
    })
    .catch((error) => {
        console.log('Request failed!')
        return {
            "status": "error",
            "msg": "error signing in"
        }
    });
}

const createUser = async (username, password) => {

    return axios({
        method: 'POST',
        url: '/login/createUser',
        data: {
            username: username,
            password: password
        }
    })
    .then((res) => {
        return res.data;
    })
    .catch((error) => {
        console.log('Request failed!');
        console.log(error);
        return {
            "status": "error",
            "msg": "error creating account"
        }
    });
}

const startDraft = (leagueID, order, totalPicks) => {
    return axios({
        method: 'POST',
        url: '/leagues/startDraft',
        data: {
            leagueID,
            order,
            totalPicks
        }
    })
    .then((res) => {
        return res.data
    })
    .catch((error) => {
        console.log('Request failed!');
        console.log(error);
        return {
            "status": "error",
            "msg": "error starting draft"
        }
    })
}

const endDraft = (leagueID) => {
    return axios({
        method: 'POST',
        url: '/leagues/endDraft',
        data: {
            leagueID
        }
    })
    .then((res) => {
        return res.data;
    })
    .catch((error) => {
        console.log('Request failed!');
        console.log(error);
    })
}

const getTeams = () => {
    return axios({
        method: 'GET',
        url: '/teams'
    })
    .then((res) => {
        return res.data
    })
    .catch((error) => {
        console.log(error);
    });
}

export { createLeague, joinLeague, getLeagues, getLeagueData, getFixtures, getGroupStage,
         requestDraftSelection, loginUser, createUser, startDraft, endDraft, getTeams }