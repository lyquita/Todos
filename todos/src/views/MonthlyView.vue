<script setup lang="ts">
//@ts-nocheck
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import axios from "axios";
import moment from "moment";
import router from "@/router";
import { getTodolistByMonth } from "@/services/todolist";

interface IMonthIterm{
  created_date: string,
  data: IIterm[]
}

interface IIterm {
  id: number;
  created_date: Date;
  username: string;
  text: string;
  status: string;
  month: string;
  year: string;
}

const rawData = ref([]);
const listData = ref<IMonthIterm[]>([]);
const currentMonth = ref("");
const currentYear = ref("");
const date = new Date();

currentMonth.value = moment(date).format("MM");

getTodolistByMonth(currentMonth.value)
  .then((res: any) => {
    rawData.value = res.data;
  })
  .catch((err) => console.log(err));

const computedList = computed(()=>{
const result = rawData.value.reduce(function (prev, curr) {
      const key = curr["created_date"];
      if (!prev[key]) {
      //@ts-ignore
      prev[key] = [];
      }
      prev[key].push(curr);
      return prev;
    }, [])

    return result
 

})

const calculate = computed(()=>{
  let expectedData = [];
  let temArr =[];
  const data = rawData.value
  

  for(let i=0; i<data.length; i++){
    
    if(temArr.indexOf(data[i]['created_date']) === -1){
      expectedData.push({
        'created_date': data[i]['created_date'],
        'data': [data[i]]
      })
      temArr.push(data[i]['created_date'])
    }
    else{
      for(let j=0; j< expectedData.length; j++){
        if(expectedData[j]['created_date'] === data[i]['created_date']){
          expectedData[j].data.push(data[i])
        }
      }
      listData.value = expectedData
    }
   
  }

})





function computedDate(m:string) {
  return moment(Date.parse(m)).format("MMMM DD");
}

function goBack() {
  router.back();
}
</script>

<template>
  <main class="flex flex-col w-full items-center">
    {{calculate}}
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
        {{ currentMonth }}
        <span class="text-sm">{{ currentYear }}</span>
      </div>
    </header>

    <div class="grid grid-cols-2 gap-3 w-full mt-5">
      <div
        v-for="item in listData"
        :key="item.created_date"
        class="
          w-full
          h-72
          bg-[#FDF6F0]
          flex flex-col
          items-start
          p-5
          shadow-md
          rounded-md
        "
      >
        <router-link :to="{path:'/todo', query:{'date': item.created_date} }">
          <div class="font-bold mb-3 text-lg">
            {{ computedDate(item.created_date) }}
          </div>
          <ul>
            <li
              v-for="todo in item.data"
              key="todo.id"
              class="text-base tracking-wide leading-5 list-disc mb-1"
            >
              {{ todo.text }}
            </li>
          </ul>
          <div>😁</div>
        </router-link>
      </div>
    </div>
  </main>
</template>
