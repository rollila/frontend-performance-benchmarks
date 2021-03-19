<script>
  import { createEventDispatcher } from "svelte";

  export let labels = [];
  export let scenario;

  const dispatch = createEventDispatcher();

  $: group = scenario != null ? scenario.split("_")[0] : null;

  $: options = () => {
    if (["group1", "group2"].includes(group)) {
      return [
        {
          title: "1-1000",
          rangeStart: 0,
          rangeEnd: labels.findIndex((label) => label === "1000"),
        },
        {
          title: "1000-10000",
          rangeStart: labels.findIndex((label) => label === "1000"),
          rangeEnd: labels.findIndex((label) => label === "10000"),
        },
        {
          title: "10000-50000",
          rangeStart: labels.findIndex((label) => label === "10000"),
          rangeEnd: labels.length - 1,
        },
        {
          title: "all",
          labels,
        },
      ];
    }
    if (group === "group3") {
      return [
        {
          title: "1-1024",
          rangeStart: 0,
          rangeEnd: labels.findIndex((label) => label === "1024"),
        },
        {
          title: "1024-8192",
          rangeStart: labels.findIndex((label) => label === "1024"),
          rangeEnd: labels.findIndex((label) => label === "8192"),
        },
        {
          title: "1024-65536",
          rangeStart: labels.findIndex((label) => label === "8192"),
          rangeEnd: labels.length - 1,
        },
        {
          title: "all",
          labels,
        },
      ];
    }
    if (group === "group4") {
      return [
        {
          title: "1-1000",
          rangeStart: 0,
          rangeEnd: labels.findIndex((label) => label === "1000"),
        },
        {
          title: "1000-10000",
          rangeStart: labels.findIndex((label) => label === "1000"),
          rangeEnd: labels.length - 1,
        },
        {
          title: "all",
          labels,
        },
      ];
    }
    if (group === "group5") {
      return [
        {
          title: "1-1024",
          rangeStart: 0,
          rangeEnd: labels.findIndex((label) => label === "1024"),
        },
        {
          title: "1024-8192",
          rangeStart: labels.findIndex((label) => label === "1024"),
          rangeEnd: labels.findIndex((label) => label === "8192"),
        },
      ];
    }
  };

  function selectOption(value) {
    dispatch("change", value);
  }
</script>

<div>
  <label>Select range of N</label>
  {#each options() as option}
    <button
      on:click={() =>
        selectOption({ start: option.rangeStart, end: option.rangeEnd })}
      >{option.title}</button
    >
  {/each}
</div>
