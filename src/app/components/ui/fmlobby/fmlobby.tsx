'use client';  
import { Flex } from "antd";
import FmCard from "../fmcard/fmcard";
import './fmlobby.css'
import FmButton from "../fmbutton/fmbutton";
import FmTable from "../fmtable/fmtable";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useDispatch, useSelector } from "react-redux";
import { FmLobbyCell } from "../fmlobbycell/fmlobbycell";
import { setMatchId } from "@/app/slices/sessionSlice";
import FmNotification from "../fmnotification/fmnotification";
import FmAwaitingResponse from "../fmawaitingresponse/fmawaitingresponse";
import FmLoading from "../fmloading/fmloading";
import { FmModal } from "../fmmodal/fmmodal";
import { LoadingOutlined } from "@ant-design/icons";
import FmSelector, { FmSelectorOptions } from "../fmselector/fmselector";

export default function FmLobby()
{

    
    

    const sessionData = useSelector((state: any) => state.session);

    const [players, setPlayers] = useState<any>();
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [waitingResponse, setWaitingResponse] = useState<boolean>(false);
    const [requestingMatch, setRequestingMatch] = useState<boolean>(false);
    const [modal , setModal] = useState<boolean>(false);
    const [botLevelWindow, setBotLevelWindow] = useState<boolean>(false);

    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);

    const [matchData, setMatchData] = useState<any>(null);
    const [requester, setRequester] = useState<any>(null);
    const [targetPlayer, setTargetPlayer] = useState<any>(null);

    const botLevels: FmSelectorOptions[] = [
        {key: 0, value: "Easy"},
        {key: 1, value: "Medium"},
        {key: 2, value: "Hard"}
    ];

    const [selectedBotLevel, setSelectedBotLevel] = useState<number>(0);

    


    const backendUrl = process.env.NEXT_PUBLIC_LINK_BACKEND;


    async function requestMatch(playerId: number)
    {
        connection?.invoke("RequestMatch", playerId).catch((err) => console.log(err));
    }


    async function requestBotMatch()
    {
        connection?.invoke("RequestMatchBot", selectedBotLevel).catch((err) => console.log(err));
    }

    async function cancelMatch()
    {
        connection?.invoke("CancelMatch", matchData.id).catch((err) => console.log(err));
    }

    async function acceptMatch()
    {
        connection!.invoke("AcceptMatch", matchData.id).catch((err) => console.log(err));
    }

    function openBotLevelWindow()
    {
        setBotLevelWindow(true);
    }

    function showBotLevel()
    {
        console.log(selectedBotLevel);
    
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
                console.log(res);
                setPlayers(res);
                setLoading(false);
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
                router.push('/game/' + res);
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
    


    return(
        <> 
            <Flex justify="center">
                <FmCard className="fm-lobby-card">
                    <Flex className="fm-lobby-options">
                        <FmButton text="Back" className="fm-lobby-button" onClick={()=>{router.push('/game/nav')}}/>
                    </Flex>
                    <Flex className="fm-lobby-title" justify="center">
                        <h1>Available Bots:</h1>
                    </Flex>
                    <div className="fm-lobby-table-wrapper">
                        <FmLobbyCell externalId='dyeh9EByFNfR8qqQEqTz92af0kQ2' nickname='T-800' playerId={800} request={openBotLevelWindow} />
                    </div>
                    <Flex className="fm-lobby-title" justify="center">
                        <h1>Available Players:</h1>
                    </Flex>
                    <div className="fm-lobby-table-wrapper">
                        {players == undefined ? <LoadingOutlined /> :
                        players.map((player: any) => {
                            console.log(player);
                            return <FmLobbyCell externalId={player.user.externalId} nickname={player.user.nickname} playerId={player.id} request={requestMatch} />
                        })}
                    </div> 
                </FmCard>
            </Flex>
            
            
            <FmNotification show={modal}>
                {waitingResponse && <FmAwaitingResponse playerNickname={targetPlayer.nickname} playerExternalId={targetPlayer.externalId} awaitingResponse cancelMethod={cancelMatch} acceptMethod={ () => {}} ></FmAwaitingResponse>}
                {requestingMatch && <FmAwaitingResponse playerNickname={requester.nickname} playerExternalId={requester.externalId} awaitingResponse={false} cancelMethod={cancelMatch} acceptMethod={acceptMatch}></FmAwaitingResponse>}
            </FmNotification>
            <FmModal visible={botLevelWindow} textOk='Play' onCancel={()=>{setBotLevelWindow(false)}} onOk={() => {requestBotMatch()}}>
                <Flex vertical align="center" justify="center">
                    <h3>Select Bot Level:</h3>
                    <FmSelector options={botLevels} selected={selectedBotLevel} onSelect={(key) => {setSelectedBotLevel(key)}}>

                    </FmSelector>
                </Flex>
            </FmModal>
        </>
    )
}