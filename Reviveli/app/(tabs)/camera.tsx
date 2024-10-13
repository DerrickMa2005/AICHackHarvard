import { Text, View, StyleSheet, Pressable, Image} from 'react-native';
import React from 'react';
import { Camera, CameraType, useCameraPermissions, CameraView } from "expo-camera";
import axios from 'axios';

const CameraScreen = () => {
    const [permission, setPermission] = useCameraPermissions();
    const [photouri, setPhotoUri] = React.useState(null);
    const [facing, setFacing] = React.useState<CameraType>('back');
    const cameraRef = React.useRef<Camera>(null);
    const [photo, setPhoto] = React.useState<string | null>(null);
    const [isCameraReady, setIsCameraReady] = React.useState(false);
    const [output, setOutput] = React.useState(null);
    React.useEffect(() => {
        if (!permission) {
          console.log('Requesting camera permissions...');
          setPermission();
        } else {
          console.log('Camera permissions:', permission);
        }
      }, [permission]);
    if (!permission) {
        return <Text>Awaiting Permission</Text>;
    }
    if (!permission.granted) {
        return <Text>No access to camera</Text>;
    }
    // function toggleCameraFacing() {
    //     setFacing(current => (current === 'back' ? 'front' : 'back'));
    // }
    const takePicture = async () => {
      console.log('Attempting to take picture...'); // Debug log

      if (!cameraRef.current) {
        console.warn('Camera reference is null!');
        return;
      }
  
      if (!isCameraReady) {
        console.warn('Camera is not ready yet!');
        return;
      }
      try {
        const data = await cameraRef.current.takePictureAsync();
        setPhoto(data.base64);
        const response = await axios.post('http://localhost:5000/api/input', { photo });
        setOutput(response.data);
      } catch (error) {
        console.error('Failed to take picture:', error);
      }
    };
    return (
      <View style={styles.container}>
        {!photo ? (
          <CameraView 
          onCameraReady={() => {
            console.log('Camera is ready!');
            setIsCameraReady(true); // Set readiness state
          }}
          ref={(ref) => (cameraRef.current = ref)}
          onMountError={(error) => console.error('Camera mount error:', error)}>
            <View style={styles.buttonContainer}>
              {/* <Pressable style={styles.button} onPress={toggleCameraFacing}>
                <Text style={styles.text}>Flip Camera</Text>
              </Pressable> */}
              <Pressable style={styles.button} onPress={takePicture}>
                <Text style={styles.text}>Take Picture</Text>
              </Pressable>
            </View>
          </CameraView>
        ) : (
          <View style={styles.preview}>
            <Text style={styles.text}> {JSON.stringify(output)} </Text>
            <Pressable style={styles.button} onPress={() => setPhoto(null)}>
              <Text style={styles.text}>Retake Picture</Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  };  
export default function TakePicture() {
    return <CameraScreen />;
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    message: {
      textAlign: 'center',
      paddingBottom: 10,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
      backgroundColor: "#2E6F40"
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
    preview: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '80%',
      height: '80%',
      borderRadius: 10,
    },
});