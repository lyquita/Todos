<script setup lang="ts">
import { ref } from "@vue/reactivity";

const emit = defineEmits(["addTodo"]);
const inputValue = ref("");

function submit() {
  emit("addTodo", inputValue);
  inputValue.value = "";
}
</script>

<template>
  <main class="flex fixed bottom-3 w-full justify-center">
    <textarea
      id="chat"
      v-model="inputValue"
      rows="1"
      class="block ml-5 p-2.5 w-4/5 text-center text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
      placeholder="Add a new todo here..."
    ></textarea>
    <button
      @click="submit"
      class="inline-flex justify-center p-2 rounded-full cursor-pointer active:bg-[#FCD8D4] dark:text-blue-500 dark:hover:bg-gray-600 items-center"
    >
   <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
</svg>
    </button>
  </main>
</template>
