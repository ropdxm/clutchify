// ChatApp.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './chat.css';
import { FaPaperPlane } from 'react-icons/fa'; // Import the paper plane icon from React Icons
import { Navbar } from '@routes/LandingPage/Navbar/Navbar';
import { AiOutlineUser } from 'react-icons/ai'; // Import the user icon from React Icons

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const welcomeMessage =
  "Welcome to the Psychological Support Chat. Feel free to share your thoughts and feelings, and the AI will provide helpful responses.";

const preReadyQuestions = [
  "I'm feeling sad.",
  "I'm feeling anxious.",
  "I'm feeling stressed.",
  "I'm feeling overwhelmed.",
  "I'm feeling lonely.",
];
  
const serverBaseUrl = 'http://localhost:5000/api/chat'; // Update with your server URL

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = async () => {
    if (userInput.trim() === '') return;

    try {
      setLoading(true);

      const newUserMessage: Message = { role: 'user', content: userInput };
      const newConversation = [...messages, newUserMessage];

      const payload = {
        model: 'gpt-3.5-turbo',
        messages: newConversation,
        temperature: 0.7,
      };

      const response = await axios.post(serverBaseUrl, { payload });

      const chatGptResponse = response.data.message;

      const newAssistantMessage: Message = {
        role: 'assistant',
        content: chatGptResponse,
      };

      setMessages([...newConversation, newAssistantMessage]);
      setLoading(false);
      setUserInput('');
    } catch (error) {
      setLoading(false);
      console.error('Error fetching response from server:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Oops, something went wrong!',
      };
      setMessages([...messages, errorMessage]);
    }
  };

  const handleSelectQuestion = (question: string) => {
    setUserInput(question); // Set the selected question as the user input
  };

  return (
    <>
      <Navbar />
      <div className="chat-container">

      <div className="chat-header">
          <div className="header-text">
            <span className="header-name">Clutchify</span>
            <span className="header-subtitle">Psychological Support Chat</span>
          </div>
          <AiOutlineUser className="header-icon" />
        </div>


        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              {message.content}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            disabled={loading} // Disable input field while loading
          />
          <button onClick={handleSendMessage} disabled={loading}>
            {loading ? (
              <span className="loading">Sending...</span>
            ) : (
              <span className="send-icon">
                <FaPaperPlane />
              </span>
            )}
          </button>
        </div>
        <div className="pre-ready-questions">
          {preReadyQuestions.map((question, index) => (
            <div key={index} className="question-box" onClick={() => handleSelectQuestion(question)}>
              {question}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatApp;
