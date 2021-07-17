import illustrationImg from '../_assets/images/illustration.svg';
import googleIconImg from '../_assets/images/google-icon.svg';
import logoImg from '../_assets/images/logo.svg';

import '../_styles/auth.scss';

import { Button } from '../_common/Button/Button';

export function Home() {
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
                    <button className="create-room">
                        <img src={googleIconImg} alt="logo do google" />
                        Crie sua sala com o Google
                    </button>

                    <div className="separator">ou entre em uma sala</div>

                    <form>
                        <input 
                        type="text"
                        placeholder="Digite o código da sala" />

                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    );
}