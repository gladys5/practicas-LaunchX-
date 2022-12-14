const pokemonName = document.querySelector(".pokemon__name")
const pokemonNumber = document.querySelector(".pokemon__number")
const pokemonImage = document.querySelector(".pokemon__image")
let renderImg = document.getElementById("renderImg")
const abilities = document.querySelector(".pokemon__abilities")
const pokemonType = document.querySelector(".pokemon__type")
const stats = document.querySelector(".pokemon__stats")
const form = document.querySelector(".form")
const input = document.querySelector(".input__search")
const buttonPrev = document.querySelector(".btn-prev")
const buttonNext = document.querySelector(".btn-next")
const notFound = document.createElement("div")

let image = [
  "pokemonDia.jpg",
  "pokemonNoche.jpg",
  "paisaje.jpg",
  "pokemonInvierno.jpg",
]

let searchPokemon = 1
const fetchPokemon = async (pokemon) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

  if (response.status === 200) {
    const data = await response.json()
    return data
  }
}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading..."
  pokemonNumber.innerHTML = ""

  const data = await fetchPokemon(pokemon)

  let audio2 = new Audio("wrong.mp3")
  let abilitys = data.abilities
  let ability = abilitys.map((ability) => ability.ability.name).join(", ")
  let typesOfPokemon = data.types
  let statsOfPokemon = data.stats
  if (data) {
    pokemonImage.style.display = "block"
    pokemonName.innerHTML = data.name
    pokemonNumber.innerHTML = data.id
    abilities.innerHTML = ability
    pokemonType.innerHTML = typesOfPokemon
      .map((type) => type.type.name)
      .join(", ")
    stats.innerHTML = statsOfPokemon.map((stat) => stat.stat.name).join(", ")
    renderImg.src = image[Math.floor(Math.random() * image.length)]

    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ]

    input.value = ""
    searchPokemon = data.id
  } else {
    pokemonImage.style.display = "none"
    pokemonName.innerHTML = "<span class= c> not found</span>"
    pokemonNumber.innerHTML = "0"
    audio2.play()
  }
  console.log(data)
}

form.addEventListener("submit", (event) => {
  event.preventDefault()
  renderPokemon(input.value.toLowerCase())
})

buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1
    renderPokemon(searchPokemon)
  }
})

buttonNext.addEventListener("click", () => {
  searchPokemon += 1
  renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)
