import  BusinessDetailsManagerPage  from "./businessManager";
import {Showservice} from './showService';
import { Services } from './servicePage';
import { AdminPage } from "./MeetingManager";
import { LoginForm } from './loginForm';

export function ManagerPage(){
    return(
        <>
            <BusinessDetailsManagerPage/>
            <Showservice/>
            <Services/>
            <AdminPage /> 
        </>
    )
}