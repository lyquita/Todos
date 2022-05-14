import axios from 'axios'

export interface ILogin {
  username: string;
  password: string;
}

export async function postLogin(formdata: ILogin): Promise<any> {
    const res = await axios.post('users/token/', formdata)

    return res
}
