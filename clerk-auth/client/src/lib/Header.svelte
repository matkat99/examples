<script lang="ts">
  import { onMount } from "svelte";
  import { initClerk } from "./auth";
  import Dialog from "./Dialog.svelte";

  let { protectedRoute = true } = $props();
  let user: { id: string; email: string } | null = $state(null);
  let clerk: any;
  let buttonRef: HTMLDivElement;

  onMount(async () => {
    clerk = await initClerk();
    user = clerk.user;
    if (clerk.isSignedIn) {
      clerk.mountUserButton(buttonRef);
    } else if (protectedRoute && !clerk.isSignedIn) {
      clerk.openSignIn(buttonRef);
    }
  });

  function handleLogin() {
    // Implement login logic here
    clerk.openSignIn(buttonRef);
  }

  function handleLogout() {
    // Implement logout logic here
  }
</script>

<div class="header">
  <div class="logo">
    <a href="/"><img src="../assets/svelte.svg" alt="Logo" /></a>
  </div>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/profile/">Protected</a></li>
      <li>
        <div id="user-button" bind:this={buttonRef}>
          {#if !user}
            <button onclick={handleLogin}>Sign In</button>
          {/if}
        </div>
      </li>
    </ul>
  </nav>
</div>

<style>
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo img {
    height: 40px;
  }

  nav ul {
    list-style: none;
    display: flex;
    gap: 1.5rem;
    margin: 0;
    padding: 0;
  }

  nav a,
  button {
    text-decoration: none;
    color: #333;
    font-weight: bold;
  }

  nav a:hover,
  button:hover {
    color: #007bff;
  }
  /* style button like a link */
  button {
    background: none;
    border: none;
    /* color: #007bff; */
    cursor: pointer;
    font-size: 1rem;
    padding: 0;
  }
</style>
