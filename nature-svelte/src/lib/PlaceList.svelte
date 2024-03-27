<script>
  import Search from "./Search.svelte";
  import { identifications } from "./stores.mjs";
  let placeList = [];
  const baseUrl = "https://api.inaturalist.org/v1/";

  async function displayIds(e) {
    const place_id = e.target.dataset.id;
    // const place_id = "2wer3";
    const res = await fetch(
      baseUrl +
        `identifications?current=true&place_id=${place_id}&order=desc&order_by=created_at`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    $identifications = data;
    console.log(data);
  }
</script>

<Search bind:places={placeList} />

<ul>
  {#each placeList as place (place.id)}
    <li>
      <a href="#top" data-id={place.id} on:click|preventDefault={displayIds}
        >{place.display_name}</a
      >
    </li>
  {/each}
</ul>

<style>
  ul {
    list-style-type: none;
    padding-left: 0;
  }
</style>
