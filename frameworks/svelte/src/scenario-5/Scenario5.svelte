

  <div>
    <label>Select branching factor</label>
    <input
      id="input-branching-factor"
      :value="branchingFactor"
      on:change="{onUpdateBranchingFactor}"
    />
    <label>Select tree depth</label>
    <input
      id="input-tree-depth"
      :value="treeDepth"
      on:change="{onUpdateTreeDepth}"
    />
    <button id="btn-generate" on:click="{generate}">Generate tree</button>
    <div>{ count }</div>
    <button id="btn-increment-root" on:click="{increment}">Update root</button>
    {#if initialized}
        <div>
        {#each Array(branchingFactor) as _}
            <Node
                branchingFactor="{branchingFactor}"
                subtreeDepth="{treeDepth - 1}" />
        {/each}
        </div>
    {/if}
  </div>

<script>
import Node from "./Node.svelte";

let branchingFactor = 0;
let treeDepth = 0;
let initialized = false;
let count = 0;

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
