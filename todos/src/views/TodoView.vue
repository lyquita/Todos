<script setup lang="ts">
import List from "../components/TodoView/List.vue";
import AddTodo from "../components/TodoView/Addtodo.vue";
import { getTodolistByDate } from "@/services/todolist";
import { ref } from "vue";
import axios from "axios";
import moment from "moment";
import router from "@/router";

const todos = ref([]);
const length = ref(0);
const newTodo = ref("");
const today = ref('')

const date = new Date()
today.value= moment(date).format('yyyy-MM-DD')


getTodolistByDate(today.value)
  .then(res => todos.value = res.data)
.catch((err => console.log('err', err)))


function addTodo(todo: { value: string }) {
  todos.value.push({
    id: length.value++,
    text: todo.value,
    status: "pending",
  });
  newTodo.value = "";
}

function removeTodo(todo) {
  let removeEl = todos.value.findIndex((x) => x.id == todo.id);
  todos.value.splice(removeEl, 1);
}

function goBack() {
  router.back();
}


</script>

<template>
  <main class="flex flex-col w-full items-center">
    <header class="text-2xl flex w-full justify-between">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1"
        @click="goBack"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <div>
        May 01 <span class="text-sm">2022</span>
        <router-link to="/monthly-todo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 ml-20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
          />
        </svg>
        </router-link>
      </div>
    </header>
    <p>{{ newTodo }}</p>
    <div
      class="
        w-full
        bg-[#FDF6F0]
        flex flex-col
        items-start
        p-5
        shadow-md
        rounded-md
        mt-10
      "
    >
      <List :todos="todos" @removeTodo="removeTodo" />
    </div>
    <AddTodo @addTodo="addTodo" />
  </main>
</template>
