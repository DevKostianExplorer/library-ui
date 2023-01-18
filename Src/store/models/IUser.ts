export interface IUser {
    id: number,
    group_id: number,
    role_id: number,
    forename: string,
    surname: string,
    middlename: string,
    phone_number: string,
    login_name: string,
    email_address: string,
    confirmation_token: string,
    token_generation_time: string
}