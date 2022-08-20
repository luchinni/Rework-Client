import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getGoogleWorker, getGoogleClient } from "../../../Redux/Reducer/reducer";
import Header from "../../Header/Header";

const GoogleLogin = () => {
    const dispatch = useDispatch()
    const clientType = localStorage.getItem("clientToken")
    const workerType = localStorage.getItem("workerToken")

    useEffect(() => {
        if(clientType){
            dispatch(getGoogleClient())
        } else if(workerType){
            dispatch(getGoogleWorker());
        }
      }, [])
    
    const currentUser: any = useSelector((state: any) => state.workService.currentUser)
   /*  console.log("el user", currentUser) */
    
    return (
        <div>
            <Header/>
            {currentUser?.id !== '' ?
            <div> 
                <span>LOGEADO PA</span>
            </div>
            :
            <div>
                <span>NO LLEGO NADA PA</span>
            </div>}
        </div>
    )
}

export default GoogleLogin