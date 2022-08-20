import { useState } from 'react';
import { useSelector } from 'react-redux';
import HeaderRegister from '../../Register/HeaderRegister/HeaderRegister';



const GoogleClient = () => {

    const googleData: any = useSelector((state: any) => state.workService.googleData)
    let name: string 
    let lastname: string
    const splitedName: any = googleData.name.split(' ')
    if (splitedName.length === 3) {
        name = splitedName[0] + splitedName[1]
        lastname = splitedName[2]
    } else if (splitedName.length === 2) {
        name = splitedName[0]
        lastname = splitedName[1]
    } else if (splitedName.length === 4) {
        name = splitedName[0] + splitedName[1]
        lastname = splitedName[2] + splitedName[3]
    }


    const [user, setUser] = useState({
        name: "",
        lastName: "",
        password: "",
        user_mail: "",
        birthdate: "",
        image: "",
        errors: {
            birthdate: "Campo requerido",
            image: "",
        },
    })

    return (
        <div className='GoogleClient_component'>
            <HeaderRegister/>
            <div className='GoogleClient_titleContainer'>
                <h3 className='GoogleClient_title'>¡Un último paso!</h3>
                <h4 className='GoogleClient_subtitle'>Necesitamos corrobar que sos mayor de edad <br/>para continuar, por favor indicanos tu fecha de nacimiento</h4>
            </div>

        </div>
    )
}

export default GoogleClient