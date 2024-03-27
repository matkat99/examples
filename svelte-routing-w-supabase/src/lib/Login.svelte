<script>
  import { signUp, login } from "./auth.mjs";
  import { userStore } from "./stores.mjs";
  let email = "";
  let password = "";
  let loading = false;
  let errorMessage = "";

  async function handleSignup(e) {
    try {
      loading = true;
      // signup
      signUp({ email, password });
      // if fails throw error
    } catch (err) {
      errorMessage = err;
    } finally {
      loading = false;
    }
  }
  async function handleLogin(e) {
    e.preventDefault();
    try {
      loading = true;
      // login
      login({ email, password });

      // if fails throw error
    } catch (err) {
      errorMessage = err;
    } finally {
      loading = false;
    }
  }
</script>

<p>Sign in Below</p>
<form on:submit={handleLogin}>
  <p>
    <label for="email">Email</label>
    <input type="text" id="email" name="email" bind:value={email} />
  </p>
  <p>
    <label for="password">Password</label>
    <input
      type="password"
      name="password"
      id="password"
      bind:value={password}
    />
  </p>
  {#if errorMessage}
    <p>{errorMessage}</p>
  {/if}
  <button disabled={loading}>Login</button>
  <button type="button" disabled={loading} on:click={handleSignup}
    >Signup</button
  >
</form>
