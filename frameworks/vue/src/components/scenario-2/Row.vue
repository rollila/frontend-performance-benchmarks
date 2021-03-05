<template>
  <div>
    <div>
      Row count: {{ count }}
      <button class="row-btn-update-children" @click="updateRow">
        Update children
      </button>
      <button class="row-btn-update-self" @click="onInput">Upate parent</button>
    </div>
    <Cell v-for="(col, i) in columns" :key="col.id" :value="i + offset" />
  </div>
</template>

<script>
import Cell from "./Cell";

export default {
  components: {
    Cell,
  },
  props: {
    columns: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      count: 0,
      offset: 0,
    };
  },
  methods: {
    onInput() {
      this.count += 1;
    },
    updateRow() {
      this.offset += 1;
    },
  },
};
</script>
