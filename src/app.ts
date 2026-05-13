function updateCurrentTime() {
    // Setup time
    const localTimeElement = document.getElementById('localTime') as HTMLParagraphElement;
    const beatsElement = document.getElementById('beats') as HTMLParagraphElement;
    const date = new Date();
    const currentTime = {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
    }
    const currentBeats = Math.floor((((currentTime.hours + 5) % 24) * 3600 + currentTime.minutes * 60 + currentTime.seconds) / 86.4);

    let minutesString = `${currentTime.minutes}`.length < 2 ? `0${currentTime.minutes}` : `${currentTime.minutes}`;

    const timeString = `${currentTime.hours}:${minutesString}:${currentTime.seconds}`;
    const beatsString = `@${currentBeats}`;

    localTimeElement.innerText = timeString;
    beatsElement.innerText = beatsString;
}

setInterval(updateCurrentTime, 1000);
