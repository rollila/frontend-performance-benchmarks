<template>
  <span>{{ id }}</span>
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
