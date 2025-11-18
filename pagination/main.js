const pagination = document.querySelector(".pagination");
const prevButton = pagination.querySelector(".prev");
const nextButton = pagination.querySelector(".next");
const pageNumbers = pagination.querySelector(".page-numbers");
const pageContent = document.querySelector("#page");
let totalPages = 1;
let currentPage = 1;
const limit = 30;

async function getPokemonList(page = 1) {
  const offset = (page - 1) * limit;
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    return [];
  }
}
function pokemonListTemplate(pokemon) {
  return `<li><a href="${pokemon.url}">${pokemon.name}</a></li>`;
}

async function renderPokemonPage() {
  const pokemon = await getPokemonList(currentPage);
  const html = pokemon.results.map(pokemonListTemplate).join("");
  pageContent.innerHTML = html;
}

async function init() {
  const pokemon = await getPokemonList();
  totalPages = Math.ceil(pokemon.count / limit);
  //   renderPagination();
  updatePagination();
  renderPokemonPage();
}

function updatePagination() {
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;

  pageNumbers.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = i;
    if (i === currentPage) {
      a.classList.add("active");
    }
    a.addEventListener("click", () => {
      currentPage = i;
      updatePagination();
      // Load content for the new page
      renderPokemonPage();
    });
    li.appendChild(a);
    pageNumbers.appendChild(li);
  }
}

prevButton.addEventListener("click", () => {
  currentPage--;
  updatePagination();
  // Load content for the previous page
  renderPokemonPage();
});

nextButton.addEventListener("click", () => {
  currentPage++;
  updatePagination();
  // Load content for the next page
  renderPokemonPage();
});

init();
