/* Libraries */
import React, { useEffect } from "react";

/* Other Components */
import Pick from "./Pick";

/* Internal Requirements */

const Order = ({ maxPicks, players, currentPick, order }) => {

    /* Use States */

    /* Use Effects */

    useEffect(() => {
        const orderElement = document.querySelector('.order-tracker');
        const currentPickElement = document.querySelector('.order-tracker-pick-current');
        orderElement.scrollTo(0, currentPickElement.offsetTop);
    }, []);

    let pickNum = 0;

    return (
        <div className='order-tracker'>
            {
                // ! isLoading &&
                order.map((pick => {
                    pickNum++;
                        return (
                            pickNum === currentPick ?
                            <Pick status='current' pickNum={pickNum} player={players[pick]} key={pickNum} />
                            :
                            pickNum > currentPick ?
                            <Pick status='incomplete' pickNum={pickNum} player={players[pick]} key={pickNum} />
                            :
                            <Pick status='complete' pickNum={pickNum} player={players[pick]} key={pickNum} />
                        )
                }))
            }
        </div>
    );
}

export default Order;