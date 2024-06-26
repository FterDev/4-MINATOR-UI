'use client';



import FmButton from '@/app/components/ui/fmbutton/fmbutton';
import './page.css';
import FmCard from "@/app/components/ui/fmcard/fmcard";
import FmTable from "@/app/components/ui/fmtable/fmtable";
import { Flex } from "antd";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { EditAttributesOutlined, SignalWifi0BarRounded, SignalWifiStatusbar4Bar } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

import { useRouter } from 'next/navigation';






export default function Robots()
{

    const session :any = useSession({
        required: true,
        onUnauthenticated() {
          redirect('/auth/signin');
        },
        
      });

    const columns = [
        { key: 'id', title: 'ID' },
        { key: 'name', title: 'Name' },
        { key: 'status', title: 'Status' },
        { key: 'edit', title: ''}
    ];

    const backendUrl = process.env.NEXT_PUBLIC_LINK_BACKEND;



    interface Robot {
        id: number;
        name: string;
        status: number;
    }

    const [data, setData] = useState<Robot[]>([]);
    const [connection, setConnection] = useState<HubConnection | null>(null);

    const router = useRouter();

    
    

    useEffect(() => {

        const connect = new HubConnectionBuilder()
            .withUrl(backendUrl + "/robotsHub", {skipNegotiation: true, transport: 1})
            .withAutomaticReconnect()
            .build();

        setConnection(connect);

        connect.start().then(() => { 
            connect.on("ReceiveRobots", (res) => {
                console.log(res);
                setData(res);
            });
            connect.invoke("GetRobots").catch((err) => console.log(err));         
        
        }).catch((err) => console.log(err));

        return () => {
            if (connection) {
                connection.off("ReceiveRobots");
            }
        }
        
    }, []);


   
    return (
        <>
            <FmCard className="robots">
                <Flex align='center' justify='space-between'>
                    <FmButton text={'Back'} onClick={() => {router.push("/game/nav")}} />
                    <FmButton text={'Add'} onClick={() => {router.push("robots/new")}} />
                </Flex>
                <Flex className='table'>
                    <FmTable columns={columns} data={data} />
                </Flex>
            </FmCard>
        </>
    );
}


Robots.requireAuth = true;