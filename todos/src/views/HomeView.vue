<script setup lang="ts">
import router from "@/router";
import { getTodolistByDate } from "@/services/todolist";
import { ref } from "@vue/reactivity";
import { computed, onBeforeMount } from "@vue/runtime-core";
import moment from "moment";
import { getUsername } from "../services/login";

interface IIterm {
  id: number;
  created_date: Date;
  username: string;
  text: string;
  status: string;
  month: string;
  year: string;
}

const username = ref("");
const isLogin = ref(false);
const userId = ref(0);
const currentTime = ref(0);
const todoAmount = ref(0);
const inprogressAmount = ref(0);
const doneAmount = ref(0);
const today = ref(moment(new Date()).format("yyyy-MM-DD"));

function onLogOut() {
  localStorage.clear();
  router.push({ name: "login" });
}

onBeforeMount(() => {
  const tokenExisted = localStorage.getItem("access_token");
  if (localStorage.getItem("user_id")) {
    //@ts-ignore
    userId.value = parseInt(localStorage.getItem("user_id"));
  }
  if (tokenExisted) {
    isLogin.value = true;
  }

  getUsername(userId.value)
    .then((res) => {
      localStorage.setItem("username", res.data.username);
      username.value = res.data.username;
    })
    .catch((err) => console.log(err));

  getTodolistByDate(today.value)
    .then((res) => {
      res.data.map((item:IIterm) => {
        switch (item.status) {
          case "pending":
            todoAmount.value = todoAmount.value + 1;
            break;
          case "working":
            inprogressAmount.value = inprogressAmount.value + 1;
            break;
          case "done":
            doneAmount.value = doneAmount.value + 1;
            break
          default:
            break;
        }
      });
    })
    .catch((err) => console.log(err));
});

const generateGreeting = computed(() => {
  const currentHour = moment().format("HH");
  console.log(currentHour);
  
  if (parseInt(currentHour) >= 3 && parseInt(currentHour) < 12) {
    return "Good Morning";
  } else if (parseInt(currentHour) >= 12 && parseInt(currentHour) < 15) {
    return "Good Afternoon";
  } else if (parseInt(currentHour) >= 15 && parseInt(currentHour) < 20) {
    currentTime.value = 1;
    return "Good Evening";
  } else if (parseInt(currentHour) >= 20 && parseInt(currentHour) < 3) {
    currentTime.value = 1;
    return "Good Night";
  } else {
    return "Hello";
  }
});
</script>

<template>
  <main>
    <div class="flex">
      <div>
        <h1 class="text-2xl">{{ generateGreeting }}</h1>
        <h2 class="text-3xl font-bold">{{ username }}!</h2>
      </div>
      <img
        class="w-28 h-28 ml-5"
        src="../assets/img/day.svg"
        v-if="currentTime === 0"
      />
      <img
        src="../assets/img/moon.svg"
        class="w-28 h28 ml-5"
        v-if="currentTime === 1"
      />
    </div>
    <div>
      <h2 class="text-2xl relative">Today</h2>
      <div class="h-3 w-16 bg-[#FBD8D4] absolute top-6 -z-10"></div>
    </div>
    <div class="mt-5">
      <router-link to="/todo">
        <div class="w-ful bg-[#F8F8F8] p-7 flex rounded-xl">
          <ul class="flex w-full justify-between">
            <li>
              <p class="font-bold">{{todoAmount}}</p>
              <p>Todo</p>
            </li>
            <li>
              <p class="font-bold">{{inprogressAmount}}</p>
              <p>In Progress</p>
            </li>
            <li>
              <p class="font-bold">{{doneAmount}}</p>
              <p>Done</p>
            </li>
          </ul>
        </div>
      </router-link>
    </div>
    <div class="mt-5">
      <div class="w-ful bg-[#F8F8F8] p-7 flex rounded-xl">
        <p>I feel pretty good today</p>
        <img src="../assets/img/emoji4.svg" alt="" class="ml-5" />
      </div>
    </div>
    <router-link to="/backlog">
      <div class="mt-5">
        <div class="w-ful bg-[#F8F8F8] p-7 rounded-xl">
          <h2 class="font-bold">Backlog</h2>
          <p>Redesign the todo list home page</p>
        </div>
      </div>
    </router-link>
    <div class="fixed bottom-4">
      <button
        v-if="isLogin"
        @click="onLogOut"
        class="
          inline-flex
          justify-center
          p-2
          rounded-full
          mt-5
          sticky
          cursor-pointer
          bg-[#FCD8D4]
          dark:text-blue-500 dark:hover:bg-gray-600
          items-center
        "
      >
        Log out
      </button>
    </div>
    <router-link to="/login">
      <div class="fixed bottom-4">
        <button
          v-if="!isLogin"
          class="
            inline-flex
            justify-center
            p-2
            rounded-full
            mt-5
            sticky
            cursor-pointer
            bg-[#FCD8D4]
            dark:text-blue-500 dark:hover:bg-gray-600
            items-center
          "
        >
          Log in
        </button>
      </div>
    </router-link>

    <!-- <router-link to="/todo">
      <h2 class="text-3xl font-bold underline">Todo</h2>
    </router-link>
    <router-link to="/login" v-if="!isLogin">
      <h2 class="text-3xl font-bold underline mt-5">Login</h2>
    </router-link>
    <h2 class="text-3xl font-bold underline mt-5" v-if="isLogin">
      Hey, {{username}}
    </h2>
    <h2
      class="text-base font-bold underline mt-5"
      v-if="isLogin"
      @click="onLogOut"
    >
      Log out
    </h2> -->
  </main>
</template>
