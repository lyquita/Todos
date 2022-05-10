<script setup lang="ts">
import List from "../components/TodoView/List.vue";
import AddTodo from "../components/TodoView/Addtodo.vue";
import { ref } from "vue";

let id = 0;

const todos = ref([
  {
    id: id++,
    text: "hello world",
    status: "pending",
  },
  {
    id: id++,
    text: "Why are you for living",
    status: "working",
  },
  {
    id: id++,
    text: "I love hip hop",
    status: "done",
  },
]);

const newTodo = ref("");

function addTodo(todo: { value: string; }) {

todos.value.push({
    id: id++,
    text: todo.value,
    status: "pending",
  });

  newTodo.value = "";
}

</script>

<template>
  <main class="flex flex-col w-full items-center">
    <header class="text-2xl">May 01 <span class="text-sm">2022</span></header>
    <p>{{ newTodo }}</p>
    <div
      class="w-full bg-[#FDF6F0] flex flex-col items-start p-5 shadow-md rounded-md mt-10"
    >
      <List :todos="todos" />
    </div>
    <AddTodo @addTodo="addTodo" />
  </main>
</template>
