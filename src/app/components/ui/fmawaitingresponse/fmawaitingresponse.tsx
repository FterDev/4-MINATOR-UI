'use client';

import { Flex } from "antd";
import FmCard from "../fmcard/fmcard";
import { useSelector } from "react-redux";
import Image from "next/image";
import { getProfilePicture } from "@/app/services/firefs";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import './fmawaitingresponse.css';
import FmButton from "../fmbutton/fmbutton";




interface FmAwaitingResponseProps {
    playerNickname: string;
    playerExternalId: string;
    awaitingResponse: boolean;
    cancelMethod: () => void;
    acceptMethod: () => void;
}


export default function FmAwaitingResponse(data: FmAwaitingResponseProps) {

    const sessionData = useSelector((state: any) => state.session);
    const [ownPicture, setOwnPicture] = useState<string>('');
    const [playerPicture, setPlayerPicture] = useState<string>('');

    useEffect(() => {
    
        getProfilePicture(sessionData.userId).then((res) => {
            setOwnPicture(res!);
        });

        getProfilePicture(data.playerExternalId).then((res) => {
            setPlayerPicture(res!);
        });

    }, []);

    return (
        <FmCard className="fm-awaiting-response">
            <Flex vertical justify="center" align="center">
                <Flex justify="space-between" align="center" className="fm-awaiting-vs">
                    <Flex vertical align="center" justify="center">
                        { ownPicture == '' ? <LoadingOutlined /> : <Image src={ownPicture} alt="logo" width={0} height={0} sizes="100vw" className="fm-awaiting-response-profilepic" /> }
                        
                    </Flex>
                    <Flex vertical justify="center" className="fm-awaiting-vs">
                        <p>{sessionData.nickname}</p>
                        <span>vs</span> 
                        <p>{data.playerNickname}</p>
                    </Flex>
                    <Flex vertical align="center" justify="center">
                        { playerPicture == '' ? <LoadingOutlined /> : <Image src={playerPicture} alt="logo" width={0} height={0} sizes="100vw" className="fm-awaiting-response-profilepic" /> }
                        
                    </Flex>
                </Flex>
                <div className="fm-awaiting-response-state">
                    {data.awaitingResponse ? <h3>Waiting for response from {data.playerNickname}</h3> : <h3>Accept request from {data.playerNickname}?</h3>}
                </div>
                { !data.awaitingResponse ?  
                    <Flex className="fm-awaiting-response-buttons" justify="center">
                        <FmButton text="Accept" color="success" className="fm-request-button" onClick={() => data.acceptMethod()}/>
                        <FmButton text="Decline" color="danger" className="fm-request-button" onClick={() => data.cancelMethod()}/>
                    </Flex>
                    :
                    <Flex className="fm-awaiting-response-buttons" justify="center">
                        <FmButton text="Cancel" color="danger" className="fm-request-button" onClick={()=>data.cancelMethod()}/>
                    </Flex>
                }
            </Flex>
        </FmCard>
    )
}






