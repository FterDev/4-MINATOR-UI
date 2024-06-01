'use client';
import FmLobby from "@/app/components/ui/fmlobby/fmlobby";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

 



export default function Lobby()
{


    const sessionData = useSelector((state: any) => state.session);

    const [data, setData] = useState<String>('');
    const [connection, setConnection] = useState<HubConnection | null>(null);

    const backendUrl = process.env.NEXT_PUBLIC_LINK_BACKEND;

    useEffect(() => {

        const connect = new HubConnectionBuilder()
            .withUrl(backendUrl + "/lobbyHub", {skipNegotiation: false, transport: 1, accessTokenFactory: () => sessionData.token 
            })
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build();

        setConnection(connect);

        connect.start().then(() => { 
            
            connect.on("ReceiveWaitingPlayers", (res) => {
                console.log(res);
                
            });

            
        }).catch((err) => console.log(err));

        return () => {
            if (connection) {
                connection.off("ReceiveWaitingPlayers");
                
            }
        }
        
    }, []);

    
   
    return (
        <FmLobby>
            
        </FmLobby>
    )
}