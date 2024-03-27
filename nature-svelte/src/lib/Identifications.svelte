<script>
  import { identifications } from "./stores.mjs";
</script>

{#if $identifications.total_results == 0}
  <p>No results found</p>
{/if}
<ul>
  {#each $identifications.results as id (id)}
    <li>
      <img src={id.observation.taxon.default_photo.medium_url} />
      <p>{id.observation.taxon.preferred_common_name}</p>
    </li>
  {/each}
</ul>

<style>
  ul {
    list-style-type: none;
    padding-left: 0;
    columns: 250px 3;

    margin-left: 0.5em;
    margin-right: 0.5em;
  }
  li {
    width: 250px;
    /* -webkit-column-break-inside: avoid; */
    /* page-break-inside: avoid; */
    break-inside: avoid;
    border: 1px solid;
    padding: 1em;
    margin-bottom: 0.5em;
  }
</style>
