import React, { useCallback } from 'react';
import { ConversationProvider, useConversationControls, useConversationStatus, useConversationMode } from '@elevenlabs/react';

const AGENT_ID = 'agent_5701kqrx6wrzeacvwwjkmsxp78rx';

function ConversationComponent() {
  const { startSession, endSession } = useConversationControls();
  const { status } = useConversationStatus();
  const { mode } = useConversationMode();

  const startCall = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await startSession({
        onConnect: ({ conversationId }) => console.log('Connected:', conversationId),
        onError: (message) => console.error('Error:', message),
      });
    } catch (error) {
      console.error('Failed to start conversation:', error);
    }
  }, [startSession]);

  const endCall = useCallback(async () => {
    await endSession();
  }, [endSession]);

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>My AI Agent</h1>
      <p>Status: <strong>{status}</strong></p>
      <p>Agent is {mode?.mode === 'speaking' ? 'speaking' : 'listening'}</p>

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={startCall}
          disabled={status === 'connected'}
          style={{ padding: '10px 20px', marginRight: '10px', cursor: 'pointer' }}
        >
          Start Call
        </button>

        <button
          onClick={endCall}
          disabled={status !== 'connected'}
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
    <ConversationProvider agentId={AGENT_ID}>
      <ConversationComponent />
    </ConversationProvider>
  );
}

export default App;
