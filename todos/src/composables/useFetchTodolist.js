import { ref } from "vue";
import axios from "axios";

export function useFetchTodolist() {

  const data = ref(null)
  const error = ref(null)

  const fetchdata = async( )=>{

    axios.get('http://localhost:/todos').then(
    res=> {data.value = res.data
    console.log('ddd', res.data)}
    )
    .catch(err => error.value = err)

    return { data, error}
  }

  return fetchdata



}
