import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { Callout, Marker } from "react-native-maps";

export default function MapMarker({ post }) {
  function handleCalloutPress(id) {
    router.push(`map/${id}`);
  }

  return (
    <Marker coordinate={post.location}>
      <Callout onPress={() => handleCalloutPress(post.id)}>
        <View style={styles.calloutView}>
          <Text style={styles.caption}>{post.caption}</Text>
          <Image source={{ uri: post.image }} style={styles.image} />
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
