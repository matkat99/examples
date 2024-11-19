<script>
  import Login from "./lib/Login.svelte";
  import Navbar from "./lib/Navbar.svelte";
  import UserProfile from "./lib/UserProfile.svelte";
  import Post from "./lib/Post.svelte";
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
    {:else if $route == "#posts"}
      <h2>Posts</h2>
      <ul>
        <li><a href="#post?post_id=1">Post One</a></li>
        <li><a href="#post?post_id=2">Post Two</a></li>
      </ul>
    {:else if $route == "#post"}
      <Post {urlParams} />
    {:else if $route === "#profile"}
      <UserProfile />
    {:else}
      <h2>Welcome Home</h2>
    {/if}
  </div>
</main>

<style>
</style>
