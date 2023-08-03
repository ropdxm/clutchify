// ChatApp.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './chat.css';
import { FaPaperPlane } from 'react-icons/fa'; // Import the paper plane icon from React Icons
import { Navbar } from '@routes/LandingPage/Navbar/Navbar';

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


  const openaiApiKey = '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';

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${openaiApiKey}`,
  };

  const handleSendMessage = async () => {
    if (userInput.trim() === '') return;

    try {
      setLoading(true); // Set loading to true during API request

      const newUserMessage: Message = { role: 'user', content: userInput };
      setMessages([...messages, newUserMessage]);

      const payload = {
        model: 'gpt-3.5-turbo',
        messages: [...messages, newUserMessage],
        temperature: 0.7,
      };

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        payload,
        { headers }
      );

      const chatGptResponse = response.data.choices[0].message.content;

      let assistantMessage = chatGptResponse;
      if (userInput.toLowerCase().includes('sad')) {
        assistantMessage =
          "I'm sorry to hear that you're feeling sad. Remember, it's okay to reach out for support and talk about your feelings.";
      } else if (
        userInput.toLowerCase().includes('anxious') ||
        userInput.toLowerCase().includes('nervous')
      ) {
        assistantMessage =
          "Feeling anxious or nervous is normal, especially during challenging times. Take deep breaths and try to focus on positive thoughts.";
      } else if (
        userInput.toLowerCase().includes('stress') ||
        userInput.toLowerCase().includes('overwhelmed')
      ) {
        assistantMessage =
          "It sounds like you're feeling stressed or overwhelmed. Consider taking short breaks and engaging in activities you enjoy.";
      } else if (userInput.toLowerCase().includes('lonely')) {
        assistantMessage =
          "Feeling lonely can be tough, but remember that there are people who care about you. Reach out to friends, family, or someone you trust.";
      } else if (userInput.toLowerCase().includes('thank you')) {
        assistantMessage =
          "You're welcome! Remember, I'm here to support you whenever you need someone to talk to.";
      }

      const newAssistantMessage: Message = {
        role: 'assistant',
        content: assistantMessage,
      };
      setMessages([...messages, newAssistantMessage]);

      setLoading(false); // Set loading to false after receiving response

      setUserInput(''); // Clear input field after sending message
    } catch (error) {
      setLoading(false); // Set loading to false on error

      console.error('Error fetching response from GPT-3.5:', error);
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