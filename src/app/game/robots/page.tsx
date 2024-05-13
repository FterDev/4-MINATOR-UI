'use client';

import FmButton from '@/app/components/ui/fmbutton/fmbutton';
import './page.css';
import FmCard from "@/app/components/ui/fmcard/fmcard";
import FmTable from "@/app/components/ui/fmtable/fmtable";
import { Flex } from "antd";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { EditAttributesOutlined, SignalWifi0BarRounded, SignalWifiStatusbar4Bar } from '@mui/icons-material';






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
        { key: 'email', title: 'Status' },
        { key: 'edit', title: ''}
    ];

    const data = [{
        id: 1,
        name: 'Robot 1',
        email: <SignalWifiStatusbar4Bar/>,
        edit: <FmButton text={<EditAttributesOutlined/>} className='fm-table-button' />
    }
    ];

    return (
        <>
            <FmCard className="robots">
                <Flex>
                    <FmTable columns={columns} data={data} />
                </Flex>
            </FmCard>
        </>
    );
}


Robots.requireAuth = true;