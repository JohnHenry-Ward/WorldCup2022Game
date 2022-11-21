const teamCodes = require('../js/convert').teamCodes;

const calculateScores = (players, fixtures) => {
    console.log("Calculating Scores");
    if (players.length === 0 || players === null) {
        return -1;
    }

    let teamScores = { };

    for (let k in teamCodes) {
        teamScores[teamCodes[k]] = 0;
    }

    let roundPoints = {
        'Group Stage W': 2,
        'Group Stage T': 1,
        '8th Finals': 4,
        'Quarter-finals': 6,
        'Semi-finals': 8,
        '3rd Place Final': 0,
        'Final': 10
    }

    // calculate how many points each team has currently, O(32) time
    fixtures.forEach(f => {
        if (f.fixture.status.short === 'FT' || f.fixture.status.short === 'AET' || f.fixture.status.short === 'PEN') {
            const round = f.league.round;
            const homeTeam = f.teams.home.name;
            const homeGoals = f.goals.home;
            const awayTeam = f.teams.away.name;
            const awayGoals = f.goals.away;
            
            if (round.includes('Group Stage')) {
                if (homeGoals === awayGoals) {
                    teamScores[teamCodes[homeTeam]] += roundPoints['Group Stage T'];
                    teamScores[teamCodes[awayTeam]] += roundPoints['Group Stage T'];
                } else if (homeGoals > awayGoals) {
                    teamScores[teamCodes[homeTeam]] += roundPoints['Group Stage W'];
                } else if (awayGoals > homeGoals) {
                    teamScores[teamCodes[awayTeam]] += roundPoints['Group Stage W'];
                }
            } else {
                // in knockout stage, need to check for penalty shots
                if (f.fixture.status.short === 'PEN') {
                    if (f.score.penalty.home > f.score.penalty.away) {
                        teamScores[teamCodes[homeTeam]] += roundPoints[round];
                    } else {
                        teamScores[teamCodes[awayTeam]] += roundPoints[round];
                    }
                } else {
                    if (homeGoals > awayGoals) {
                        teamScores[teamCodes[homeTeam]] += roundPoints[round];
                    } else if (awayGoals > homeGoals) {
                        teamScores[teamCodes[awayTeam]] += roundPoints[round];
                    }
                }
            }
        }
    });

    // for each team in each player, update the players score field by the teams score sum
    players.forEach(p => {
        p['score'] = 0;
        p.teamsID.forEach(t => {
            p['score'] += teamScores[t];
        });
    });

    // sort the players by score, largest to smallest
    players.sort((a, b) => {
        return b.score < a.score ? -1 : 1;
    });

    return players;
}

export { calculateScores };