<script>
  import { logout } from "./auth.mjs";
  import { userStore, route } from "./stores.mjs";

  console.log($userStore);
</script>

<nav>
  <ul>
    <li><a href="#home" class={$route == "#home" ? "active" : ""}>Home</a></li>
    <li>
      <a href="#posts" class={$route == "#posts" ? "active" : ""}>Posts</a>
    </li>
    {#if $userStore.isLoggedIn === false}
      <li>
        <a href="#login" class={$route == "#login" ? "active" : ""}>Login</a>
      </li>
    {:else if $userStore.isLoggedIn === true}
      <li>
        <a href="#profile" class={$route == "#profile" ? "active" : ""}
          >User Profile</a
        >
      </li>

      <li><a href="#home" on:click={logout}>Logout</a></li>
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
