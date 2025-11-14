import React, { useEffect, useRef, useState } from 'react';
import { X, Mic, MicOff, Video, VideoOff, MessageSquare, Send } from 'lucide-react';
import * as ZegoExpressEngine from 'zego-express-engine-webrtc';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const VideoCall = ({ appointment, onClose }) => {
  const { token, backendUrl, userData } = React.useContext(AppContext);
  const [zg, setZg] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [hasPermissions, setHasPermissions] = useState(false);
  const [isRequestingPermissions, setIsRequestingPermissions] = useState(true);
  const [showEndCallConfirm, setShowEndCallConfirm] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const roomIDRef = useRef(null);
  const localStreamRef = useRef(null);

  // Request camera and microphone permissions first
  useEffect(() => {
    const requestPermissions = async () => {
      try {
        setIsRequestingPermissions(true);
        toast.info('Requesting camera and microphone access...');
        
        // Request camera and microphone permissions
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });

        // Store the stream
        localStreamRef.current = stream;

        // Check current state of tracks
        const videoTrack = stream.getVideoTracks()[0];
        const audioTrack = stream.getAudioTracks()[0];

        setIsVideoOn(videoTrack?.enabled || false);
        setIsAudioOn(audioTrack?.enabled || false);
        setHasPermissions(true);
        setIsRequestingPermissions(false);

        // Show video in local preview
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          localVideoRef.current.play().catch(err => {
            console.error('Error playing local video:', err);
          });
        }

        toast.success('Camera and microphone access granted');

      } catch (error) {
        console.error('Permission error:', error);
        setIsRequestingPermissions(false);
        
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
          toast.error('Camera and microphone permissions are required for video calls');
        } else if (error.name === 'NotFoundError') {
          toast.error('No camera or microphone found');
        } else {
          toast.error('Failed to access camera and microphone: ' + error.message);
        }
      }
    };

    requestPermissions();
  }, []);

  // Initialize ZegoCloud after permissions are granted
  useEffect(() => {
    if (!hasPermissions || !appointment || !userData) return;

    const initZego = async () => {
      try {
        // Get token from backend
        const roomID = `appointment_${appointment._id}`;
        roomIDRef.current = roomID;
        
        const { data } = await axios.post(
          backendUrl + '/api/user/zego-token',
          { 
            roomID 
          },
          { headers: { token } }
        );

        if (!data.success) {
          toast.error(data.message || 'Failed to initialize video call');
          return;
        }

        const appID = data.appID || parseInt(import.meta.env.VITE_ZEGOCLOUD_APP_ID || '0');
        
        if (!appID) {
          toast.error('ZegoCloud App ID not configured');
          return;
        }
        
        // Create ZegoExpressEngine instance
        // Handle different export patterns
        let ZegoEngineClass;
        if (typeof ZegoExpressEngine === 'function') {
          ZegoEngineClass = ZegoExpressEngine;
        } else if (ZegoExpressEngine.default) {
          ZegoEngineClass = ZegoExpressEngine.default;
        } else if (ZegoExpressEngine.ZegoExpressEngine) {
          ZegoEngineClass = ZegoExpressEngine.ZegoExpressEngine;
        } else {
          // Try dynamic import as fallback
          const zegoModule = await import('zego-express-engine-webrtc');
          ZegoEngineClass = zegoModule.default || zegoModule.ZegoExpressEngine || zegoModule;
        }

        if (typeof ZegoEngineClass !== 'function') {
          throw new Error('ZegoExpressEngine is not a constructor. Please use ZegoCloud UIKits instead.');
        }

        const zegoEngine = new ZegoEngineClass(appID, data.token);
        setZg(zegoEngine);

        // Set event handlers
        zegoEngine.on('roomStreamUpdate', (roomID, updateType, streamList) => {
          if (updateType === 'ADD') {
            streamList.forEach(stream => {
              if (stream.streamID !== zegoEngine.getLocalStreamID()) {
                zegoEngine.startPlayingStream(stream.streamID, {
                  video: true,
                  audio: true
                }).then(media => {
                  if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = media;
                  }
                });
              }
            });
          }
        });

        // Login to room
        const userID = String(userData?._id || 'user_' + Date.now());
        const userName = userData?.name || 'User';
        
        await zegoEngine.loginRoom(roomID, { userID, userName }, { userUpdate: true });

        // Use the stream we already got from permissions
        const streamID = `stream_${userID}_${Date.now()}`;
        const media = localStreamRef.current;

        if (media) {
          await zegoEngine.startPublishingStream(streamID, media);
          setIsConnected(true);
          toast.success('Connected to video call');
        }

      } catch (error) {
        console.error('ZegoCloud initialization error:', error);
        toast.error('Failed to start video call: ' + (error.message || 'Unknown error'));
      }
    };

    if (appointment && userData) {
      initZego();
    }

    // Cleanup on unmount
    return () => {
      if (zg) {
        zg.logoutRoom(roomIDRef.current);
        zg.destroyEngine();
      }
      // Stop local stream tracks
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [hasPermissions, appointment, userData, token, backendUrl]);

  // Toggle video
  const toggleVideo = () => {
    if (localStreamRef.current) {
      const tracks = localStreamRef.current.getVideoTracks();
      const newState = !isVideoOn;
      tracks.forEach(track => {
        track.enabled = newState;
      });
      setIsVideoOn(newState);
      toast.info(newState ? 'Video turned on' : 'Video turned off');
    }
  };

  // Toggle audio
  const toggleAudio = () => {
    if (localStreamRef.current) {
      const tracks = localStreamRef.current.getAudioTracks();
      const newState = !isAudioOn;
      tracks.forEach(track => {
        track.enabled = newState;
      });
      setIsAudioOn(newState);
      toast.info(newState ? 'Microphone unmuted' : 'Microphone muted');
    }
  };

  // Send message
  const sendMessage = () => {
    if (messageText.trim() && zg) {
      const newMessage = {
        id: Date.now(),
        text: messageText,
        sender: userData?.name || 'You',
        time: new Date().toLocaleTimeString()
      };
      setMessages([...messages, newMessage]);
      setMessageText('');
      
      // In a real implementation, you would send this via ZegoCloud's messaging
      // For now, we'll just add it locally
    }
  };

  // Show confirmation dialog
  const showEndCallConfirmation = () => {
    setShowEndCallConfirm(true);
  };

  // Actually end the call
  const confirmEndCall = () => {
    // Stop all tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    // Leave room and destroy engine
    if (zg) {
      zg.logoutRoom(roomIDRef.current);
      zg.destroyEngine();
    }
    setShowEndCallConfirm(false);
    onClose();
  };

  // Cancel ending call
  const cancelEndCall = () => {
    setShowEndCallConfirm(false);
  };

  return (
    <>
      {/* End Call Confirmation Dialog */}
      {showEndCallConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-[60] flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Are You Sure You Want to End This Call?
              </h3>
              <p className="text-gray-600 mb-6">
                The video call will be disconnected and all audio/video will be closed.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={cancelEndCall}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmEndCall}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Video Call - {appointment?.docData?.name}</h2>
          <p className="text-sm text-gray-400">
            {isConnected ? 'Connected' : 'Connecting...'}
          </p>
        </div>
        <button onClick={showEndCallConfirmation} className="p-2 hover:bg-gray-700 rounded">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Video Area */}
      <div className="flex-1 relative flex">
        {/* Remote Video (Doctor) */}
        <div className="flex-1 bg-gray-800 relative">
          {isRequestingPermissions ? (
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p>Requesting camera and microphone access...</p>
              </div>
            </div>
          ) : (
            <>
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              {!remoteVideoRef.current?.srcObject && (
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p>Waiting for doctor to join...</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Local Video (User) */}
        <div className="absolute bottom-4 right-4 w-64 h-48 bg-gray-900 rounded-lg overflow-hidden border-2 border-white">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          {!isVideoOn && (
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-white">
              <VideoOff className="w-12 h-12" />
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-900 p-4 flex justify-center gap-4">
        <button
          onClick={toggleAudio}
          disabled={!hasPermissions || isRequestingPermissions}
          className={`p-3 rounded-full transition-all ${
            isAudioOn 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-red-600 hover:bg-red-700'
          } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
          title={isAudioOn ? 'Microphone is on - Click to mute' : 'Microphone is muted - Click to unmute'}
        >
          {isAudioOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
        </button>
        <button
          onClick={toggleVideo}
          disabled={!hasPermissions || isRequestingPermissions}
          className={`p-3 rounded-full transition-all ${
            isVideoOn 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-red-600 hover:bg-red-700'
          } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
          title={isVideoOn ? 'Camera is on - Click to turn off' : 'Camera is off - Click to turn on'}
        >
          {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
        </button>
        <button
          onClick={showEndCallConfirmation}
          className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all"
          title="End call"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Messages Panel */}
      <div className="bg-gray-800 border-t border-gray-700 h-64 flex flex-col">
        <div className="p-2 border-b border-gray-700 flex items-center gap-2 text-white">
          <MessageSquare className="w-5 h-5" />
          <span className="font-semibold">Messages</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.length === 0 ? (
            <p className="text-gray-400 text-center text-sm">No messages yet</p>
          ) : (
            messages.map(msg => (
              <div key={msg.id} className="bg-gray-700 rounded-lg p-2 text-white text-sm">
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">{msg.sender}</span>
                  <span className="text-gray-400 text-xs">{msg.time}</span>
                </div>
                <p>{msg.text}</p>
              </div>
            ))
          )}
        </div>
        <div className="p-2 border-t border-gray-700 flex gap-2">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default VideoCall;

