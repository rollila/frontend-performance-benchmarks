<template>
  <div>
    <div>
      <label>Number of components</label>
      <input
        id="input-components"
        type="number"
        min="1"
        :value="numChildren"
        @change="onChange"
      />
      <button id="btn-generate" @click="generate">
        Generate
      </button>
      <button id="btn-update" @click="update">Update children</button>
      <button id="btn-update-single" @click="updateSingle">
        Update single child
      </button>
    </div>
    <Child v-for="child in children" :key="child.id" :value="child.value" />
  </div>
</template>

<script>
import Child from "./Child.vue";

export default {
  components: {
    Child,
  },
  data() {
    return {
      numChildren: 0,
      children: [],
    };
  },
  methods: {
    generate() {
      this.children = this.children = new Array(this.numChildren)
        .fill(null)
        .map((_, i) => ({ id: i, value: i }));
    },
    update() {
      this.children = this.children.map((child) => ({
        ...child,
        value: (child.value += 1),
      }));
    },
    updateSingle() {
      const i = Math.floor(Math.random() * Math.floor(this.children.length));
      this.children[i].value += 1;
    },
    onChange(event) {
      this.numChildren = parseInt(event.target.value, 10);
    },
  },
};
</script>
