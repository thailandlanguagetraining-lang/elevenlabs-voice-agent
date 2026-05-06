import React, { useCallback } from 'react';
import { useConversation, ConversationProvider } from '@elevenlabs/react';

const AGENT_ID = 'agent_5701kqrx6wrzeacvwwjkmsxp78rx';

function ConversationComponent() {
  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onError: (error) => console.error('SDK Error:', error),
  });

  const startCall = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      // ✅ agentId passed here — this is the key fix
      await conversation.startSession({ agentId: AGENT_ID });
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
  return (
    <ConversationProvider>
      <ConversationComponent />
    </ConversationProvider>
  );
}

export default App;
