import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import { Camera, CameraType, useCameraPermissions, CameraView } from "expo-camera";

const CameraScreen = () => {
    const [permission, setPermission] = useCameraPermissions();
    const [photouri, setPhotoUri] = React.useState(null);
    const [facing, setFacing] = React.useState<CameraType>('back');

    React.useEffect(() => {
        if (!permission) {
          setPermission();
        }
      }, [permission]);
    if (!permission) {
        return <Text>Awaiting Permission</Text>;
    }
    if (!permission.granted) {
        return <Text>No access to camera</Text>;
    }
    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }
    return (
        <View style={styles.container}>
          <CameraView style={styles.camera} facing={facing}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
    );
}
export default function TakePicture() {
    return CameraScreen();
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
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
});