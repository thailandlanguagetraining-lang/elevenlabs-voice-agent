import React, { useCallback } from 'react';
import { useConversation, ConversationProvider } from '@elevenlabs/react';

function ConversationComponent() {
  const conversation = useConversation();

  const startCall = useCallback(async () => {
    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Microphone access granted");

      // Small delay to ensure hardware is ready
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Start the session (agentId is already provided in the ConversationProvider)
      await conversation.startSession();
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  }, [conversation]);

  const endCall = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>My AI Agent</h1>
      <p>Status: <strong>{conversation.status}</strong></p>
      <p>Agent is {conversation.isSpeaking ? 'speaking' : 'listening'}</p>
      
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={startCall} 
          disabled={conversation.status === 'connected'}
          style={{ padding: '10px 20px', marginRight: '10px', cursor: 'pointer' }}
        >
          Start Call
        </button>
        
        <button 
          onClick={endCall} 
          disabled={conversation.status !== 'connected'}
          style={{ padding: '10px 20px', cursor: 'pointer' }}
        >
          End Call
        </button>
      </div>
    </div>
  );
}

function App() {
  const AGENT_ID = 'agent_5701kqrx6wrzeacvwwjkmsxp78rx';

  return (
    <ConversationProvider 
      agentId={AGENT_ID}
      onError={(error) => console.error("SDK Error:", error)}
    >
      <ConversationComponent />
    </ConversationProvider>
  );
}

export default App;