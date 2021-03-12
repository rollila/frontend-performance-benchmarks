<script>
  export let branchingFactor;
  export let subtreeDepth;
  export let items;
  let count = 0;

  function increment() {
    count += 1;
  }
</script>

<div>
  {#each items as item, i (i)}
    <div key={i}>
      <span>{item.value0}</span><span>{item.value1}</span><span
        >{item.value2}</span
      ><span>{item.value3}</span><span>{item.value4}</span><span
        >{item.value5}</span
      ><span>{item.value6}</span><span>{item.value7}</span><span
        >{item.value8}</span
      ><span>{item.value9}</span>
    </div>
  {/each}
  <div>
    {count}
    <button class="btn-increment-leaf" on:click={increment}>Update leaf</button>
  </div>
  {#if subtreeDepth > 0}
    {#each Array(branchingFactor) as _}
      <svelte:self subtreeDepth={subtreeDepth - 1} {branchingFactor} {items} />
    {/each}
  {/if}
</div>
