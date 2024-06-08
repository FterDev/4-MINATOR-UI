'use client';
import FmAwaitingResponse from "@/app/components/ui/fmawaitingresponse/fmawaitingresponse";
import FmLobby from "@/app/components/ui/fmlobby/fmlobby";
import FmNotification from "@/app/components/ui/fmnotification/fmnotification";
import { setMatchId } from "@/app/slices/sessionSlice";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

 



export default function Lobby()
{


    const sessionData = useSelector((state: any) => state.session);

    const [players, setPlayers] = useState<String>('');
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [waitingResponse, setWaitingResponse] = useState<boolean>(false);
    const [requestingMatch, setRequestingMatch] = useState<boolean>(false);
    const [modal , setModal] = useState<boolean>(false);

    const dispatch = useDispatch();
    const router = useRouter();

    const [matchData, setMatchData] = useState<any>(null);
    const [requester, setRequester] = useState<any>(null);
    const [targetPlayer, setTargetPlayer] = useState<any>(null);

    const backendUrl = process.env.NEXT_PUBLIC_LINK_BACKEND;


    async function requestMatch(playerId: number)
    {
        connection?.invoke("RequestMatch", playerId).catch((err) => console.log(err));
    }

    async function cancelMatch()
    {
        connection?.invoke("CancelMatch", matchData.id).catch((err) => console.log(err));
    }

    async function acceptMatch()
    {
        connection?.invoke("AcceptMatch", matchData.id).catch((err) => console.log(err));
    }


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
                setPlayers(res);
            });

            connect.on("ReceiveMatchRequest", (res) => {
                setRequester(res);
                setModal(true);
                setRequestingMatch(true);
            });

            connect.on("ReceiveTargetUser", (res) => {
                setWaitingResponse(true);
                setModal(true);
                setTargetPlayer(res);
                
            });

            connect.on("ReceivePendingMatch", (res) => {
                setMatchData(res);
            });

            connect.on("ReceiveMatchCanceled", () => {
                setModal(false);
                setWaitingResponse(false);
                setRequestingMatch(false);
                setMatchData(null);
            });

            connect.on("ReceiveMatchAccepted", (res) => {
                console.log(res);
                dispatch(setMatchId(res));
                connection?.stop();
                router.push('/game/gm/' + res);
            });


            
        }).catch((err) => console.log(err));

        return () => {
            if (connection) {
                connection.off("ReceiveWaitingPlayers");
                connection.off("ReceiveMatchRequest");
                connection.off("ReceiveTargetUser");
                connection.off("ReceivePendingMatch");
                connection.off("ReceiveMatchCanceled");
                connection.off("ReceiveMatchAccepted");
                connection.stop();
            }
        }
        
    }, []);

    
    return (
        <>
        <FmLobby data={players} requestMatch={requestMatch} />  
        <FmNotification show={modal}>
            {waitingResponse && <FmAwaitingResponse playerNickname={targetPlayer.nickname} playerExternalId={targetPlayer.externalId} awaitingResponse cancelMethod={cancelMatch} acceptMethod={ () => {}} ></FmAwaitingResponse>}
            {requestingMatch && <FmAwaitingResponse playerNickname={requester.nickname} playerExternalId={requester.externalId} awaitingResponse={false} cancelMethod={cancelMatch} acceptMethod={acceptMatch}></FmAwaitingResponse>}
        </FmNotification>
        </>
        
    )
    
         
    
}