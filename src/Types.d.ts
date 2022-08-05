
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

export interface WorkerType{
    name:String,
    lastName:String,
    password:String,
    user_mail:String,
    birthdate:String,
    image:String,
    profession: String[],
    skills: String[],
    errors:errorsType,
    disabled:boolean,
    inputSkills:Array
}

export interface newClientType {
    name:String,
    lastName:String,
    password:String,
    user_mail:String,
    birthdate:String,
    image:String,
}

export interface newWorkerType {
    name:String, 
    lastName:String, 
    password:String, 
    user_mail:String, 
    born_date:String, 
    image:String, 
    profession:String[], 
    skills:String[]

}

export interface errorsType {
    name:String,
    lastName:String,
    password:String,
    user_mail:String,
    birthdate:String,
    image:String,
}

export interface errorsTypeWorker {
    name:String,
    lastName:String,
    password:String,
    user_mail:String,
    birthdate:String,
    image:String,
}
