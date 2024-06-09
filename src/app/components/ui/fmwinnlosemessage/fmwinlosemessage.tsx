import { Flex } from 'antd';
import FmCard from '../fmcard/fmcard';
import './fmwinlosemessage.css'
import FmButton from '../fmbutton/fmbutton';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


interface FmWinLoseMessageProps {
    winner: 0 | 1 | 2;
}


export default function FmWinLoseMessage(winLoseMessageProps : FmWinLoseMessageProps)
{

    const router = useRouter();

    return(
        <Flex align='center' justify='center' className='fm-winlose-container'>
            <FmCard className='fm-winlose-card'>
                <Flex align='center' justify='center' vertical className='fm-winlose-message'>
                    {winLoseMessageProps.winner === 0 && 
                        <>
                            <Image src='/img/sad.png' alt='logo' width={128} height={128} sizes='100vw'/>
                            <label>You lost... Maybe next time you'll have more luck {':)'} </label>
                        </>
                    }
                    {winLoseMessageProps.winner === 1 && 
                        <>
                            <Image src='/img/confetty.png' alt='logo' width={128} height={128} sizes='100vw'  />
                            <label>You won!</label>
                        </>
                    }
                    {winLoseMessageProps.winner === 2 && 
                        <label>It's a draw...</label>
                    }
                    <FmButton text='Back to lobby' className='fm-winlose-button' onClick={() => {router.push('/game/lobby')}}/>
                </Flex>
            </FmCard>
        </Flex>
    )
}