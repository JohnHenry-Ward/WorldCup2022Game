const closePopup = (target) => {
    const popup = document.querySelector(target);
    popup.style.display = 'None';
}

const openPopup = (target) => {
    const popup = document.querySelector(target);
    popup.style.display = 'Flex';
}

export { closePopup, openPopup };