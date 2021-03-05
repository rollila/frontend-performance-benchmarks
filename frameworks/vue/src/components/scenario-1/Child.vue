<template>
  <div>{{ id }}</div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
};
</script>
