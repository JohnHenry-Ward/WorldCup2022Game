const countdown = (countingTo) => {
    const _second = 1000;
    const _minute = _second * 60;
    const _hour   = _minute * 60;
    const _day    = _hour * 24;

    const now = new Date();
    const distance = countingTo - now;

    if (distance < 0) {
        console.log('EXPIRED');
    }

    let days = Math.floor(distance / _day);
    let hours = Math.floor((distance % _day) / _hour);
    let minutes = Math.floor((distance % _hour) / _minute);
    let seconds = Math.floor((distance % _minute) / _second);

    return {
        "days": days,
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds
    }
}

export { countdown }