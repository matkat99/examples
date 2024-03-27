<script>
  import Login from "./lib/Login.svelte";
  import Navbar from "./lib/Navbar.svelte";
  import UserProfile from "./lib/UserProfile.svelte";
  import { route, userStore } from "./lib/stores.mjs";
  import { checkLogin } from "./lib/auth.mjs";
  import { onMount } from "svelte";

  window.addEventListener("popstate", () => {
    if (window.location.hash === "#profile" && !$userStore.isLoggedIn) {
      window.location.hash = "#login";
    } else {
      $route = window.location.hash;
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
