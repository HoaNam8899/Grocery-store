
import { Expose } from "class-transformer";

export class UserDtoForReturn {
    @Expose()
    user_id: string

    @Expose()
    email: string

    @Expose()
    username: string

    @Expose()
    fullname: string

    @Expose()
    phone: string

    @Expose()
    address: string

    @Expose()
    status: boolean

}