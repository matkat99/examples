<script>
  import { logout } from "./auth.mjs";
  import { userStore, route } from "./stores.svelte.js";

  $inspect(userStore);
</script>

<nav>
  <ul>
    <li>
      <a href="#home" class={route.pathname == "#home" ? "active" : ""}>Home</a>
    </li>
    <li>
      <a href="#posts" class={route.pathname == "#posts" ? "active" : ""}
        >Posts</a
      >
    </li>
    {#if userStore.isLoggedIn === false}
      <li>
        <a href="#login" class={route.pathname == "#login" ? "active" : ""}
          >Login</a
        >
      </li>
    {:else if userStore.isLoggedIn === true}
      <li>
        <a href="#profile" class={route.pathname == "#profile" ? "active" : ""}
          >User Profile</a
        >
      </li>

      <li><a href="#home" onclick={logout}>Logout</a></li>
    {/if}
  </ul>
</nav>

<style>
  ul {
    display: flex;
    list-style-type: none;
    padding-left: 0;
    gap: 1em;
  }
</style>
