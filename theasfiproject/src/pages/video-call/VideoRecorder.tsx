import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import { VideoRecorder as RNVideoRecorder } from 'react-native-video-recorder';

const VideoRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [videoPath, setVideoPath] = useState(null);

  useEffect(() => {
    if (isRecording) {
      RNVideoRecorder.startRecording();
    } else {
      RNVideoRecorder.stopRecording(); 
    }
  }, [isRecording]);

  const handleStartRecording = () => {
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const handleSaveVideo = () => {
    RNVideoRecorder.saveVideo(videoPath).then(() => {
      // Video saved successfully
    }).catch((error) => {
      // Error while saving video
    });
  };

  return (
    <View>
      <Button
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
        onPress={handleStartRecording}
      />
      <Button
        title="Save Video"
        onPress={handleSaveVideo}
      />
    </View>
  );
};

export default VideoRecorder;