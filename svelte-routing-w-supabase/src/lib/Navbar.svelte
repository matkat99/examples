<script>
  import { logout } from "./auth.mjs";
  import { userStore } from "./stores.mjs";

  console.log($userStore);
</script>

<nav>
  <ul>
    <li><a href="#home">Home</a></li>
    {#if $userStore.isLoggedIn === false}
      <li><a href="#login">Login</a></li>
    {:else if $userStore.isLoggedIn === true}
      <li><a href="#profile">User Profile</a></li>

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
