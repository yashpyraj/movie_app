
import Container from './utils/container'
import MainPage from './components/MainPage';
import SearchMovies from './components/SearchMovies';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Container >
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={MainPage} options={{
          headerShown: false
        }} />
        <Stack.Screen
          name="Search"
          component={SearchMovies}
          options={{
            headerTitle: 'Search Movies',
            headerTintColor: '#c2f63f',
            headerStyle: {
              backgroundColor: 'black',

            },
          }}
        />
      </Stack.Navigator>
    </Container>

  );
}


