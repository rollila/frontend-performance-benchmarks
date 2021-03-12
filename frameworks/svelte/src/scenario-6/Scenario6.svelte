<script>
  import Node from "./Node.svelte";

  let branchingFactor = 0;
  let treeDepth = 0;
  let initialized = false;
  let count = 0;
  let items = Array(10)
    .fill(null)
    .map(() => ({
      value0: 0,
      value1: 1,
      value2: 2,
      value3: 3,
      value4: 4,
      value5: 5,
      value6: 6,
      value7: 7,
      value8: 8,
      value9: 9,
    }));

  function onUpdateBranchingFactor(event) {
    branchingFactor = parseInt(event.target.value, 10);
  }
  function onUpdateTreeDepth(event) {
    treeDepth = parseInt(event.target.value, 10);
  }
  function generate() {
    initialized = true;
  }
  function increment() {
    count += 1;
  }
</script>

<div>
  <label>Select branching factor</label>
  <input
    id="input-branching-factor"
    :value="branchingFactor"
    on:change={onUpdateBranchingFactor}
  />
  <label>Select tree depth</label>
  <input
    id="input-tree-depth"
    :value="treeDepth"
    on:change={onUpdateTreeDepth}
  />
  <button id="btn-generate" on:click={generate}>Generate tree</button>
  <div>{count}</div>
  <button id="btn-increment-root" on:click={increment}>Update root</button>
  {#if initialized}
    <div>
      {#each Array(branchingFactor) as _}
        <Node {branchingFactor} subtreeDepth={treeDepth - 1} {items} />
      {/each}
    </div>
  {/if}
</div>
