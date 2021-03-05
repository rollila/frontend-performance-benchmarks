<script>
  import Child from "./Child.svelte";

  let numStuff = 0;
  let numChildren = 0;
  let offset = 0;
  $: children = new Array(numChildren).fill(null).map((_, i) => ({ id: i, value: i + offset }));

  function generate() {
    numChildren = numStuff;
  }

  function onChange(value) {
    numStuff = parseInt(value, 10);
  }

  function update() {
    offset += 1;
  }

  function updateSingle() {
    const i = Math.floor(Math.random() * Math.floor(children.length));
    children[i].value += 1;
  }
</script>

<div>
  <div>
    <div>
      <label>Number of components</label>
      <input
        id="input-components"
        type="number"
        min="1"
        :value="numChildren"
        on:change={(event) => onChange(event.target.value)}
      />
      <button id="btn-generate" on:click={generate}>
        Generate
      </button>
      <button id="btn-update" on:click={update}>Update children</button>
      <button id="btn-update-single" on:click={updateSingle}>
        Update single child
      </button>
    </div>
    {#each children as child (child.id)}
      <Child value={child.value} />
    {/each}
  </div>
</div>
