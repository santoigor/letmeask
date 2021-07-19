import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logoImg from '../_assets/images/logo.svg';
import { Button } from '../_common/Button/Button';
import { Question } from '../_common/Question/Question';
import { RoomCode } from '../_common/RoomCode/Roomcode';
import { useAuth } from '../_hooks/useAuth';
import { database } from '../_services/firebase';

import '../_styles/room.scss';

type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string
    },
    content: string,
    isHighlighted: boolean,
    isAnswered: boolean,
}>

type QuestionType = {
    id: string,
    author: {
        name: string,
        avatar: string
    },
    content: string,
    isHighlighted: boolean,
    isAnswered: boolean,
}

type RoomParams = {
    id: string,
}
export function Room() {
    const room = useParams<RoomParams>();
    const { user } = useAuth();
    const [ questions, setQuestions ] = useState<QuestionType[]>([]);
    const [ newQuestion, setNewQuestion ] = useState('');
    const [ title, setTitle ] = useState('');

    useEffect(() => {
        const roomRef = database.ref(`rooms/${room.id}`);
        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions : FirebaseQuestions = databaseRoom.questions ?? {};
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
               return { 
                id: key,
                content: value.content,
                author: value.author,
                isHighlighted: value.isHighlighted,
                isAnswered: value.isAnswered
                }
            });

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        });

    }, [room.id]);

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
                   <RoomCode code={room.id} />
               </div>
           </header>

           <main>
               <div className="room-title">
                   <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
               </div>

               <form onSubmit={sendNewQuestion}>
                   <textarea 
                   value={newQuestion}
                   placeholder="O que você quer perguntar?" 
                   onChange={ ({target}) => setNewQuestion(target.value)} />

                   <div className="form-footer">
                       { 
                        user ? 
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div> : 
                            <span>Para enviar uma pergunta, <button>faça seu login</button></span>
                       }

                       <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
               </form>

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