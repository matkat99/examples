<script>
  export let places;
  let query = "";
  async function searchHandler() {
    const res = await fetch(
      `https://api.inaturalist.org/v1/places/autocomplete?q=${query}`
    );
    if (!res.ok) throw new Error(await res.json());
    const data = await res.json();
    places = data.results;
  }
</script>

<input type="search" bind:value={query} />
<button on:click={searchHandler}>Search</button>
