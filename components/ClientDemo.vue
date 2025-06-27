<script setup lang="ts">
const { data } = await useFetch<{ message: string }>(
  "https://mockanapi.com/s/6773ca761e6f1a48a311752a/test2",
  {
    responseType: "json",
  }
);
</script>

<template>
  <div v-if="data" data-testid="client">{{ data.message }}</div>
</template>
