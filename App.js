import { ImageBackground, StyleSheet, View } from 'react-native';
import Quiz from './src/components/Quiz';

export default function App() {
    return (
        <ImageBackground source={require('./assets/Background.jpg')} style={styles.image}>
            <View style={styles.container}>
                <Quiz />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});
