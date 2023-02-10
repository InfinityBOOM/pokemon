const container = document.querySelector('.container')
const baseURL = `https://pokeapi.co/api/v2`
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
const screen = document.querySelector('.screen')
const box = document.querySelectorAll('.box')
const close = document.querySelector('#close')
const text = document.querySelectorAll('.text')

let offset = 0
let limit = 21
let page = 1

const modalWindow = document.querySelector('.modalWindow')
const iconOfPoke = modalWindow.querySelector('.iconOfPoke')
const nameOfPoke = modalWindow.querySelector('.nameOfPoke')
const imgOfPoke = modalWindow.querySelector('#imgOfPoke')
const movesOfPoke = modalWindow.querySelector('#movesOfPoke')

box.forEach(item => {
    item.addEventListener('click', e => {
        if (e.target.hasAttribute('data-name')) {
            const name = e.target.getAttribute('data-name')
            showModalWindow(name)
        }
    })
})

prev.addEventListener('click', e => {
    e.preventDefault()
    if (offset !== 0) {
        offset -= limit
        request(offset)
        page--
        screen.innerHTML = page
        window.scrollTo(0, 00)
    }
})

next.addEventListener('click', e => {
    e.preventDefault()
    if (1154 - offset > limit) {
        offset += limit
        request(offset)
        page++
        screen.innerHTML = page
        window.scrollTo(0, 00)
    }
})

close.addEventListener('click', e => {
    modalWindow.classList.remove('open')
})

function request(offset) {
    fetch(`${baseURL}/pokemon?offset=${offset}&limit=${limit}`)
        .then(res => res.json())
        .then(r => {

            const data = r.results
            data.map((item, index) => {
                fetch(`${item.url}`)
                    .then(res => res.json())
                    .then(r => {
                        box[index].innerHTML = temp(r.name, r.sprites.other['official-artwork'].front_default)
                    })
            })
        })
        .catch(err => console.log(err))
}
request(offset)

function temp(name, img) {
    return `
        <img src="${img}" alt="" class='img' data-name="${name}">
            <div class="line">
                <img src="https://scarletviolet.pokemon.com/images/elements-icons/divider-endcap-simple-left-2x.png" alt="" class='left'>
                <img src="https://scarletviolet.pokemon.com/images/elements-icons/divider-endcap-simple-right-2x.png" alt="" class='right'>
            </div>
        <h1 data-name="${name}">${name}</h1>
    `
}

function showModalWindow(name) {
    fetch(`${baseURL}/pokemon/${name}`)
    .then(res => res.json())
    .then(r => {
        let length = r.moves.length
        let randomNums = []
        for(let i = 0; i < 5; i++){
            let randomNum = Math.floor(Math.random() * length)
            randomNums.push(randomNum)
        }
        modalWindow.classList.add('open')
        iconOfPoke.innerHTML = r.sprites.front_default
        nameOfPoke.innerHTML = r.name.toUpperCase()
        imgOfPoke.src = r.sprites.other['official-artwork'].front_default
        randomNums.forEach((item, index) => {
            text[index].innerHTML = r.moves[item].move.name
        })
    })
}