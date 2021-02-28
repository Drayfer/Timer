let liSave = []
////////

let memoryDate = localStorage
let startTimer = 0
let buttonStop = document.createElement('input')
buttonStop.className = "stop"
buttonStop.type = 'button'
buttonStop.value = 'Сохранить'
buttonStop.addEventListener('click', clockStopTimer)
document.querySelector('.start').after(buttonStop)
buttonStop.hidden = true

    let hours = document.querySelector('.hours')
    let minutes = document.querySelector('.minutes')
    let seconds = document.querySelector('.seconds')
    let miliseconds = document.querySelector('.miliseconds')
if (!memoryDate.length) {
    hours.innerHTML = '00:'
    minutes.innerHTML = '00:'
    seconds.innerHTML = '00:'
    miliseconds.innerHTML = '000'
} else {
    tickTime()
    document.querySelector('.start').setAttribute('value', 'Пауза')
    buttonStop.hidden = false;

    (!memoryDate.getItem('liSave') == '') ? liSave = memoryDate.getItem('liSave').split(',') : liSave = []

    /////// вызов из памяти списка результатов и публикация при перезагрузке страницы
    // let liString
    // (!memoryDate.getItem('liSave') == '') ? liString = memoryDate.getItem('liSave') : liString = 0
    // console.log(liString)
    // liSave = liString.split(',')
    liSave.forEach(element => {
        let result = document.createElement('li')
        result.innerHTML = element
        document.querySelector('.listresults').append(result)
    })
    //
   //(!memoryDate.getItem('liSave') == '') ? (liSave = memoryDate.getItem('liSave').split(',')) : liSave = 0
    console.log(liSave)
           /////
}


function tickTime() {
    let dat
    (!memoryDate.getItem('memory') == '') ? dat = Date.now() : dat = memoryDate.getItem('memory')
    (!memoryDate.getItem('memory') == '') ? memoryDate.setItem('memory', dat) : memoryDate.getItem('memory')
    startTimer = setInterval(() => {
        let nowDate = Date.now() - memoryDate.getItem('memory')
        let ti = new Date
        ti.setMilliseconds(parseInt(((nowDate) % 1000)))
        ti.setSeconds(parseInt(((nowDate) / 1000) % 60))
        ti.setMinutes(parseInt(((nowDate) / (1000 * 60)) % 60))
        ti.setHours(parseInt(((nowDate) / (1000 * 60 * 60)) % 24))
        let ho = (ti.getHours() < 10) ? ('0' + ti.getHours() + ':') : ti.getHours() + ':'
        let mi = (ti.getMinutes() < 10) ? ('0' + ti.getMinutes() + ':') : ti.getMinutes() + ':'
        let sec = (ti.getSeconds() < 10) ? ('0' + ti.getSeconds() + ':') : ti.getSeconds() + ':'
        let mil = (ti.getMilliseconds() < 10) ? ('00' + ti.getMilliseconds()) : ti.getMilliseconds()
        && (ti.getMilliseconds() < 100) ? ('0' + ti.getMilliseconds()) : ti.getMilliseconds()
        hours.innerHTML = ho
        minutes.innerHTML = mi
        seconds.innerHTML = sec
        miliseconds.innerHTML = mil
    }, 10)
}

function clockStartTimer() {
    if ((seconds.innerHTML == '00:') && (miliseconds.innerHTML == '000')) {
        document.querySelector('.start').setAttribute('value', 'Пауза')
        buttonStop.hidden = false
        tickTime()
    } else if ((seconds.innerHTML !== '00:') && (miliseconds.innerHTML !== '000')
                && document.querySelector('.start').value == 'Пауза') {
        document.querySelector('.start').setAttribute('value', 'Продолжить')
        clearInterval(startTimer)
        buttonStop.value = 'Сбросить'
    } else if((seconds.innerHTML !== '00:') && (miliseconds.innerHTML !== '000')
                && document.querySelector('.start').value == 'Продолжить') {
        buttonStop.value = 'Сохранить'
        document.querySelector('.start').setAttribute('value', 'Пауза')
        tickTime()
    }
}


function clockStopTimer() {
    if( buttonStop.value == 'Сохранить') {
        let result = document.createElement('li')
        result.innerHTML = hours.innerHTML + minutes.innerHTML + seconds.innerHTML + miliseconds.innerHTML
        document.querySelector('.listresults').append(result)
        ///////// добавление в память списка результатов
        liSave.push(result.innerHTML)
        console.log(liSave)
        memoryDate.setItem('liSave', liSave)
        ///////


    } else {
        hours.innerHTML = '00:'
        minutes.innerHTML = '00:'
        seconds.innerHTML = '00:'
        miliseconds.innerHTML = '000'
        document.querySelector('.start').value = 'Старт'
        buttonStop.value = 'Сохранить'
        buttonStop.hidden = true
        document.querySelector('.listresults').innerHTML = ''
        memoryDate.setItem('memory', 0)
        memoryDate.setItem('liSave', '')
        liSave = []
    }
}
// Наведение мыши на список результатов
    document.querySelector('ol').addEventListener('mouseover', function (event) {
        event.target.style.color = 'red'
    })
    document.querySelector('ol').addEventListener('mouseout', function (event) {
        event.target.style.color = ''
    })
    document.querySelector('ol').addEventListener("dblclick", function( event ) {
    event.target.remove()
    liSave.splice(liSave.indexOf(event.target.innerHTML), 1)
    memoryDate.setItem('liSave', liSave)
    }, false);



