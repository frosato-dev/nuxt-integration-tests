<script setup lang="ts">
const { data } = await useFetch<{ message: string }>(
  "https://mockanapi.com/s/6773ca761e6f1a48a311752a/test2",
  {
    responseType: "json",
  }
);
</script>

<template>
  <div>
    <h1>Homepage</h1>
    <div v-if="data" data-testid="api">{{ data.message }}</div>
    <NuxtLink to="/demo-1">Aller à Demo 1</NuxtLink>
  </div>
</template>
