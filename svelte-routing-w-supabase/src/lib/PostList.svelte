<script>
  import { getUserPosts, createPost } from "./postService.svelte.js";
  import { onMount } from "svelte";
  import { userStore } from "./stores.svelte.js";
  let posts = $state([]);
  let title = "";
  let body = "";
  async function submitHandler(e) {
    e.preventDefault();
    const form = e.target;

    const user = userStore.user;
    await createPost(title, body, user.id);

    posts = await getUserPosts(userStore.user);
    title = "";
    body = "";
  }
  async function init() {
    posts = await getUserPosts(userStore.user);
  }

  onMount(init);
</script>

{#if userStore.isLoggedIn}
  <form onsubmit={submitHandler}>
    <input type="text" name="title" bind:value={title} />
    <textarea name="body" bind:value={body}></textarea>
    <button type="submit">Create Post</button>
  </form>
{/if}
<ul>
  {#each posts as post}
    <li><a href="#post?post_id={post.id}">{post.title}</a></li>
  {/each}
</ul>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
