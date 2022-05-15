import axios from "axios";

export interface IDate {
  date: Date;
}


export async function getTodolistByDate(data: IDate): Promise<any> {
  const res = await axios.get(`todolist/daily/?date=${data}`);

  return res;
}

export async function getTodolistByMonth(month: string):Promise<any> {
    const res = await axios.get(`todolist/monthly/?month=${month}`);

    return res;
}
