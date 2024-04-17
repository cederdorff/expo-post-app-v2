import * as Location from "expo-location";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import MapMarker from "../../components/MapMarker";

export default function Map() {
  const [posts, setPosts] = useState([]);
  const [location, setLocation] = useState({});
  const { EXPO_PUBLIC_API_URL } = process.env;

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    async function requestLocationPersmissions() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync();
      setLocation(currentLocation.coords);
      console.log(location);
    }
    requestLocationPersmissions();
  }, []);

  // Sometimes we want to run side-effects when a screen is focused.
  // https://reactnavigation.org/docs/use-focus-effect/
  useFocusEffect(
    // If you don't wrap your effect in React.useCallback, the effect will run every render if the screen is focused.
    useCallback(() => {
      getPosts();
    }, [])
  );

  async function getPosts() {
    const response = await fetch(`${EXPO_PUBLIC_API_URL}/posts.json`);
    const dataObj = await response.json();
    const postsArray = Object.keys(dataObj).map(key => ({
      id: key,
      ...dataObj[key]
    })); // from object to array
    postsArray.sort((postA, postB) => postB.createdAt - postA.createdAt); // sort by timestamp/ createdBy
    setPosts(postsArray);
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {posts.map(post => (
          <MapMarker post={post} key={post.id} />
        ))}
      </MapView>
    </View>
  );
}

// styling

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: "100%",
    height: "100%"
  }
});
