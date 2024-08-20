<script>
  import Login from "./lib/Login.svelte";
  import Navbar from "./lib/Navbar.svelte";
  import UserProfile from "./lib/UserProfile.svelte";
  import { route, userStore } from "./lib/stores.mjs";
  import { checkLogin } from "./lib/auth.mjs";
  import { onMount } from "svelte";

  let urlParams;

  window.addEventListener("popstate", () => {
    // see if there were any query params sent.
    const [hash, params] = window.location.hash.split("?");
    // if so lets turn them into a URLSearchParams object so we can use params.get(param)
    if (params) urlParams = new URLSearchParams("?" + params);
    if (hash === "#profile" && !$userStore.isLoggedIn) {
      window.location.hash = "#login";
    } else {
      $route = hash;
    }
  });
  async function init() {
    checkLogin();
  }

  onMount(init);
</script>

<main>
  <Navbar />
  <h1>Sup demo</h1>

  <div class="card">
    {#if $route === "#login"}
      <Login />
    {:else if $route === "#profile"}
      <UserProfile />
    {:else}
      <h2>Welcome Home</h2>
    {/if}
  </div>
</main>

<style>
</style>
