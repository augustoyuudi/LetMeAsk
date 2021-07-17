import { Link } from 'react-router-dom';
import illustrationImg from "../assets/illustration.svg";
import letMeAskLogo from "../assets/logo.svg";
import "../styles/pages/auth.scss";
import { Button } from "../components/Button";

export function NewRoom() {
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

          <h2>Crie uma nova sala</h2>

          <form action="post">
            <input type="text" placeholder="Nome da sala"/>
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