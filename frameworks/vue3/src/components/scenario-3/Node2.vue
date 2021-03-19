<template>
  <div>
    <template v-if="subtreeDepth > 0">
      <Node2
        v-for="n in branchingFactor"
        :key="n"
        :subtree-depth="subtreeDepth - 1"
        :branching-factor="branchingFactor"
      />
    </template>
    -
  </div>
</template>

<script>
export default {
  name: "Node2",
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
};
</script>
