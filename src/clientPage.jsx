import { useState } from "react";
import { BusinessDataClients } from './businessClient';
import { Showservice } from './showService';
import { Appointments } from "./meetingClient"
import { LoginForm } from './loginForm';

export function ClientPage() {

    return (
        <div className="body">
            <BusinessDataClients />
            <Showservice/>
            <Appointments/>
        </div>
    );
}