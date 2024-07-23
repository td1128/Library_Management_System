import React from "react"
import ButtomGrp from "./components/Buttom";
import Heading from "./components/Heading";
import VerifyHead from "./components/VerifyACText"
import StudentDetails from "./components/StudentDetails";
import CustomTable from './components/CustomTable';
import YetToTakeAction from "./components/YetToTakeAction"
import ActionCards from "./components/ActionCards";
export const Etasks=()=>{

    return(
        <>
        <Heading/>
        <YetToTakeAction/>
        <VerifyHead/>
        
        <StudentDetails/>
        <ActionCards/>
        <ActionCards/>
        <ActionCards/>
        <CustomTable/>
        <br></br>
      <ButtomGrp/>
    </>
    )
}