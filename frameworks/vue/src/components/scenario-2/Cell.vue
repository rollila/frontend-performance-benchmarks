<template>
  <span
    >Prop value: {{ value }}, internal value: {{ count }}
    <button class="cell-btn-increment" @click="increment">
      Update child
    </button></span
  >
</template>

<script>
export default {
  props: {
    value: {
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
