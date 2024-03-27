const baseUrl = "https://api.inaturalist.org/v1/";
const placeSearchButton = document.querySelector("#placeSearch");
const placeListElement = document.querySelector("#placeList");
const detailsElement = document.querySelector("#details");

async function getJson(url) {
  const res = await fetch(url);
  if (res.ok) {
    const data = await res.json();
    return data;
  }
}

function simplify(list) {
  const simpleList = list.map((item) => {
    return {
      name: item.observation.taxon.preferred_common_name,
      image: item.observation.taxon.default_photo.medium_url,
      taxon_id: item.taxon_id
    };
  });
  return simpleList;
}
function deDuplicate(list) {
  const filtered = list.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.taxon_id === value.taxon_id)
  );

  return filtered;
}
function placeTemplate(place) {
  return `<li data-id="${place.id}">${place.display_name}</li>`;
}

function identificationTemplate(ident) {
  return `<li>
            <img src="${ident.image}">
            <h2>${ident.name}</h2>
        </li>`;
}
function renderList(list, element, template) {
  const html = list.map((item) => template(item));
  element.innerHTML = html.join("");
}
async function searchPlace(e) {
  const q = document.querySelector("#place").value;
  const data = await getJson(baseUrl + `places/autocomplete?q=${q}`);
  renderList(data.results, placeListElement, placeTemplate);
}
async function getIdenByPlace(e) {
  const id = e.target.dataset.id;
  const data = await getJson(
    baseUrl +
      `identifications?current=true&place_id=${id}&order=desc&order_by=created_at`
  );
  const simple = simplify(data.results);
  const unique = deDuplicate(simple);
  renderList(unique, detailsElement, identificationTemplate);
  console.log(unique);
}

placeSearchButton.addEventListener("click", searchPlace);
placeListElement.addEventListener("click", getIdenByPlace);
