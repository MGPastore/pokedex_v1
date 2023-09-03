class Pokemon {
  constructor(numero, nombre, tipo, vida, defensa, velocidad, fuerza, experiencia) {
    this.numero = numero;
    this.nombre = nombre;
    this.tipo = tipo;
    this.vida = vida;
    this.defensa = defensa;
    this.velocidad = velocidad;
    this.fuerza = fuerza;
    this.experiencia = experiencia;
  }
}

class Pokedex {
  constructor() {
    this.pokemonData = [];
    this.pokemonList = document.querySelector(".pokemon-list");
    this.detailsContainer = null;

    this.fetchPokemonData();
  }

  fetchPokemonData() {
    fetch("/pokemon")
      .then(response => response.json())
      .then(data => {
        data.pokemon.forEach(pokemon => {
          const newPokemon = new Pokemon(
            pokemon.numero,
            pokemon.nombre,
            pokemon.tipo,
            pokemon.vida,
            pokemon.defensa,
            pokemon.velocidad,
            pokemon.fuerza,
            pokemon.experiencia
          );
          this.pokemonData.push(newPokemon);
        });

        this.generatePokemonList();
      })
      .catch(error => console.log(error));
  }

  generatePokemonList() {
    this.pokemonData.forEach(pokemon => {
      const item = document.createElement("div");
      item.classList.add("pokemon-item");

      const image = document.createElement("img");
      image.classList.add("pokemon-image");
      image.src = `./img/${pokemon.numero}.png`; // Ruta de la imagen
      item.appendChild(image);

      const name = document.createElement("p");
      name.classList.add("pokemon-name");
      name.textContent = pokemon.nombre.charAt(0).toUpperCase() + pokemon.nombre.slice(1);
      item.appendChild(name);

      item.addEventListener("click", () => this.showDetails(pokemon));

      this.pokemonList.appendChild(item);
    });
  }

  showDetails(pokemon) {
    if (this.detailsContainer) {
      this.detailsContainer.remove();
    }

    this.detailsContainer = document.createElement("div");
    this.detailsContainer.classList.add("pokemon-details");

    const name = document.createElement("h2");
    name.classList.add("details-heading");
    name.textContent = pokemon.nombre.charAt(0).toUpperCase() + pokemon.nombre.slice(1);
    this.detailsContainer.appendChild(name);

    const details = document.createElement("div");
    details.classList.add("details-info");
    details.innerHTML = `
    <center>

      <img src="./img/${pokemon.numero}.png">
      <br>
      <span>Número: ${pokemon.numero}</span>
      <span>Tipo: ${pokemon.tipo[0]}</span>
      <span>Vida: ${pokemon.vida}</span>
      <span>Defensa: ${pokemon.defensa}</span>
      <span>Velocidad: ${pokemon.velocidad}</span>
      <span>Fuerza: ${pokemon.fuerza}</span>
      <span>Experiencia: ${pokemon.experiencia}</span>
    </center>`;

    this.detailsContainer.appendChild(details);
    document.body.insertBefore(this.detailsContainer, document.body.firstChild);

    // Desplazar la pantalla hasta los detalles
    window.scrollTo({
      top: this.detailsContainer.offsetTop,
      behavior: "smooth"
    });
  }
}

window.onload = function() {
  const pokedex = new Pokedex();
};
