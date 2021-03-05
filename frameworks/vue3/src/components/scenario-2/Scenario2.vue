<template>
  <div>
    <div>
      <label>Number of rows</label>
      <input
        id="input-rows"
        type="number"
        min="1"
        :value="numRows"
        @change="(event) => onUpdateRows(event.target.value)"
      />
      <label>Number of columns</label>
      <input
        id="input-columns"
        type="number"
        min="1"
        :value="numColumns"
        @change="(event) => onUpdateColumns(event.target.value)"
      />
      <button id="btn-generate" @click="generate">
        Generate
      </button>
    </div>
    <div>
      <Row v-for="row in rows" :key="row.id" :columns="row.columns" />
    </div>
  </div>
</template>

<script>
import Row from "./Row.vue";

export default {
  components: {
    Row,
  },
  data() {
    return {
      numRows: 0,
      numColumns: 0,
      rows: [],
    };
  },
  methods: {
    generate() {
      this.rows = new Array(this.numRows).fill(null).map((_, i) => ({
        id: i,
        columns: new Array(this.numColumns).fill(null).map((_, y) => ({
          id: `row${i}-col${y}`,
        })),
      }));
    },
    onUpdateColumns(value) {
      this.numColumns = parseInt(value, 10);
    },
    onUpdateRows(value) {
      this.numRows = parseInt(value, 10);
    },
  },
};
</script>
