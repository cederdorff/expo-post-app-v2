import * as ImagePicker from "expo-image-picker";
import { Stack, useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Toast from "react-native-root-toast";
import {
  borderRadius,
  labelFontSize,
  primary,
  secondary,
  tintColorLight
} from "../../constants/ThemeVariables";
import { auth } from "../../firebase-config";
import StyledButton from "@/components/StyledButton";

export default function Profile() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [mail, setMail] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  const { EXPO_PUBLIC_API_URL } = process.env;

  const url = `${EXPO_PUBLIC_API_URL}/users/${auth.currentUser?.uid}.json`;

  useEffect(() => {
    setMail(auth.currentUser.email);

    async function getUser() {
      const response = await fetch(url);
      const userData = await response.json();

      if (userData) {
        // if userData exists set states with values from userData (data from firestore)
        setName(userData?.name);
        setTitle(userData?.title);
        setImage(userData?.image);
      }
    }
    getUser();
  }, []);

  async function handleSignOut() {
    await signOut(auth);
    router.replace("/sign-in");
  }

  async function chooseImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      quality: 0.3
    });

    if (!result.canceled) {
      const base64 = "data:image/jpeg;base64," + result.assets[0].base64;
      setImage(base64);
    }
  }

  async function handleSaveUser() {
    const userToUpdate = { name: name, mail: mail, title, image }; // create an object to hold the user to update properties

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(userToUpdate)
    });
    if (response.ok) {
      const data = await response.json();
      console.log("User data: ", data);
      Toast.show("Your profile has been updated");
    } else {
      Toast.show("Sorry, something went wrong");
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button
              title="Sign Out"
              color={Platform.OS === "ios" ? tintColorLight : primary}
              onPress={handleSignOut}
            />
          )
        }}
      />
      <View>
        <TouchableOpacity onPress={chooseImage}>
          <Image
            style={styles.image}
            source={{
              uri:
                image ||
                "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
            }}
          />
        </TouchableOpacity>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Type your name"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTitle}
          value={title}
          placeholder="Type your title"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Mail</Text>
        <TextInput
          style={styles.input}
          onChangeText={setMail}
          value={mail}
          placeholder="Type your mail"
          autoCapitalize="none"
          editable={false}
        />
        <View style={styles.buttonContainer}>
          <StyledButton text="Save" style="primary" onPress={handleSaveUser} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: secondary
  },
  label: {
    fontSize: labelFontSize,
    color: primary,
    marginTop: 30,
    marginBottom: 5
  },
  input: {
    height: 50,
    padding: 10,
    backgroundColor: tintColorLight,
    borderRadius: borderRadius,
    borderColor: primary,
    borderWidth: 2
  },
  image: {
    aspectRatio: 1,
    borderRadius: borderRadius,
    borderWidth: 2,
    borderColor: primary
  },
  buttonContainer: {
    marginBottom: 50,
    marginTop: 20
  }
});
