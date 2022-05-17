<script setup lang="ts">
//@ts-nocheck
import List from "../components/TodoView/List.vue";
import AddTodo from "../components/TodoView/Addtodo.vue";
import {
  deleteTodo,
  getTodolistByDate,
  postNewTodo,
} from "@/services/todolist";
import { computed, onBeforeMount, ref } from "vue";
import axios, { AxiosError} from "axios";
import moment from "moment";
import router from "@/router";
import route from "@/router";

const todos = ref([]);
const newTodo = ref("");
const today = ref(moment(new Date()).format("yyyy-MM-DD"));
const month = ref(moment(new Date()).format("MM"));
const year = ref(moment(new Date()).format("yyyy"));

console.log('route', route.currentRoute.value.query.date);

  if(route.currentRoute.value.query.date){
    //@ts-ignore
    today.value = route.currentRoute.value.query.date
    month.value = moment(today.value).format("MM");
    year.value = moment(today.value).format("yyyy")
    }

getTodolistByDate(today.value)
  .then((res: any) => (todos.value = res.data))
  .catch((err: AxiosError) => {
    if(err.response?.status === 401){
      router.push({name:'login', replace: true})
    }else{
      console.log('err', err);
      
    }
  });

function addTodo(todo: { value: string }) {
  const params = {
    username: localStorage.getItem("username"),
    created_date: today.value,
    text: todo.value,
    status: "pending",
    month: month.value,
    year: year.value,
  };
  //@ts-ignore
  postNewTodo(params)
    .then((res: any) => {
      getTodolistByDate(today.value)
        .then((res) => (todos.value = res.data))
        .catch((err) => console.log("err", err));

      newTodo.value = "";
    })
    .catch((err) => console.log(err));
}

function removeTodo(todo: any) {
  let removeEl = todos.value.findIndex((x) => x.id == todo.id);
  todos.value.splice(removeEl, 1);
  deleteTodo(todo.id)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
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
        {{ moment(today).format("MMMM DD") }}
        <span class="text-sm">{{ year }}</span>
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
