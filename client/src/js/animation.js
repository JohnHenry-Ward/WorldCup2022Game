const toggleLeagueSection = (target) => {
    const section = document.querySelector(target);
    if (Array.from(section.classList).includes('collapsed')) {
        section.classList.remove('collapsed');
    } else {
        section.classList.add('collapsed');
    }
}

export { toggleLeagueSection };