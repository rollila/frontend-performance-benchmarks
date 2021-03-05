<script>
  import Child from "./Child.svelte";
  import Child2 from "./Child2.svelte";

  let children = [];
  let elements = [];
  let numChildren = 0;
  let childType = 1;

  function addOne() {
    children = [...children, { id: children.length + 1 }];
  }

  function remove() {
    children = [];
  }

  function generateComponents() {
    children = new Array(numChildren).fill(null).map((_, i) => ({ id: i }));
  }

  function generateElements() {
    elements = new Array(numChildren).fill(null);
  }

  function onUpdateValue(event) {
    numChildren = parseInt(event.target.value, 10);
  }

  function switchType() {
    childType = 2;
  }
</script>

<main>
  <div>
    <div>
      <label>Number of components or elements to create</label>
      <input
        id="input-num-to-create"
        type="number"
        min="1"
        on:change={(event) => onUpdateValue(event)}
      />
      <button id="btn-generate-components" on:click={generateComponents}>
        Generate components
      </button>
      <button id="btn-generate-elements" on:click={generateElements}>
        Generate static elements
      </button>
      <button id="btn-switch-child-type" on:click={switchType}>
        Change child component type
      </button>
    </div>
    <div>
      <div>
        <button id="btn-delete" on:click={remove}>Delete all components</button>
        <button id="btn-add-one" on:click={addOne}>Add one component</button>
      </div>
    </div>
    <div>
      {#if childType === 1}
        {#each children as child (child.id)}
          <Child id={child.id} />
        {/each}
      {:else}
        {#each children as child (child.id)}
          <Child2 id={child.id} />
        {/each}
      {/if}
      {#each elements as element}
        <div>-</div>
      {/each}
    </div>
  </div>
</main>
