import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import googleLogo from "../assets/google-icon.svg";
import illustrationImg from "../assets/illustration.svg";
import letMeAskLogo from "../assets/logo.svg";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { database } from '../services/firebase';
import "../styles/pages/auth.scss";

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomName, setRoomName] = useState('');

  async function createRoomWithGoogle() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/rooms/new");
  }

  async function joinRoom(event: FormEvent) {
    event.preventDefault();

    if (!roomName.trim()) {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomName}`).get();

    if (!roomRef.exists()) {
      alert('Sala nao existe');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('Room closed');
      return;
    }

    history.push(`/rooms/${roomRef.key}`);
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

          <form action="post" onSubmit={joinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomName(event.target.value)}
              value={roomName}
            />
            <Button>
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}