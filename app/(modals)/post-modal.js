import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import {
  borderRadius,
  labelFontSize,
  primary,
  secondary,
  tintColorLight
} from "../../constants/ThemeVariables";
import { auth } from "../../firebase-config";

export default function PostModal() {
  const { id } = useLocalSearchParams();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState({});
  const router = useRouter();
  const { EXPO_PUBLIC_API_URL } = process.env;

  useEffect(() => {
    async function getPost() {
      const response = await fetch(`${EXPO_PUBLIC_API_URL}/posts/${id}.json`);
      const data = await response.json();
      setImage(data.image);
      setCaption(data.caption);
    }
    if (id) {
      getPost();
    }
  }, [id]);

  useEffect(() => {
    async function requestLocationPersmissions() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    }

    async function loadLocation() {
      await requestLocationPersmissions();
      setLocation(await getLocation());
    }

    loadLocation();
  }, []);

  function handleSave() {
    if (id) {
      updatePost();
    } else {
      createPost();
    }
  }

  async function updatePost() {
    const post = {
      caption: caption,
      image: image
    };
    const response = await fetch(`${EXPO_PUBLIC_API_URL}/posts/${id}.json`, {
      method: "PATCH",
      body: JSON.stringify(post)
    });
    if (response.ok) {
      router.back();
    }
  }

  async function getLocation() {
    const currentLocation = await Location.getCurrentPositionAsync();
    const API_KEY = "d56227e5719542ec8aabe5c0bd2d502d";
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${currentLocation.coords.latitude}+${currentLocation.coords.longitude}&key=${API_KEY}`
    );
    const data = await response.json();
    console.log(data);
    return {
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      city: data.results[0].components.city,
      country: data.results[0].components.country
    };
  }

  async function createPost() {
    const createdAt = new Date().getTime();
    const post = {
      caption: caption,
      image: image,
      createdAt: createdAt,
      location: location,
      uid: auth.currentUser.uid
    };

    console.log(post);
    const response = await fetch(`${API_URL}/posts.json`, {
      method: "POST",
      body: JSON.stringify(post)
    });
    if (response.ok) {
      router.back();
    }
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

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: id ? "Update Post" : "Create Post",
          headerLeft: () => (
            <Button
              title="Cancel"
              color={tintColorLight}
              onPress={() => router.back()}
            />
          ),
          headerRight: () => (
            <Button
              title={id ? "Update" : "Create"}
              color={tintColorLight}
              onPress={handleSave}
            />
          )
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <Text style={styles.label}>Image</Text>
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
        <Text style={styles.label}>Caption</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCaption}
          value={caption}
          placeholder="Type your caption"
        />
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          value={`${location.city}, ${location.country}`}
          editable={false}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: secondary
  },
  main: {
    flex: 1
  },
  image: {
    aspectRatio: 1,
    borderRadius: borderRadius,
    borderColor: primary,
    borderWidth: 2
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
  }
});
