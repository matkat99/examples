<script>
  import Identifications from "./lib/Identifications.svelte";
  import PlaceList from "./lib/PlaceList.svelte";
</script>

<main>
  <h1>Critter Searcher</h1>

  <div class="card">
    <PlaceList />
  </div>
  <div class="identifications">
    <Identifications />
  </div>
</main>

<style>
  @media screen and (min-width: 600px) {
    main {
      display: grid;
      grid-template-columns: 350px auto;
      gap: 1em;
    }
    h1 {
      grid-column: 1/3;
      text-align: center;
    }
  }
</style>
