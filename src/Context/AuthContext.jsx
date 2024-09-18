import axios from "axios";
import { createContext, useState} from "react";

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [recordInfo, setRecordInfo] = useState({
        date: "",
        heartRate: "",
        bodyTemperature: "",
        bloodPressure: "",
        id: "",
    })
    const [records, setRecords] = useState([])

    const handleDelete = async(id) => {
        const userConfirm = confirm("Are you sure you want to delete")
        if(userConfirm){
          try {
            const deleteRecord = await axios.delete(`http://localhost:3000/${id}`)
            if(!deleteRecord){
              throw new Error(`Error ${deleteRecord.status}`)
            }
            setRecords((prevRecords) => prevRecords.filter(record => record.id !== id));
            alert("Record deleted successfully")
          } catch (error) {
            console.log(error)
          }
        }
        return
      }


    return(
        <AuthContext.Provider value={{recordInfo, setRecordInfo, records, setRecords, handleDelete}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}