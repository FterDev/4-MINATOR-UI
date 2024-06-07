'use client';
import { Flex } from "antd";
import { use, useEffect, useState } from "react";
import FmButton from "../fmbutton/fmbutton";
import { LoadingOutlined, PlayCircleFilled } from "@ant-design/icons";
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "@/app/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import Image from "next/image";
import './fmlobbycell.css';
import { useSelector } from "react-redux";
import { getProfilePicture } from "@/app/services/firefs";



interface FmLobbyCellProps {
    externalId: string;
    nickname: string;
    playerId: number;
    request: (playerId: number) => void;
}





export const FmLobbyCell: React.FC<FmLobbyCellProps> = ({externalId, nickname, playerId, request}) => {
    
    const [profilePic, setProfilePic] = useState<string>('');
    const [picloading, setPicLoading] = useState<boolean>(true);
    const sessionData = useSelector((state: any) => state.session);

    useEffect(() => {
        getProfilePicture(externalId).then((res) => {
            setProfilePic(res!);
        }).then(() => {
            setPicLoading(false);
        });
    }, []);



    return (
        <Flex key={playerId} className="fm-lobbycell" align="center" justify="space-between">
            <span>{picloading ? <LoadingOutlined/> : <Image src={profilePic} alt="logo" width={75} height={75} sizes="100vw" className="fm-lobbycell-profilepic" />}</span>
            <span>{nickname}</span>
            <span>{(externalId == sessionData.userId) ? <label className="fm-lobbycell-own">YOU</label> : <FmButton text={<PlayCircleFilled/>} onClick={()=>request(playerId)} />}</span>
        </Flex>
    );
}