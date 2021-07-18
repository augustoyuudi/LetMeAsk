import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import illustrationImg from "../assets/illustration.svg";
import letMeAskLogo from "../assets/logo.svg";
import { Button } from "../components/Button";
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import "../styles/pages/auth.scss";

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();

  const [roomName, setRoomName] = useState('');

  async function createRoom(event: FormEvent) {
    event.preventDefault();

    if (!roomName.trim()) {
      return;
    }

    const roomRef = database.ref('rooms');
    const room = await roomRef.push({
      title: roomName,
      authorId: user?.uid,
    });
    history.push(`/rooms/${room.key}`);
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

          <h1>{user?.displayName}</h1>
          <h2>Crie uma nova sala</h2>

          <form action="post" onSubmit={createRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setRoomName(event.target.value)}
              value={roomName}
            />
            <Button>
              Criar sala
            </Button>
          </form>

          <p>Quer entrar em uma sala já existente? <Link to="/">Clique aqui</Link></p>
        </div>
      </main>
    </div>
  )
}