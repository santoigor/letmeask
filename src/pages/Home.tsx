import illustrationImg from '../_assets/images/illustration.svg';
import logoImg from '../_assets/images/logo.svg';
import googleIconImg from '../_assets/images/google-icon.svg';

export function Home() {
    return(
        <div>
            <aside>
                <img src={illustrationImg} alt="troca de perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <img src={logoImg} alt="let me ask" />
                <button>
                    <img src={googleIconImg} alt="logo do google" />
                    Crie sua sala com o Google
                </button>

                <div>ou entre em uma sala</div>

                <form>
                    <input 
                     type="text"
                     placeholder="Digite o código da sala" />

                     <button type="submit">Entrar na sala</button>
                </form>
            </main>
        </div>
    );
}