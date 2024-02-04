import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Login,
  Signup,
  Welcome,
  Home,
  PassForgot,
  ValidRecoveryCode,
  NewPass,
  Profile,
  Info,
  Visa,
  Finances,
  Utilities,
  Asurance,
  Contracts,
  NewComent,
  CollegesDestiny,
  Comments,
  NewDestiny,
  NewCollege,
  ReportComments,
} from "./src/screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./src/hooks/auth";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="PassForgot"
              component={PassForgot}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ValidRecoveryCode"
              component={ValidRecoveryCode}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="NewPass"
              component={NewPass}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Info"
              component={Info}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="CollegesDestiny"
              component={CollegesDestiny}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Visa"
              component={Visa}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Finances"
              component={Finances}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Utilities"
              component={Utilities}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Asurance"
              component={Asurance}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Contracts"
              component={Contracts}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="NewComent"
              component={NewComent}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Comments"
              component={Comments}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="NewDestiny"
              component={NewDestiny}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="NewCollege"
              component={NewCollege}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ReportComments"
              component={ReportComments}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
