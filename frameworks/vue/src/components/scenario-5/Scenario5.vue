<template>
  <div>
    <label>Select branching factor</label>
    <input
      id="input-branching-factor"
      type="number"
      :value="branchingFactor"
      @change="onUpdateBranchingFactor"
    />
    <label>Select tree depth</label>
    <input
      id="input-tree-depth"
      type="number'"
      :value="treeDepth"
      @change="onUpdateTreeDepth"
    />
    <button id="btn-generate" @click="generate">Generate tree</button>
    <div>{{ count }}</div>
    <button id="btn-increment-root" @click="increment">Update root</button>
    <button id="btn-update-tree" @click="updateTree">Update entire tree</button>
    <div v-if="initialized">
      <Node
        v-for="n in branchingFactor"
        :key="n"
        :branching-factor="branchingFactor"
        :subtree-depth="treeDepth - 1"
        :prop="prop"
      />
    </div>
  </div>
</template>

<script>
import Node from "./Node";

export default {
  components: {
    Node,
  },
  data() {
    return {
      branchingFactor: 0,
      treeDepth: 0,
      initialized: false,
      count: 0,
      prop: 0,
    };
  },
  methods: {
    onUpdateBranchingFactor(event) {
      this.branchingFactor = parseInt(event.target.value, 10);
    },
    onUpdateTreeDepth(event) {
      this.treeDepth = parseInt(event.target.value, 10);
    },
    generate() {
      this.initialized = true;
    },
    increment() {
      this.count += 1;
    },
    updateTree() {
      this.prop += 1;
    },
  },
};
</script>
