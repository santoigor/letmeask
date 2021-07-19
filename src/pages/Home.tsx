import React from 'react';
import { useHistory } from 'react-router-dom';

import illustrationImg from '../_assets/images/illustration.svg';
import googleIconImg from '../_assets/images/google-icon.svg';
import logoImg from '../_assets/images/logo.svg';

import { Button } from '../_common/Button/Button';
import { database } from '../_services/firebase';
import { useAuth } from '../_hooks/useAuth';

import '../_styles/auth.scss';


export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();

    const [ roomCode, setRoomCode ] = React.useState('');

    function handleCreateRoom () {
        if(!user) {
            signInWithGoogle();
        }
        history.push('/rooms/new')
    }

    async function handleJoinRoom(event: React.FormEvent) {
        event.preventDefault();

        if(roomCode.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()) {
            alert('Room does not exists!');
            return;
        }

        if(roomRef.val().endedAt){
            alert('Room already closed');
        }

        history.push(`/rooms/${roomCode}`)
    }
    return(
        <div id='page-auth'>
            <aside>
                <img src={illustrationImg} alt="troca de perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="let me ask" />
                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={googleIconImg} alt="logo do google" />
                        Crie sua sala com o Google
                    </button>

                    <div className="separator">ou entre em uma sala</div>

                    <form onSubmit={handleJoinRoom}>
                        <input 
                        type="text"
                        value={roomCode}
                        onChange={({target}) => setRoomCode(target.value)}
                        placeholder="Digite o código da sala" />

                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    );
}