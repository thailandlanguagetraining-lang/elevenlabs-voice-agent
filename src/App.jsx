import React, { useCallback, useRef } from 'react';
import { ConversationProvider, useConversationControls, useConversationStatus, useConversationMode } from '@elevenlabs/react';

const AGENT_ID = 'agent_5701kqrx6wrzeacvwwjkmsxp78rx';

function ConversationComponent() {
  const { startSession, endSession } = useConversationControls();
  const { status } = useConversationStatus();
  const { mode } = useConversationMode();
  const isStarting = useRef(false); // ✅ Guard against duplicate sessions

  const startCall = useCallback(async () => {
    if (isStarting.current || status === 'connected') return; // ✅ Block if already starting or connected
    isStarting.current = true;

    try {
      await startSession({
        onConnect: ({ conversationId }) => console.log('Connected:', conversationId),
        onError: (message) => console.error('Error:', message),
      });
    } catch (error) {
      if (error.name === 'NotAllowedError') {
        alert('Please allow microphone access and try again.');
      } else {
        console.error('Failed to start:', error);
      }
    } finally {
      isStarting.current = false; // ✅ Always reset the guard
    }
  }, [startSession, status]);

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
          disabled={status === 'connected' || status === 'connecting'}
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
