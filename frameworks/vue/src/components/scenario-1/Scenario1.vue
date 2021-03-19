<template>
  <div>
    <div>
      <label>Number of components or elements to create</label>
      <input
        id="input-num-to-create"
        type="number"
        min="1"
        :value="numChildren"
        @change="onUpdateValue"
      />
      <button id="btn-generate-components" @click="generateComponents">
        Generate components
      </button>
      <button id="btn-generate-elements" @click="generateElements">
        Generate static elements
      </button>
    </div>
    <div>
      <button id="btn-delete" @click="remove">Delete all components</button>
      <button id="btn-add-one" @click="addOne">Add one component</button>
      <button id="btn-switch-child-type" @click="switchType">
        Change child component type
      </button>
    </div>
    <div>
      <template v-if="childType === 1">
        <Child v-for="child in children" :key="child.id" />
      </template>
      <template v-else>
        <Child2 v-for="child in children" :key="child.id" :id="child.id" />
      </template>
      <div v-for="(element, i) in elements" :key="i">-</div>
    </div>
  </div>
</template>

<script>
import Child from "./Child";
import Child2 from "./Child2";

export default {
  components: {
    Child,
    Child2,
  },
  data() {
    return {
      numChildren: 0,
      children: [],
      elements: [],
      childType: 1,
    };
  },
  methods: {
    addOne() {
      this.children.push({ id: this.children.length });
    },
    remove() {
      this.children = [];
    },
    switchType() {
      this.childType = 2;
    },
    generateComponents() {
      this.children = new Array(this.numChildren)
        .fill(null)
        .map((_, i) => ({ id: i }));
    },
    generateElements() {
      this.elements = new Array(this.numChildren).fill(null);
    },
    onUpdateValue(event) {
      this.numChildren = parseInt(event.target.value, 10);
    },
  },
};
</script>
