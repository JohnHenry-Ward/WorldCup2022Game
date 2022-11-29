/* Other Components */
import Player from "./Player";

/* Internal Requirements */
import '../../css/leaguePage/standings.css';

const Players = ({ players, fixtures }) => {

    let prevScore = -1;
    let place = 0;

    return (
        <div className='player-scores'>
            <h5 className="section-title">Standings</h5>
            <table className="player-standings-table">
                <tbody>
                    {
                        players.map(p => {
                            if (prevScore !== p.score) {
                                place += 1;
                                prevScore = p.score;
                            }
                            return (
                                <Player key={p.playerNumber} player={p} place={place} />
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Players;