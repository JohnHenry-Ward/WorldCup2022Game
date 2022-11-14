import { teamCodes, fullNames } from "./convert";
import { requestDraftSelection } from "./requests";

const highlightGreen = (teamElement) => {
    let l = teamElement.querySelector('.left-round-draft');
    let r = teamElement.querySelector('.right-round-draft');
    let m = teamElement.querySelector('.team-name-td-draft');
    let select = '2px solid var(--green)';
    l.style.borderTop = select;
    l.style.borderLeft = select;
    l.style.borderBottom = select;
    r.style.borderTop = select;
    r.style.borderRight = select;
    r.style.borderBottom = select;
    m.style.borderTop = select;
    m.style.borderBottom = select;
}

const removeHighlight = (teamElement) => {
    let l = teamElement.querySelector('.left-round-draft');
    let r = teamElement.querySelector('.right-round-draft');
    let m = teamElement.querySelector('.team-name-td-draft');
    let blank = '2px solid white';
    l.style.borderTop = blank;
    l.style.borderLeft = blank;
    l.style.borderBottom = blank;
    r.style.borderTop = blank;
    r.style.borderRight = blank;
    r.style.borderBottom = blank;
    m.style.borderTop = blank;
    m.style.borderBottom = blank;
};

const selectTeam = (team, teams, setCurrentTeam) => {
    // deselect any and all
    teams.forEach((t) => {
        removeHighlight(t);
    });

    // select team
    const confirmBtnSelection = document.querySelector('.confirm-btn').querySelector('#selection');
    const confirmBtn = document.querySelector('.confirm-btn');
    highlightGreen(team);
    confirmBtnSelection.innerHTML = team.getAttribute('data-team');
    confirmBtn.style.background = '#27AE60';
    confirmBtn.style.color = 'white';
    confirmBtn.style.border = '3px solid white';
    setCurrentTeam(teamCodes[team.getAttribute('data-team')]);
}

const setEventListeners = (setCurrentTeam, draftedTeams) => {
    const teams = Array.from(document.querySelectorAll('.team-selectable'));
    const confirmBtnSelection = document.querySelector('.confirm-btn').querySelector('#selection');
    const confirmBtn = document.querySelector('.confirm-btn');
    
    teams.forEach(t => {
        let isDrafted = false;

        for (let i = 0; i < draftedTeams.length; i++) {
            if (Object.keys(draftedTeams[i]).includes(teamCodes[t.getAttribute('data-team')])) {
                isDrafted = true;
                t.style.cursor = 'default';
                t.childNodes[1].style.textDecoration  = 'line-through';
                t.childNodes[0].childNodes[0].style.opacity = '0.5';
                t.childNodes[2].childNodes[0].id = `player-circle-p${draftedTeams[i][teamCodes[t.getAttribute('data-team')]]}`;
                break;
            }
        }

        if (!isDrafted) {
            t.addEventListener('click', () => selectTeam(t, teams, setCurrentTeam));
        }
    });

    window.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ignore') !== 'true') {
            confirmBtnSelection.innerHTML = '';
            confirmBtn.style.background = 'white';
            confirmBtn.style.color = '#27AE60';
            confirmBtn.style.border = '3px solid #27AE60';
            setCurrentTeam(null);
            teams.forEach(t => {
                removeHighlight(t);
            });

        }
    });
}

const setElementsAsClickable = (currentPlayer, loggedInPlayer) => {
    console.log(currentPlayer);
    console.log(loggedInPlayer);
}

const randomOrder = (playerCount) => {
    let arr = [];
    for(let i = 0; i < playerCount; i++) {
        arr.push(i);
    }

    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    
        // swap elements arr[i] and arr[j]
        // we use "destructuring assignment" syntax to achieve that
        // you'll find more details about that syntax in later chapters
        // same can be written as:
        // let t = arr[i]; arr[i] = arr[j]; arr[j] = t
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}

