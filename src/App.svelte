<script lang='ts'>
    let theme = 'dark'

    function forceNumberToTwoDigits(num: number): string {
        let numString = `${num}`

        if (numString.length < 2) {
            numString = `0${numString}`
        }

        return numString
    }

    function isNumeric(input: any): boolean {
        return !isNaN(input)
    }

    function simplifyDate(date: Date) {
        const simplifiedDateObj = {
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
        }

        return simplifiedDateObj
    }

    function convertDateToBeats(date: Date): number {
        const simplifiedDateObj = simplifyDate(date)

        let beatsFromDate: number = 0
        beatsFromDate += (simplifiedDateObj.hours + 5 % 23) * 3600 // Converts hours to seconds and adds to final beats number
        beatsFromDate += simplifiedDateObj.minutes * 60 // Converts minutes to seconds and adds to final beats number
        beatsFromDate += simplifiedDateObj.seconds // Adds seconds to final beats number
        beatsFromDate /= 86.4 // Converts total seconds to beats (seconds / 86.4 = beats)
        beatsFromDate = Math.floor(beatsFromDate) // Finally, floors the result

        return beatsFromDate
    }

    function convertBeatsToSeconds(beats: number): number {
        const totalSeconds = beats * 86.4

        return totalSeconds
    }

    function convertSecondsToFullTime(seconds: number): string {
        seconds = Math.floor(seconds)
        let hours = Math.floor(seconds / 3600)
        let minutes = Math.floor((seconds - hours * 3600)/60)
        let secondsConverted = seconds - hours * 3600 - minutes * 60

        let hoursString = forceNumberToTwoDigits(hours - 5)
        let minutesString = forceNumberToTwoDigits(minutes)
        let secondsString = forceNumberToTwoDigits(secondsConverted)

        return `${hoursString}:${minutesString}:${secondsString}`
    }

    function submitTime() {
        const time = document.getElementById('timeInput') as HTMLInputElement
        const errorOutput = document.getElementById('etbErrorOutput') as HTMLParagraphElement
        const beatsOutput = document.getElementById('beatsOutput') as HTMLParagraphElement

        // Clear outputs
        errorOutput.style.color = 'var(--subtext-zero)'
        beatsOutput.innerText = ''

        if (!time.value) {
            errorOutput.style.display = 'block'
            errorOutput.style.color = 'var(--red)'
            errorOutput.innerText = "Error! Input isn't completed!"

            setInterval(() => {
                errorOutput.style.display = 'none'
            }, 3000)

            return
        }

        let hours = Number.parseInt(time.value.split(":")[0])
        let minutes = Number.parseInt(time.value.split(":")[1])

        let date = new Date()
        date.setHours(hours)
        date.setMinutes(minutes)

        let beats = convertDateToBeats(date)

        beatsOutput.style.display = 'block'
        beatsOutput.innerText = `@${beats} beats`
    }

    function submitBeats() {
        const beats = document.getElementById('beatsInput') as HTMLInputElement
        const errorOutput = document.getElementById('bteErrorOutput') as HTMLParagraphElement
        const edtOutput = document.getElementById('edtOutput') as HTMLParagraphElement

        // Clear outputs
        errorOutput.style.color = 'var(--subtext-zero)'
        edtOutput.innerText = ''

        if (!beats.value) {
            errorOutput.style.display = 'block'
            errorOutput.style.color = 'var(--red)'
            errorOutput.innerText = "Error! Input isn't completed!"

            setInterval(() => {
                errorOutput.style.display = 'none'
            }, 3000)

            return
        } else if (!isNumeric(beats.value)) {
            errorOutput.style.display = 'block'
            errorOutput.style.color = 'var(--red)'
            errorOutput.innerText = "Error! Inputted text wasn't a number!"

            setInterval(() => {
                errorOutput.style.display = 'none'
            }, 3000)

            return
        }

        let beatsValue = Number.parseFloat(beats.value)
        let seconds = convertBeatsToSeconds(beatsValue)
        let time = convertSecondsToFullTime(seconds)

        edtOutput.style.display = 'block'
        edtOutput.innerText = time
    }

    function updateCurrentTime() {
        // Get the elements used for the output of the time and beats
        const localTimeElement = document.getElementById('localTime') as HTMLParagraphElement
        const beatsElement = document.getElementById('beats') as HTMLParagraphElement

        // Gets the current date
        const date = new Date()
        const simplifiedDateObj = simplifyDate(date)

        const currentBeats = convertDateToBeats(date)

        let hoursString = forceNumberToTwoDigits(simplifiedDateObj.hours)
        let minutesString = forceNumberToTwoDigits(simplifiedDateObj.minutes)
        let secondsString = forceNumberToTwoDigits(simplifiedDateObj.seconds)

        const timeString = hoursString + ':' + minutesString + ':' + secondsString
        const beatsString = `@${currentBeats}`

        localTimeElement.innerText = timeString
        beatsElement.innerText = beatsString
    }

    function toggleTheme() {
        const root = document.querySelector(':root') as HTMLElement
        const themeToggle = document.getElementById('themeToggle') as HTMLButtonElement

        if (theme == 'dark') {
            root.style.setProperty('--crust', '#dce0e8')
            root.style.setProperty('--base', '#eff1f5')
            root.style.setProperty('--surface-zero', '#ccd0da')
            root.style.setProperty('--subtext-zero', '#6c6f85')
            root.style.setProperty('--text', '#4c4f69')
            root.style.setProperty('--mauve', '#8839ef')
            root.style.setProperty('--red', '#d20f39')
            root.style.setProperty('--blue', '#1e66f5')

            theme = 'light'
            themeToggle.innerText = '🌙'
        } else {
            root.style.setProperty('--crust', '#11111b')
            root.style.setProperty('--base', '#1e1e2e')
            root.style.setProperty('--surface-zero', '#313244')
            root.style.setProperty('--subtext-zero', '#a6adc8')
            root.style.setProperty('--text', '#cdd6f4')
            root.style.setProperty('--mauve', '#cba6f7')
            root.style.setProperty('--red', '#f38ba8')
            root.style.setProperty('--blue', '#89b4fa')

            theme = 'dark'
            themeToggle.innerText = '☀️'
        }
    }

    setInterval(updateCurrentTime, 1000)
</script>

<header>
    <button id="themeToggle" on:click={toggleTheme}>☀️</button>
</header>

<h1>Time to Beats</h1>
<p>Local time:</p>
<p id='localTime'>Local time:</p>
<br>
<p>Beats time:</p>
<p id='beats'>Beats</p>
<br>
<div class='inp'>
    <p>Convert EDT to beats</p>
    <input type='time' id='timeInput'>
    <button on:click={submitTime}>Submit</button>
    <p id='etbErrorOutput' class='collapsible'></p>
    <p id='beatsOutput' class='collapsible'></p>
</div>
<br>
<div class='inp'>
    <p>Convert beats to EDT</p>
    <input type='text' name='' id='beatsInput'>
    <button on:click={submitBeats}>Submit</button>
    <p id='bteErrorOutput' class='collapsible'></p>
    <p id='edtOutput' class='collapsible'></p>
</div>

<style>
    @import './styles.css'
</style>
