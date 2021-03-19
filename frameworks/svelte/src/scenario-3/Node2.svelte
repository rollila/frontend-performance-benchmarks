<script>
  export let branchingFactor;
  export let subtreeDepth;
</script>

<div>
  {#if subtreeDepth > 0}
    {#each Array(branchingFactor) as _}
      <svelte:self subtreeDepth={subtreeDepth - 1} {branchingFactor} />
    {/each}
  {/if}
  -
</div>
