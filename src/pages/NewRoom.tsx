import React from 'react';
import illustrationImg from '../_assets/images/illustration.svg';
import logoImg from '../_assets/images/logo.svg';

import { database } from '../_services/firebase';

import { Button } from '../_common/Button/Button';
import { Link, useHistory } from 'react-router-dom';

import '../_styles/auth.scss';
import { useAuth } from '../_hooks/useAuth';

export function NewRoom () {
    const { user } = useAuth();
    const [ newRoom, setNewRoom ] = React.useState(''); 
    const history = useHistory();

    async function handleCreateRoom(event: React.FormEvent) {
        event.preventDefault();

        if(newRoom.trim() === ''){
            return;
        }

        const roomRef = database.ref('rooms');
        const firebaseRoom = await roomRef.push({
            title: newRoom, 
            authorId: user?.id,
        });

        history.push(`/rooms/${firebaseRoom.key}`)
    };

    return (
        <div id='page-auth'>
        <aside>
            <img src={illustrationImg} alt="troca de perguntas e respostas" />
            <strong>Crie salas de Q&amp;A ao vivo</strong>
            <p>Tire as dúvidas da sua audiência em tempo real</p>
        </aside>
        <main>
            <div className="main-content">
                <img src={logoImg} alt="let me ask" />
                <h2>Criar uma nova sala</h2>
                <form onSubmit={handleCreateRoom}>
                    <input 
                    type="text"
                    placeholder="Nome da sala" 
                    value={newRoom} 
                    onChange={ ({target}) => setNewRoom(target.value)} />

                    <Button type="submit">Criar sala</Button>
                </form>
                <p>Quer entrar em uma sala já existente? <Link to="/">Clique aqui</Link></p>
            </div>
        </main>
    </div>
    );
}