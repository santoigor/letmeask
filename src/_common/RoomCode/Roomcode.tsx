import copyImg from '../../_assets/images/copy.svg';

import './roomCode.scss';

type RoomCodeProps = {
    code: string,
}

export function RoomCode(props: RoomCodeProps) {

    function copyRoomCodeToClipboard(){
        navigator.clipboard.writeText(props.code)
    }
    return (
        <button className="room-code" onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copiar código da sala" />
            </div>
            <span>Sala {props.code}</span>
        </button>
    );
}