
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

export interface token{
    id: string,
    isWorker: false,
    isAdmin: false,
    user_mail: string,
    exp: number,
    iat: number
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
    born_date:String,
    photo:String,
}

export interface newWorkerType {
    name:String, 
    lastName:String, 
    password:String, 
    user_mail:String, 
    born_date:String, 
    photo:String, 
    profession:String[], 
    skills:String[]

}

export interface newOfferType{
    userClientId:String,
    title:String,
    post_duration_time:Date | String,
    min_remuneration:Integer,
    max_remuneration:Integer,
    work_duration_time:String,
    // work_duration_time_select:String,
    offer_description:String,
    photo:String,
    profession:String[]
}

export interface errorsNewOfferType {
    title:String,
    min_remuneration:String,
    max_remuneration:String,
    // work_duration_time:Number,
    // work_duration_time_select:String,
    offer_description:String,
    photo:String,
    disabled:boolean | undefined
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

export interface newPortfolioType {
    title:string,
    portfolio_description:Text,
    photo:Text
}

export interface reviewFormType {
    valoration: Number,
    review_description: String,
    
}

export interface FormProposalType{
        idWorker: String,
        idOffer: String,
        remuneration: Number,
        proposal_description: String,
        worked_time: String,
}

export interface errorsTypeEditClient {
    name:String,
    lastName:String,
    birthdate:String,
    image:String,
}

export interface ClientTypeUpdate {
    name:String,
    lastName:String,
    born_date:String,
    photo:string,
    disabled: boolean | undefined,
    errors:errorsTypeEditClient,
}

export interface errorsTypeEditWorker {
    name:String,
    lastName:String,
    birthdate:String,
    image:String,
}

export interface WorkerTypeUpdate {
    name:String,
    lastName:String,
    born_date:String,
    photo:string,
    profession: String[],
    skills: String[],
    disabled: boolean | undefined,
    errors:errorsTypeEditWorker,
}
