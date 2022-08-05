
export interface ClientType {
    name:String,
    lastName:String,
    password:String,
    user_mail:String,
    birthdate:String,
    image:String,
    errors:errorsType,
    disabled:boolean
}

export interface errorsType {
    name:String,
    lastName:String,
    password:String,
    user_mail:String,
    birthdate:String,
    image:String,
}