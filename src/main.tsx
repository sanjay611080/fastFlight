import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Chatbot from './components/chatbot/Chatbot.tsx'

createRoot(document.getElementById('root')!).render(
  <>  
  <App />
  <Chatbot/>
  </>
)
