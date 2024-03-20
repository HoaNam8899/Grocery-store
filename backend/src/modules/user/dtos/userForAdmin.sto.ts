
import { Expose } from "class-transformer";

export class UserDtoForAdmin {
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
    role: number

    @Expose()
    status: boolean

    @Expose()
    create_at: string

    @Expose()
    update_at: string

}