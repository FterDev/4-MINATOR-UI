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
import FmWinLoseMessage from '../fmwinnlosemessage/fmwinlosemessage';
import { FmTimer } from '../fmtimer/fmtimer';
import { FmModal } from '../fmmodal/fmmodal';


interface FmFieldProps {
    matchId: string;
}







export default function FmField(fieldProps : FmFieldProps)
{

    const cols = 7; 
    const rows = 6;

    const sessionData = useSelector((state: any) => state.session);

    const [loading, setLoading] = useState<boolean>(true);
    
    // 0 = empty / -1 = red / 1 = yellow -> init fill with 0
    const [fieldState, setFieldState] = useState(new Array(cols).fill(new Array(rows).fill(0)));
    const [moveCounter, setMoveCounter] = useState<number>(0);
    const [firstMove, setFirstMove] = useState<boolean>(true);

    const [timerTime, setTimerTime] = useState<Date>(new Date());

    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [matchData, setMatchData] = useState<any>(null);
    
    const [currentPlayer, setCurrentPlayer] = useState<any>(null);
    const [currentPlayerAvatar, setCurrentPlayerAvatar] = useState<string>('');
    const [opponentPlayerAvatar, setOpponentPlayerAvatar] = useState<string>('');
    const [opponentPlayer, setOpponentPlayer] = useState<any>(null);


    const [playerTurn, setPlayerTurn] = useState<number>(0);
    const [winner, setWinner] = useState<number>(0);
    const [winNotification, setWinNotification] = useState<boolean>(false);

    const [helpModal, setHelpModal] = useState<boolean>(false);
    const [exitModal, setExitModal] = useState<boolean>(false);


    const currentPlayerColor = matchData?.playerRed.id === currentPlayer?.id ? -1 : 1;
    const opponentPlayerColor = matchData?.playerRed.id === opponentPlayer?.id ? -1 : 1;


    async function sendMove(move: number)
    {
        var matchId = fieldProps.matchId;
        var opponentPlayerBot = opponentPlayer.isBot;
        await connection?.invoke("MakeMove", move, matchId, opponentPlayerBot, matchData.botLevel).catch((err) => console.log(err));
    }

    async function sendFirstMove()
    {
        var matchId = fieldProps.matchId;
        if(playerTurn == opponentPlayerColor && opponentPlayer.isBot && moveCounter == 0 && firstMove)
        {
            console.log('first move');
            await connection?.invoke("FirstBotMove",matchId).catch((err) => console.log(err));
            
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
                setTimerTime(new Date(matchData.finishedAt));
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
                setMoveCounter(gameBoard.Moves);
                setFieldState(gameBoard.Board);
                if(gameBoard.Winner != 0)
                {
                    setWinner(gameBoard.Winner);
                    setTimeout(() => {}, 2000); 
                    setWinNotification(true);
                }

                
                
            });

            

            connect.invoke("JoinMatch", fieldProps.matchId).catch((err) => console.log(err));
            connect.invoke("GetGameBoard", fieldProps.matchId).catch((err) => console.log(err));

        }).catch((err) => console.log(err));

        console.log(matchData);

        setLoading(false);

        return () => {
            if (connection) {
                connection.off('ReceiveMatch');
                connection.off('ReceivePlayers');
                connection.stop();
            }
        }

        
    }, []);

   

    if(!loading && opponentPlayer != undefined)
    {
        sendFirstMove().finally(() => {setFirstMove(false);});
    }
    

    return(
        <>
        <FmCard className='fm-field-card'>
            <Flex vertical>
                <Flex justify='space-evenly' className='fm-field-header'>
                    <FmButton className='fm-field-button' text={'Help'} onClick={() => setHelpModal(true)}></FmButton>
                    <Flex vertical justify='center' align='center' className='fm-field-header-status'>
                        <FmTimer targetTime={timerTime}></FmTimer>
                    </Flex>
                    <FmButton className='fm-field-button' text={'Leave Game'} onClick={() => setExitModal(true)} color='danger'></FmButton>
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
        <FmModal visible={helpModal} onOk={()=>{setHelpModal(false)}} onCancel={()=>{setHelpModal(false)}}>
            <h3>Connect 4 Rules</h3>
            <br/><br/>
            <p>
                <b>Objective:</b> Be the first to connect four of your colored discs in a row, either vertically, horizontally, or diagonally.
            </p>
            <br/>
            <p>
                <b>Setup:</b> The game is played on a 7-column by 6-row grid.
            </p>
            <br/>
            <p>
                <b>Play:</b> Players take turns dropping one colored disc from the top into a column. The disc falls down the column until it reaches the bottom of the column or another disc.
            </p>
            <br/>
            <p>
                <b>Winning:</b> The first player to connect four of their discs in a row wins.
            </p>
            <br/>
            <p>
                <b>Draw:</b> If the board is full and no player has connected four discs in a row, the game is a draw.
            </p>
            <br/>
        </FmModal>
        <FmModal visible={exitModal} onOk={()=>{setExitModal(false)}} textOk='Stay' textCancel='Leave' onCancel={()=>{setExitModal(false)}}>
            <h3>Are you sure you want to leave the game?</h3>
        </FmModal>
        {winNotification && <FmWinLoseMessage winner={winner == currentPlayerColor ? 1 : 0}></FmWinLoseMessage>}
        
        </>
    )
}
