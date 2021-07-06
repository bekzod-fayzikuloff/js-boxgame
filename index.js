let $startButton = document.querySelector('#start')
let $gameArea = document.querySelector('#game')
let $time = document.querySelector('#time')

let $result = document.querySelector('#result')
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')

let $inputGameTime = document.querySelector('input')

let isGameStarted = false
let score = 0


$startButton.addEventListener('click', ()=> {
    $time.textContent = $inputGameTime.value
    score = 0
    $gameArea.style.background = '#fff'
    $timeHeader.classList.remove('hide')
    $resultHeader.classList.add('hide')
    $startButton.classList.add('hide')
    isGameStarted = true

    let interval = setInterval(() => {
        let timeValue = parseFloat($time.textContent)
        if (timeValue <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (timeValue - 0.1).toFixed(1) 
        }
    }, 100)

    spawnSquare()
})

$gameArea.addEventListener('click', (event)=> {
    if (!isGameStarted) {
        return
    }

    if (event.target.dataset.box){
        score ++
        spawnSquare()
    }
})


function spawnSquare() {
    let boxSize = getRandom(30, 100)
    let boundArea = $gameArea.getBoundingClientRect()

    let maxTop = boundArea.height - boxSize
    let maxLeft = boundArea.width - boxSize

    const collorsArray = [
        '#7FFF00', '#851235', '#959B6C', '#3AC192', '#5E51F2',
        '#56EFDB', '#94828B', '#A942C6', '#3EF499', '#F17A46'
    ]

    $gameArea.innerHTML = ''
    let box = document.createElement('div')
    box.className = 'govno'
    box.style.height = box.style.width = `${boxSize}px`
    box.style.backgroundColor = choose(collorsArray)
    box.style.top = `${getRandom(0, maxTop)}px`
    box.style.left = `${getRandom(0, maxLeft)}px`

    box.setAttribute('data-box', 'true')

    $gameArea.insertAdjacentElement('afterbegin', box)

}


function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
  }


function getRandom(min, max){
    return Math.floor(Math.random() * (max-min) + min)
}


function endGame() {
    isGameStarted = false
    setScore()
    $startButton.classList.remove('hide')
    $resultHeader.classList.remove('hide')
    $timeHeader.classList.add('hide')
    $gameArea.innerHTML = ''
    $gameArea.style.background = '#CCCCCC'

}


function setScore() {
    $result.textContent = score.toString()
}
