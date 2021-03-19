<template>
  <div>
    {{ prop }}
    <div>{{ count }}</div>
    <button @click="increment" class="btn-increment-node">Increment</button>
    <span>-</span><span>-</span><span>-</span><span>-</span><span>-</span
    ><span>-</span><span>-</span><span>-</span><span>-</span><span>-</span>
    <span>-</span><span>-</span><span>-</span><span>-</span><span>-</span
    ><span>-</span><span>-</span><span>-</span><span>-</span><span>-</span>
    <span>-</span><span>-</span><span>-</span><span>-</span><span>-</span
    ><span>-</span><span>-</span><span>-</span><span>-</span><span>-</span>
    <span>-</span><span>-</span><span>-</span><span>-</span><span>-</span
    ><span>-</span><span>-</span><span>-</span><span>-</span><span>-</span>
    <span>-</span><span>-</span><span>-</span><span>-</span><span>-</span
    ><span>-</span><span>-</span><span>-</span><span>-</span><span>-</span>
    <template v-if="subtreeDepth > 0">
      <Node
        v-for="n in branchingFactor"
        :key="n"
        :subtree-depth="subtreeDepth - 1"
        :branching-factor="branchingFactor"
        :prop="prop"
      />
    </template>
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
    prop: {
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
