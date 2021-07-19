import { useHistory, useParams } from 'react-router-dom';
import logoImg from '../_assets/images/logo.svg';
import { Button } from '../_common/Button/Button';
import { Question } from '../_common/Question/Question';
import { RoomCode } from '../_common/RoomCode/Roomcode';
// import { useAuth } from '../_hooks/useAuth';
import { useRoom } from '../_hooks/useRoom';
import deleteImg from '../_assets/images/delete.svg'

import '../_styles/room.scss';
import { database } from '../_services/firebase';

type RoomParams = {
    id: string,
}

export function AdminRoom() {
    const room = useParams<RoomParams>();
    // const { user } = useAuth();  
    const { questions, title } = useRoom(room.id);
    const history = useHistory()

    async function handleDeleteQuestion(questionId: string) {
        if(window.confirm("Tem certeza que deseja excluir essa pergunta?")) {
            const questionRef = await database.ref(`/rooms/${room.id}/questions/${questionId}`).remove();
        }
    };

    async function handleEndRoom() {
        await database.ref(`rooms/${room.id}`).update({
            endedAt : new Date(),
        });

        history.push('/');
    }

    return (
       <div id="page-room">
           <header>
               <div className="content">
                   <img src={logoImg} alt="Let me ask" />
                   <div>
                    <RoomCode code={room.id} />
                    <Button isOutlined onClick={handleEndRoom} >Encerrar Sala</Button>
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
                         author={question.author}>
                             <button 
                             type="button"
                             onClick={() => handleDeleteQuestion(question.id)}>
                                 <img src={deleteImg} alt="Remover pergunta" />
                             </button>
                        </Question> 
                    )}
               </div>
           </main>
       </div>       
    );
}


