<script>
  export let branchingFactor;
  export let subtreeDepth;
  let count = 0;

  function increment() {
    count += 1;
  }
</script>

<div>
  <span>-</span><span>-</span><span>-</span><span>-</span><span>-</span><span
    >-</span
  ><span>-</span><span>-</span><span>-</span><span>-</span><span>-</span><span
    >-</span
  ><span>-</span><span>-</span><span>-</span><span>-</span><span>-</span><span
    >-</span
  ><span>-</span><span>-</span><span>-</span><span>-</span><span>-</span><span
    >-</span
  ><span>-</span><span>-</span><span>-</span><span>-</span><span>-</span><span
    >-</span
  ><span>-</span><span>-</span><span>-</span><span>-</span><span>-</span><span
    >-</span
  ><span>-</span><span>-</span><span>-</span><span>-</span><span>-</span><span
    >-</span
  ><span>-</span><span>-</span><span>-</span><span>-</span><span>-</span><span
    >-</span
  ><span>-</span><span>-</span><span />
  <div>
    {count}
    <button class="btn-increment-leaf" on:click={increment}>Update leaf</button>
  </div>
  <span>-</span><span>-</span><span>-</span><span>-</span><span>-</span><span
    >-</span
  ><span>-</span><span>-</span><span>-</span><span>-</span><span>-</span><span
    >-</span
  ><span>-</span><span>-</span><span>-</span><span>-</span><span>-</span><span
    >-</span
  ><span>-</span><span>-</span><span>-</span><span>-</span><span>-</span><span
    >-</span
  ><span>-</span><span>-</span><span>-</span><span>-</span><span>-</span><span
    >-</span
  ><span>-</span><span>-</span><span>-</span><span>-</span><span>-</span><span
    >-</span
  ><span>-</span><span>-</span><span>-</span><span>-</span><span>-</span><span
    >-</span
  ><span>-</span><span>-</span><span>-</span><span>-</span><span>-</span><span
    >-</span
  ><span>-</span><span>-</span><span />
  {#if subtreeDepth > 0}
    {#each Array(branchingFactor) as _}
      <svelte:self subtreeDepth={subtreeDepth - 1} {branchingFactor} />
    {/each}
  {/if}
</div>
