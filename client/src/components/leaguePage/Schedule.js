/* Libraries */
import React, { useEffect, useState } from "react";

/* Other Components */
import Fixture from './Fixture';

/* Internal Requirements */
import { toggleLeagueSection } from "../../js/animation";
import '../../css/leaguePage/schedule.css';

const Schedule = ({ players, fixtures, groups }) => {

    /* Use State */
    const [isSorted, setIsSorted] = useState(false);
    const [groupStage, setGroupStage] = useState([]);
    const [roundOf16, setRoundOf16] = useState([]);
    const [quarters, setQuarters] = useState([]);
    const [semis, setSemis] = useState([]);
    const [thirdPlace, setThirdPlace] = useState([]);
    const [final, setFinal] = useState([]);

    useEffect(() => {
        if (fixtures.length !== 0) {
            fixtures.sort((a, b) => {
                return a.fixture.timestamp - b.fixture.timestamp;
            });

            setGroupStage(fixtures.filter(f => {
                return f.league.round.includes('Group Stage');
            }));

            setRoundOf16(fixtures.filter(f => {
                return f.league.round.includes('8th Finals');
            }));

            setQuarters(fixtures.filter(f => {
                return f.league.round.includes('Quarter-finals');
            }));

            setSemis(fixtures.filter(f => {
                return f.league.round.includes('Semi-finals');
            }));

            setThirdPlace(fixtures.filter(f => {
                return f.league.round.includes('3rd Place Final');
            }));

            setFinal(fixtures.filter(f => {
                return f.league.round === 'Final';
            }));

            setIsSorted(true)
        }
    }, [fixtures]);

    let gameNumber = 0;

    return (
        <div className="schedule">
            <h1 className="section-title" onClick={(e) => toggleLeagueSection('.stage')}>Schedule</h1>
            {/* this can be cleaned up */}


            <div className="stage">
            <p className="stage-title">Group Stage</p>
            {
                (isSorted && groupStage.length !== 0) ?
                groupStage.map((game) => {
                    gameNumber++;
                    return(
                        <Fixture key={game.fixture.id} game={game} players={players} gameNumber={gameNumber} />
                    );
                })
                :
                'Games TDB'
            }
            <p className="stage-title">Round of 16</p>
            {
                (isSorted && roundOf16.length !== 0) ?
                roundOf16.map((game) => {
                    gameNumber++;
                    return(
                        <Fixture key={game.fixture.id} game={game} players={players} gameNumber={gameNumber} />
                    );
                })
                :
                'Games TDB'
            }
            <p className="stage-title">Quarter Finals</p>
            {
                (isSorted && quarters.length !== 0) ?
                quarters.map((game) => {
                    gameNumber++;
                    return(
                        <Fixture key={game.fixture.id} game={game} players={players} gameNumber={gameNumber} />
                    );
                })
                :
                'Games TDB'
            }
            <p className="stage-title">Semi Finals</p>
            {
                (isSorted && semis.length !== 0) ?
                semis.map((game) => {
                    gameNumber++;
                    return(
                        <Fixture key={game.fixture.id} game={game} players={players} gameNumber={gameNumber} />
                    );
                })
                :
                'Games TDB'
            }
            <p className="stage-title">Third Place Game (not counted)</p>
            {
                (isSorted && thirdPlace.length !== 0) ?
                thirdPlace.map((game) => {
                    gameNumber++;
                    return(
                        <Fixture key={game.fixture.id} game={game} players={players} gameNumber={gameNumber} />
                    );
                })
                :
                'Game TDB'
            }
            <p className="stage-title">Final</p>
            {
                (isSorted && final.length !== 0) ?
                final.map((game) => {
                    gameNumber++;
                    return(
                        <Fixture key={game.fixture.id} game={game} players={players} gameNumber={gameNumber} />
                    );
                })
                :
                'Game TDB'
            }
            </div>
        </div>
    );
}

export default Schedule;