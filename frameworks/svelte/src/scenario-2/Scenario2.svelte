
<div>
  <div>
    <label>Number of rows</label>
    <input
      id="input-rows"
      type="number"
      min="1"
      on:change="{(event) => onUpdateRows(event.target.value)}"
    />
    <label>Number of columns</label>
    <input
      id="input-columns"
      type="number"
      min="1"
      on:change="{(event) => onUpdateColumns(event.target.value)}"
    />
    <button id="btn-generate" on:click="{generate}">
      Generate
    </button>
  </div>
  <div>
  {#each rows as row (row.id)}
    <Row columns="{row.columns}" />
  {/each}
  </div>
</div>

<script>
import Row from "./Row.svelte";

let numRows = 0;
let numColumns = 0;
let rows = [];

function generate() {
  rows = new Array(numRows).fill(null).map((_, i) => ({
    id: i,
    columns: new Array(numColumns).fill(null).map((_, y) => ({
      id: `row${i}-col${y}`,
    })),
  }));
}

function onUpdateColumns(value) {
  numColumns = parseInt(value, 10);
} function onUpdateRows(value) {
  numRows = parseInt(value, 10);
}
  
</script>
