<script lang="ts">
  let { label, children } = $props();
  let dialogRef;

  function open() {
    dialogRef.showModal();
  }
  function close() {
    dialogRef.close();
  }
</script>

<button class="link-style-button" onclick={open}>{label}</button>
<dialog bind:this={dialogRef}>
  <button onclick={close}>X</button>
  {@render children()}
</dialog>

<style>
  dialog {
    border: none;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    /* width: 300px; */
    max-width: 100%;
  }

  .link-style-button {
    background: none;
    border: none;
    color: blue;
    text-decoration: underline;
    cursor: pointer;
    font-size: 1em;
    padding: 0;
  }

  .link-style-button:hover {
    color: darkblue;
  }
</style>
