import axios from "axios";
import { FormData } from "./interface";

class VogueNestService {
    http = axios.create({
        baseURL : 'http://localhost:8050/api/voguenest'
    })

    async createUser(data: FormData){
        const response = await this.http.post<FormData>('/signup', data)
        return response.data
    }

}

export default new VogueNestService()