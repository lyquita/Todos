import axios from "axios";

export interface IDate {
  date: Date;
}

export interface ITodo {
  username: string,
  created_date: Date,
  text: string,
  status: string,
  month: string,
  year: string
}


export async function getTodolistByDate(data: IDate): Promise<any> {
  const res = await axios.get(`todolist/daily/?date=${data}`);

  return res;
}

export async function getTodolistByMonth(month: string):Promise<any> {
    const res = await axios.get(`todolist/monthly/?month=${month}`);

    return res;
}


export async function postNewTodo(data:ITodo):Promise<any> {
  const res = await axios.post(`todolist/daily/`, data)

  return res;
}