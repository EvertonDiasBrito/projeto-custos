import { useLocation } from 'react-router-dom'
import Message from './Message'

function Projetos() {
  const location = useLocation()
  let message = location.state?.message

  return (
    <div>
      <h1>Meus Projetos</h1>
      {message && <Message type="success" msg={message} />}
    </div>
  );
}

export default Projetos