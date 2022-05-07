const setEventListeners = () => {
    const teams = Array.from(document.querySelectorAll('.team-selectable'));
    const confirmBtnSelection = document.querySelector('.confirm-btn').querySelector('#selection');
    teams.forEach(team => {
        team.addEventListener('click', (e) => {
            console.log(team.getAttribute('data-team'));
            confirmBtnSelection.innerHTML = team.getAttribute('data-team');
            // team.children[0].style.border = '1px solid green'; will revisit this
        })
    });
}

export { setEventListeners };