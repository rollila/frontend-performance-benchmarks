
  <div>
    {#if subtreeDepth > 0}
        {#each Array(branchingFactor) as _ }
            <svelte:self
                subtreeDepth="{subtreeDepth - 1}"
                branchingFactor="{branchingFactor}" />
        {/each}
    {:else}
    <div>
        { count }
        <button class="btn-increment-leaf" on:click="{increment}">Update leaf</button>
    </div>
    {/if}
  </div>

<script>
export let branchingFactor;
export let subtreeDepth;
let count = 0;

function increment() {
    count += 1; 
}
</script>
