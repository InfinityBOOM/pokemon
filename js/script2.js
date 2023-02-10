const container = document.querySelector('.container')
const baseURL = `https://pokeapi.co/api/v2`
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
const screen = document.querySelector('.screen')
const box = document.querySelectorAll('.box')
const accordion = document.querySelector('#accordionExample')
let offset = 0
let page = 1


prev.addEventListener('click', e => {
  e.preventDefault()
  if (offset !== 0) {
    offset -= 20
    request(offset)
    page--
    screen.innerHTML = page
    window.scrollTo(0, 00)
  }
})

next.addEventListener('click', e => {
  e.preventDefault()
  if (1154 - offset > 20) {
    offset += 20
    request(offset)
    page++
    screen.innerHTML = page
    window.scrollTo(0, 00)
  }
})

function request(offset) {
  let headingNumber = 0
  fetch(`${baseURL}/ability?offset=${offset}&limit=20`)
    .then(res => res.json())
    .then(r => {
      console.log(r)
      const data = r.results
      accordion.innerHTML = ''
      data.map(item => {
        fetch(item.url)
          .then(res => res.json())
          .then(r => {
            let ability = r.effect_entries
            ability.map((item) => {
              accordion.insertAdjacentHTML('beforeend', temp(item.effect, r.name, headingNumber))
              headingNumber++
            })
          })
      })
    })
    .catch(err => console.log(err))
}

request(offset)

function temp(text, name, index) {
  return `
    <div class="accordion-item">
      <h2 class="accordion-header" id="heading${index}">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}";>
          ${text}
        </button>
      </h2>
      <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          ${name}
        </div>
      </div>
    </div>
  `
}
