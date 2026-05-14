<script lang="ts">
    function forceNumberToTwoDigits(num: number): string {
        let numString = `${num}`;

        if (numString.length < 2) {
            numString = `0${numString}`
        }

        return numString;
    }

    function simplifyDate(date: Date) {
        const simplifiedDateObj = {
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
            date: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()
        }

        return simplifiedDateObj;
    }

    function convertDateToBeats(date: Date): Number {
        const simplifiedDateObj = simplifyDate(date)

        let beatsFromDate: number = 0;
        beatsFromDate += (simplifiedDateObj.hours + 5 % 23) * 3600 // Converts hours to seconds and adds to final beats number
        beatsFromDate += simplifiedDateObj.minutes * 60; // Converts minutes to seconds and adds to final beats number
        beatsFromDate += simplifiedDateObj.seconds; // Adds seconds to final beats number
        beatsFromDate /= 86.4; // Converts total seconds to beats (seconds / 86.4 = beats)
        beatsFromDate = Math.floor(beatsFromDate); // Finally, floors the result

        return beatsFromDate;
    }

    function submitDateTime() {
        const dateTime = document.getElementById('dt') as HTMLInputElement;
        const errorOutput = document.getElementById('errorOutput') as HTMLParagraphElement;
        const beatsOutput = document.getElementById('beatsOutput') as HTMLParagraphElement;

        // Clear outputs
        errorOutput.style.color = "#a6adc8";
        errorOutput.innerText = ""
        beatsOutput.innerText = "";

        if (!dateTime.value) {
            errorOutput.style.color = "#f38ba8";
            errorOutput.innerText = "Error! Input isn't completed!"
            return;
        }

        let date = new Date(dateTime.value);
        let simplifiedDateObj = simplifyDate(date);
        let beats = convertDateToBeats(date);
        let monthName = date.toLocaleString('default', { month:'long'});
        let dayOffset = 0;

        if (Math.ceil((simplifiedDateObj.hours + 5) / 23) > 1) {
            dayOffset = Math.ceil((simplifiedDateObj.hours + 5) / 23);
            simplifiedDateObj.date += dayOffset;
        }

        beatsOutput.innerText = `${monthName} ${simplifiedDateObj.date}, ${simplifiedDateObj.year} at @${beats} beats`;
    }

    function updateCurrentTime() {
        // Get the elements used for the output of the time and beats
        const localTimeElement = document.getElementById('localTime') as HTMLParagraphElement;
        const beatsElement = document.getElementById('beats') as HTMLParagraphElement;

        // Gets the current date
        const date = new Date();
        const simplifiedDateObj = simplifyDate(date)

        const currentBeats = convertDateToBeats(date);

        let hoursString = forceNumberToTwoDigits(simplifiedDateObj.hours)
        let minutesString = forceNumberToTwoDigits(simplifiedDateObj.minutes)
        let secondsString = forceNumberToTwoDigits(simplifiedDateObj.seconds)

        const timeString = hoursString + ":" + minutesString + ":" + secondsString;
        const beatsString = `@${currentBeats}`;

        localTimeElement.innerText = timeString;
        beatsElement.innerText = beatsString;
    }

    setInterval(updateCurrentTime, 1000);
</script>

<h1>Time to Beats</h1>

<p>Local time:</p>
<p id="localTime">Local time:</p>
<br>
<p>Beats time:</p>
<p id="beats">Beats</p>
<br>
<div id="inp">
    <input type="datetime-local" name="" id="dt">
    <button on:click={submitDateTime}>Submit</button>
    <p id="errorOutput"></p>
</div>
<br>
<p>Beats output:</p>
<p id="beatsOutput"></p>


<style lang="scss">
@use "./styles.scss";
</style>
