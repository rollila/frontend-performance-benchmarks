<script>
import Cell from "./Cell.svelte";

export let columns;
let count = 0;
let offset = 0;

function onInput() {
    count += 1;
}
function updateRow() {
    offset += 1;
}

</script>

  <div>
    <div>
      Row count: { count }
      <button class="row-btn-update-children" on:click="{updateRow}">
        Update children
      </button>
      <button class="row-btn-update-self" on:click="{onInput}">Upate parent</button>
    </div>
    {#each columns as column, i (column.id)}
        <Cell value="{i + offset}" />
    {/each}    
  </div>