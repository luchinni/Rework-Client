
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


export interface userLogin{
    user_mail: String,
    password: String
}

export interface currentUsers{
    user_mail: String,
    password: String,
    isWorker: Boolean,
    isAdmin: Boolean
}

export interface errorLogin{
    user_mail: String,
    password: String
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
    inputSkills: String[]
    inputProfessions: String[]
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

export interface newOfferType{
    userClientIdClient:String,
    title:String,
    post_duration_time:Date,
    min_remuneration:Integer,
    max_remuneration:Integer,
    // work_duration_time:Number,
    // work_duration_time_select:String,
    offer_description:String,
    photo:String,
    profession:String
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

export interface loginType {
    user_mail:String,
    password:String
}