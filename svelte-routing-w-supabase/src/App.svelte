<script>
  import Login from "./lib/Login.svelte";
  import Navbar from "./lib/Navbar.svelte";
  import UserProfile from "./lib/UserProfile.svelte";
  import Post from "./lib/Post.svelte";
  import PostList from "./lib/PostList.svelte";
  import { route, userStore } from "./lib/stores.svelte.js";
  import { checkLogin } from "./lib/auth.mjs";
  import { onMount } from "svelte";

  let urlParams = $state();

  const setRoute = () => {
    // see if there were any query params sent.
    const [hash, params] = window.location.hash.split("?");
    // if so lets turn them into a URLSearchParams object so we can use params.get(param)
    if (params) urlParams = new URLSearchParams("?" + params);
    if (hash === "#profile" && !userStore.isLoggedIn) {
      window.location.hash = "#login";
    } else {
      route.pathname = hash;
    }
  };
  window.addEventListener("popstate", setRoute);
  async function init() {
    await checkLogin();
    setRoute();
  }

  onMount(init);
</script>

<main>
  <Navbar />
  <h1>Sup demo</h1>

  <div class="card">
    {#if route.pathname == "#home" || route.pathname == ""}
      <h2>Home</h2>
      <p>This is the home page.</p>
    {:else if route.pathname == "#posts"}
      <h2>Posts</h2>
      <PostList />
    {:else if route.pathname == "#post"}
      <Post params={urlParams} />
    {:else if route.pathname == "#login"}
      <Login />
    {:else if route.pathname == "#profile"}
      <UserProfile />
    {:else}
      <h2>404</h2>
      <p>Page not found.</p>
    {/if}
  </div>
</main>

<style>
</style>
