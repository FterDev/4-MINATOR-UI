'use client';
import { Flex } from 'antd';
import FmCard from '../fmcard/fmcard';
import './fmfield.css';
import FmButton from '../fmbutton/fmbutton';
import { useEffect, useState } from 'react';
import FmStonePosition from '../fmstoneposition/fmstoneposition';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { useSelector } from 'react-redux';
import { getProfilePicture } from '@/app/services/firefs';
import Image from 'next/image';
import FmLoading from '../fmloading/fmloading';


interface FmFieldProps {
    matchId: string;
}







export default function FmField(fieldProps : FmFieldProps)
{

    const cols = 7; 
    const rows = 6;

    const sessionData = useSelector((state: any) => state.session);
    
    // 0 = empty / -1 = red / 1 = yellow -> init fill with 0
    const [fieldState, setFieldState] = useState(new Array(cols).fill(new Array(rows).fill(0)));

    const [loading, setLoading] = useState<boolean>(true);

    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [matchData, setMatchData] = useState<any>(null);
    
    const [currentPlayer, setCurrentPlayer] = useState<any>(null);
    const [currentPlayerAvatar, setCurrentPlayerAvatar] = useState<string>('');
    const [opponentPlayerAvatar, setOpponentPlayerAvatar] = useState<string>('');
    const [opponentPlayer, setOpponentPlayer] = useState<any>(null);


    const [playerTurn, setPlayerTurn] = useState<number>(0);
    const [winner, setWinner] = useState<number>(0);



    const currentPlayerColor = matchData?.playerRed.id === currentPlayer?.id ? -1 : 1;
    const opponentPlayerColor = matchData?.playerRed.id === opponentPlayer?.id ? -1 : 1;


    async function sendMove(move: number)
    {
        var matchId = fieldProps.matchId;
        await connection?.invoke("MakeMove", move, matchId).catch((err) => console.log(err));
    }



    if(winner != 0)
    {
        if(currentPlayer || opponentPlayer)
        {
            var winnerName = winner == currentPlayerColor ? currentPlayer.user.nickname : opponentPlayer.user.nickname;
            setTimeout(() => {}, 1000); 
            alert('Winner is ' + winnerName);
        }
    }
    

    useEffect(() => {
        const connect = new HubConnectionBuilder()
            .withUrl(process.env.NEXT_PUBLIC_LINK_BACKEND + "/matchHub", {skipNegotiation: false, transport: 1, accessTokenFactory: () => sessionData.token 
            })
            .withAutomaticReconnect()
            .build();

        setConnection(connect);

        connect.start().then(() => {
            
            connect.on('ReceiveMatch', (matchData) => {
                setMatchData(matchData);
                connect.invoke("GetPlayers", matchData.id).catch((err) => console.log(err));
            });

            connect.on('ReceivePlayers', (players) => {
             
                
                setCurrentPlayer(players.find((player: any) => player.user.externalId === sessionData.userId));
                setOpponentPlayer(players.find((player: any) => player.user.externalId !== sessionData.userId));
               
                getProfilePicture(players.find((player: any) => player.user.externalId === sessionData.userId).user.externalId).then((res) => {
                    setCurrentPlayerAvatar(res!);
                });
    
                getProfilePicture(players.find((player: any) => player.user.externalId !== sessionData.userId).user.externalId).then((res) => {
                    setOpponentPlayerAvatar(res!);
                });
                
                
            });

            connect.on('ReceiveGameBoard', (gameBoard) => {
                var gameBoard = JSON.parse(gameBoard);
             
                setPlayerTurn(gameBoard.CurrentPlayer);
                setFieldState(gameBoard.Board);
                if(gameBoard.Winner != 0)
                {
                    setWinner(gameBoard.Winner);
                }

         
                
            });

            console.log(fieldProps.matchId);

            connect.invoke("JoinMatch", fieldProps.matchId).catch((err) => console.log(err));
            connect.invoke("GetGameBoard", fieldProps.matchId).catch((err) => console.log(err));

            setLoading(false);

        }).catch((err) => console.log(err));

        return () => {
            if (connection) {
                connection.off('ReceiveMatch');
                connection.off('ReceivePlayers');
                connection.stop();
            }
        }


    }, []);

    return(
        loading ? <FmLoading/> :
        <FmCard className='fm-field-card'>
            <Flex vertical>
                <Flex justify='space-evenly' className='fm-field-header'>
                    <FmButton className='fm-field-button' text={'Help'}></FmButton>
                    <Flex vertical justify='space-between' className='fm-field-header-status'>
                        <label>07:59</label>
                        <label>Hosted by RobotXY</label>
                    </Flex>
                    <FmButton className='fm-field-button' text={'Leave Game'} color='danger'></FmButton>
                </Flex>
                <Flex className='fm-field-main' justify='center'>
                    <Flex className='fm-field-player' vertical align='center'>
                        <Image className={`fm-field-player-${currentPlayerColor == -1 ? 'red' : 'yellow'} ${playerTurn == currentPlayerColor ? 'active' : ''} `} src={currentPlayerAvatar} alt='logo' width={0} height={0} sizes='100vw'  />
                        <label>
                            {currentPlayer?.user.nickname}
                        </label>
                        <div></div>
                    </Flex>
                    <Flex className='fm-field-game' align='center' justify='center'>
                        {fieldState.map((col, colIndex) => {
                            return (
                                <Flex vertical key={colIndex} className={`fm-field-col ${playerTurn == currentPlayerColor ? 'col-active' : ''}` } onClick={playerTurn == currentPlayerColor ? () => sendMove(colIndex) : ()=>{}}> 
                                    {col.map((row:number, rowIndex:number) => {
                                        return (
                                            <FmStonePosition key={rowIndex} color={row} />
                                        )
                                    })}
                                </Flex>
                            )
                        }
                        )}
                    </Flex>
                    <Flex className='fm-field-player' vertical align='center'>
                        <Image className={`fm-field-player-${opponentPlayerColor == -1 ? 'red' : 'yellow'} ${playerTurn != currentPlayerColor ? 'active' : ''}`} src={opponentPlayerAvatar} alt='logo' width={0} height={0} sizes='100vw'  />
                        <label>
                            {opponentPlayer?.user.nickname}
                        </label>
                    </Flex>
                </Flex>
                <Flex className='fm-field-header' justify='center' align='center'>
                    <FmButton className='fm-field-button' text={'Joker (2x)'} />
                </Flex>
            </Flex>
        </FmCard>
    )
}
