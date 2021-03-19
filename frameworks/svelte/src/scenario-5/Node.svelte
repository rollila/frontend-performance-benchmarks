<script>
  export let branchingFactor;
  export let subtreeDepth;
  export let prop;

  let count = 0;

  function increment() {
    count += 1;
  }
</script>

<div>
  {prop}
  <div>
    {count}
    <button class="btn-increment-node" on:click={increment}>Update leaf</button>
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
      <svelte:self subtreeDepth={subtreeDepth - 1} {branchingFactor} {prop} />
    {/each}
  {/if}
</div>
