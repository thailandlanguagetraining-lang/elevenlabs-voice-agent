const startCall = useCallback(async () => {
  try {
    // Request AND verify mic access before starting
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    // Confirm we actually got an audio track
    const tracks = stream.getAudioTracks();
    if (tracks.length === 0 || tracks[0].readyState !== 'live') {
      alert('Microphone not available. Please check your browser permissions.');
      return;
    }

    // Stop the test stream — SDK will create its own
    stream.getTracks().forEach(t => t.stop());

    await startSession({
      onConnect: ({ conversationId }) => console.log('Connected:', conversationId),
      onError: (message) => console.error('Error:', message),
    });
  } catch (error) {
    if (error.name === 'NotAllowedError') {
      alert('Microphone access was denied. Please allow microphone access and try again.');
    } else if (error.name === 'NotFoundError') {
      alert('No microphone found. Please connect a microphone and try again.');
    } else {
      console.error('Failed to start conversation:', error);
    }
  }
}, [startSession]);
