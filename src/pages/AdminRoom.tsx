import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logoImg from '../_assets/images/logo.svg';
import { Button } from '../_common/Button/Button';
import { Question } from '../_common/Question/Question';
import { RoomCode } from '../_common/RoomCode/Roomcode';
import { useAuth } from '../_hooks/useAuth';
import { useRoom } from '../_hooks/useRoom';
import { database } from '../_services/firebase';

import '../_styles/room.scss';

type RoomParams = {
    id: string,
}

export function AdminRoom() {
    const room = useParams<RoomParams>();
    const { user } = useAuth();  
    const [ newQuestion, setNewQuestion ] = useState('');
    const { questions, title } = useRoom(room.id);
    
    async function sendNewQuestion(event: FormEvent){
        event.preventDefault();

        if(newQuestion.trim() === ''){
            return;
        }

        if(!user) {
            throw new Error('You must be logged in');
        }

        const question = {
            content: newQuestion,
            author: { 
                name: user.name,
                avatar: user.avatar
            },
            isHighlighted: false,
            isAnswered: false
        }

        await database.ref(`rooms/${room.id}/questions`).push(question);
        setNewQuestion('');
    };

    return (
       <div id="page-room">
           <header>
               <div className="content">
                   <img src={logoImg} alt="Let me ask" />
                   <div>
                    <RoomCode code={room.id} />
                    <Button isOutlined >Encerrar Sala</Button>
                   </div>
               </div>
           </header>

           <main>
               <div className="room-title">
                   <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
               </div>

               <div className="questions">
                    { questions.map( question => 
                        <Question 
                         key={question.id}
                         content={question.content} 
                         author={question.author} /> 
                    )}
               </div>
           </main>
       </div>       
    );
}