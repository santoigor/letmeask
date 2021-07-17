import illustrationImg from '../_assets/images/illustration.svg';
import logoImg from '../_assets/images/logo.svg';

import '../_styles/auth.scss';

import { Button } from '../_common/Button/Button';

export function NewRoom () {
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
                <form>
                    <input 
                    type="text"
                    placeholder="Nome da sala" />

                    <Button type="submit">Criar sala</Button>
                </form>
                <p>Quer entrar em uma sala já existente? <a href="#">Clique aqui</a></p>
            </div>
        </main>
    </div>
    );
}