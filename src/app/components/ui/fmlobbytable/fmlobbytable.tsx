import exp from "constants";






interface FmLobbyTableProps {

    players: string[];
    currentPlayer: string;

}




export default function FmLobbyTable({players}: FmLobbyTableProps)
{
    return (
        <table className={'fm-lobby-table'}>
            <thead>
                <tr>
                    <th>Available Players</th>
                </tr>
            </thead>
            <tbody>
                {players.map((player, index) => {
                    return (
                        <tr key={index}>
                            <td>{player}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}