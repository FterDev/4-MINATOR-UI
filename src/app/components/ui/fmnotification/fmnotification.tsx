import './fmnotification.css';


interface FmNotificationProps {
    children: any;
    show: boolean;
}


export default function FmNotification(data: FmNotificationProps)
{
    return(
        <div className={`fm-notification ${data.show ? 'visible' : ''}`}>
            {data.children}
        </div>
    )
}