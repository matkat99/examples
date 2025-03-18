<script>
  import { onMount } from "svelte";
  import { getPostById } from "./postService.svelte.js";
  export let params;
  let post = {};
  const postId = params.get("post_id");

  onMount(async () => {
    post = await getPostById(postId);
  });
</script>

<h2>Post</h2>
<p>{post.title}</p>
<p>{post.body}</p>
{JSON.stringify(post)}
