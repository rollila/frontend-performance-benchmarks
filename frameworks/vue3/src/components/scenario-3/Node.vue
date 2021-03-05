<template>
  <div>
    <template v-if="subtreeDepth > 0">
      <Node
        v-for="n in branchingFactor"
        :key="n"
        :subtree-depth="subtreeDepth - 1"
        :branching-factor="branchingFactor"
      />
    </template>
    <div v-else>
      {{ count }}
      <button class="btn-increment-leaf" @click="increment">Update leaf</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Node",
  props: {
    branchingFactor: {
      type: Number,
      required: true,
    },
    subtreeDepth: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increment() {
      this.count += 1;
    },
  },
};
</script>
