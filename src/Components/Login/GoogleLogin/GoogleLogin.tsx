import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getGoogleWorker } from "../../../Redux/Reducer/reducer";
import Header from "../../Header/Header";

const GoogleLogin = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGoogleWorker());
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