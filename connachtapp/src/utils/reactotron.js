import Reactotron, {
  trackGlobalErrors,
  openInEditor,
  overlay,
  networking,
} from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

Reactotron.configure({enabled: true, port: 9090, host: '192.168.0.16'})
  .use(trackGlobalErrors())
  .use(openInEditor())
  .use(overlay())
  .use(AsyncStorage())
  .use(networking())
  .connect();