const generateOrder = (playerCount) => {
    let order = [];
    const playerOrder = randomOrder(playerCount);
    const maxPicks = picksPerPlayer(playerCount) * playerCount;

    // snake format
    let currentPlayer = 0;
    let goingUp = true;
    for (let i = 0; i < maxPicks; i++) {
        if (goingUp) {
            if (currentPlayer >= playerOrder.length) {
                goingUp = false;
                currentPlayer--;
            }
        } else {
            if (currentPlayer < 0) {
                goingUp = true;
                currentPlayer++;
            }
        }

        order.push(playerOrder[currentPlayer]);

        if (goingUp) {
            currentPlayer++;
        } else {
            currentPlayer--;
        }
    }
    let currentPick = 1;
    return order.slice(currentPick-1);
}

const confirmDraftSelection = (team, playerNumber, leagueID) => {
    if (team !== null && playerNumber !== null && leagueID !== null) {
        const response = requestDraftSelection(team, playerNumber, leagueID);
        if (response.status === 'error') {
            //need to do something so we don't skip to next player, let this player re-pick?
            console.log('Error confirming draft selection');
            return false;
        } else {
            // cross out team/make them un-selectable
            const teamElement = document.querySelector("[data-team='"+fullNames[team]+"']");
            teamElement.style.cursor = 'default';
            teamElement.childNodes[1].style.textDecoration  = 'line-through';
            teamElement.childNodes[0].childNodes[0].style.opacity = '0.5';
            teamElement.childNodes[2].childNodes[0].id = `player-circle-p${playerNumber}`;
            removeHighlight(teamElement);
            teamElement.replaceWith(teamElement.cloneNode(true)); //removing event listener
            return true;
        }
    } else {
        window.alert('Please select a team first');
        console.log('ERROR: team, playerNumber, or leagueID is null');
        return false;
    }
}

const scrollOrderElement = (element) => {
    const orderElement = document.querySelector('.order-tracker');
    let nextPickElement = null;
    if (element === 'next') {
        nextPickElement = document.querySelector('.order-tracker-pick-incomplete');

    } else if (element === 'current') {
        nextPickElement = document.querySelector('.order-tracker-pick-current');
    }
    const scrollAmount = nextPickElement.offsetLeft;
    orderElement.scrollTo({
        top: 0,
        left: scrollAmount,
        behavior: "smooth"
    });
}

/* 
    Add team to playerNumber in draftedTeams, update use state setDraftedTeams
*/
const updateDraftedTeams = (team, playerNumber, draftedTeams, setDraftedTeams) => {
    let i = 0;
    let index = -1;
    let newDraftedTeams = []
    while (i < draftedTeams.length) {
        if (Object.keys(draftedTeams[i]).includes('TBD') && Object.values(draftedTeams[i]).includes(playerNumber)) {
            index = i;
            break;
        }
        i++;
    }
    i = 0;
    while (i < draftedTeams.length) {
        if(i === index) {
            newDraftedTeams.push({[team] : playerNumber});
        } else {
            newDraftedTeams.push(draftedTeams[i]);
        }
        i++;
    }
    setDraftedTeams(newDraftedTeams);
}

const goToNextPlayer = (currentPick, setCurrentPick) => {
    let newPick = currentPick + 1;
    setCurrentPick(newPick);
}

const picksPerPlayer = (playerCount) => {
    return Math.floor(32 / playerCount);
}

const getFuturePicks = (playerPickNum, playerCount) => {
    // we can do up to 32 because we won't index past what we need
    // this is really ugly, could probably be optimized
    const order = [];

    // snake format
    let currentPlayer = 1;
    let goingUp = true;
    for (let i = 1; i <= 32; i++) {
        if (goingUp) {
            if (currentPlayer > playerCount) {
                goingUp = false;
                currentPlayer--;
            }
        } else {
            if (currentPlayer < 1) {
                goingUp = true;
                currentPlayer++;
            }
        }

        order.push({[currentPlayer]: i});

        if (goingUp) {
            currentPlayer++;
        } else {
            currentPlayer--;
        }
    }

    let picks = [];
    order.forEach(pick => {
        if (Object.keys(pick)[0] === String(playerPickNum)) {
            picks.push(Object.values(pick)[0]);
        }
    });
    return picks;
}

const checkIfDraftIsDone = (currentPick, maxPicks) => {
    return maxPicks < currentPick;
}

export { setEventListeners, generateOrder, confirmDraftSelection, scrollOrderElement, setElementsAsClickable,
         picksPerPlayer, updateDraftedTeams, goToNextPlayer, getFuturePicks, checkIfDraftIsDone };