import { useHistory } from 'react-router-dom';
import { firebase, auth } from '../services/firebase';
import illustrationImg from "../assets/illustration.svg";
import letMeAskLogo from "../assets/logo.svg";
import googleLogo from "../assets/google-icon.svg";
import "../styles/pages/auth.scss";
import { Button } from "../components/Button";

export function Home() {
  const history = useHistory();

  function createRoomWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(result => {
      console.log(result);
    });
    history.push("/rooms/new");
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração com pop ups de mensagens." />
        <strong>Toda pergunta tem <br/> uma resposta.</strong>
        <p>Aprenda e compartilhe conhecimento <br/> com outras pessoas</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={letMeAskLogo} alt="Logotipo do LetMeAsk" />

          <button onClick={createRoomWithGoogle} className="google-auth">
            <img src={googleLogo} alt="Logotipo do Google" />
            Crie sua sala com o Google
          </button>

          <p className="divider">ou entre em uma sala</p>

          <form action="post">
            <input type="text" placeholder="Digite o código da sala"/>
            <Button>
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}