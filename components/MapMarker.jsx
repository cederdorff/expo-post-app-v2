import { router } from "expo-router";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { Callout, Marker } from "react-native-maps";
import { WebView } from "react-native-webview";

export default function MapMarker({ post }) {
  function handleCalloutPress(id) {
    router.push(`map/${id}`);
  }

  const latitude = post?.location?.latitude;
  const longitude = post?.location?.longitude;

  if (!latitude || !longitude) {
    console.log("Marker has no location", post);
    return null;
  }

  return (
    <Marker coordinate={{ latitude, longitude }}>
      <Callout onPress={() => handleCalloutPress(post.id)}>
        <View style={styles.calloutView}>
          <Text style={styles.caption}>{post.caption}</Text>
          {/* Workaround for Android bug: https://github.com/react-native-maps/react-native-maps/issues/2633#issuecomment-2041125262 */}
          {Platform.OS === "android" ? (
            <WebView source={{ uri: post.image }} style={styles.image} />
          ) : (
            <Image source={{ uri: post.image }} style={styles.image} />
          )}
        </View>
      </Callout>
    </Marker>
  );
}

const styles = StyleSheet.create({
  calloutView: {
    flex: 1
  },
  image: { height: 100 },
  caption: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10
  }
});
