<script setup lang="ts">
import { updateTodo } from "@/services/todolist";
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";

interface ITodo {
  id: number;
  text: string;
  status: "pending" | "working" | "done";
}

const props = defineProps(["todos"]);
const emit = defineEmits(["removeTodo"]);

function onChecked(e:any) {
  const index = parseInt(e.target.value);
  props.todos.find((x:any) => x.id === index).status = "done";
  const newTodo = props.todos.find((x:any) => x.id === index);
  updateTodo(index, newTodo)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

function onWorking(e:any) {
  const index = parseInt(e);
  props.todos.find((x:any) => x.id === index).status = "working";
  const newTodo = props.todos.find((x:any) => x.id === index);
  updateTodo(index, newTodo)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

function onPending(e:any) {
  const index = parseInt(e);
  props.todos.find((x:any) => x.id === index).status = "pending";
  const newTodo = props.todos.find((x:any) => x.id === index);
  updateTodo(index, newTodo)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

function onRemove(e:any) {
  const index = parseInt(e);
  emit("removeTodo", e);
}
</script>

<template>
  <main class="w-full">
    <div class="mb-5">
      <h3 class="text-lg">Todos</h3>
      <ul>
        <template v-for="todo in todos">
          <li
            v-if="todo.status === 'pending'"
            :key="todo.id"
            class="
              text-base
              tracking-wide
              leading-5
              my-2
              flex
              justify-between
              hover:bg-slate-200
            "
          >
            <div class="flex items-center">
              <input
                :id="todo.id"
                type="checkbox"
                :value="todo.id"
                @click="onChecked"
                class="
                  w-4
                  h-4
                  text-blue-600
                  bg-gray-100
                  rounded
                  border-gray-300
                  focus:ring-blue-500
                  dark:focus:ring-blue-600 dark:ring-offset-gray-800
                  focus:ring-2
                  dark:bg-gray-700 dark:border-gray-600
                "
              />
              <label
                :for="todo.id"
                class="
                  ml-2
                  text-sm
                  font-medium
                  text-gray-900
                  dark:text-gray-300
                "
                >
                <input type="text" :value="todo.text" class="bg-[#FDF6F0]"/>
              </label>
            </div>
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 inline-block mr-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1"
                @click="onWorking(todo.id)"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <svg
                class="w-6 h-6 inline-block"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                @click="onRemove(todo)"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
            </div>
          </li>
        </template>
      </ul>
    </div>
    <div class="mb-5">
      <h3 class="text-lg">In progress</h3>
      <ul>
        <template v-for="todo in todos">
          <li
            v-if="todo.status === 'working'"
            :key="todo.id"
            class="
              text-base
              tracking-wide
              leading-5
              my-2
              flex
              justify-between
              hover:bg-slate-200
            "
          >
            <div class="flex items-center">
              <input
                :id="todo.id"
                type="checkbox"
                :value="todo.id"
                @click="onChecked"
                class="
                  w-4
                  h-4
                  text-blue-600
                  bg-gray-100
                  rounded
                  border-gray-300
                  focus:ring-blue-500
                  dark:focus:ring-blue-600 dark:ring-offset-gray-800
                  focus:ring-2
                  dark:bg-gray-700 dark:border-gray-600
                "
              />
              <label
                :for="todo.id"
                class="
                  ml-2
                  text-sm
                  font-medium
                  text-gray-900
                  dark:text-gray-300
                "
                >{{ todo.text }}</label
              >
            </div>
            <div>
              <svg
                class="w-6 h-6 inline-block mr-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                @click="onPending(todo.id)"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M5 15l7-7 7 7"
                ></path>
              </svg>
              <svg
                class="w-6 h-6 inline-block"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                @click="onRemove(todo)"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
            </div>
          </li>
        </template>
      </ul>
    </div>
    <div class="mb-5">
      <h3 class="text-lg">Done</h3>
      <ul>
        <template v-for="todo in todos">
          <li
            class="
              text-base
              tracking-wide
              leading-5
              my-2
              hover:bg-slate-200
              flex
              justify-between
            "
            v-if="todo.status === 'done'"
            :key="todo.id"
          >
            <p
              class="
                ml-2
                text-sm
                font-medium
                text-gray-900
                dark:text-gray-300
                line-through
                ml-0
              "
            >
              {{ todo.text }}
            </p>
            <div>
              <svg
                class="w-6 h-6 inline-block mr-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                @click="onPending(todo.id)"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M5 15l7-7 7 7"
                ></path>
              </svg>
              <svg
                class="w-6 h-6 inline-block"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                @click="onRemove(todo)"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>
