<script setup lang="ts">
import List from "../components/TodoView/List.vue"
import AddTodo from "../components/TodoView/Addtodo.vue"

</script>

<template>
  <main class="flex flex-col w-full items-center">
    <header class="text-2xl">May 01 <span class="text-sm">2022</span></header>
    <div
      class="w-full bg-[#FDF6F0] flex flex-col items-start p-5 shadow-md rounded-md mt-10"
    >
  <List />
    </div>
  <AddTodo />

  </main>
</template>
