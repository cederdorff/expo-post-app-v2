import { Stack, useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  FlatList,
  RefreshControl,
  StyleSheet,
  View
} from "react-native";
import Post from "../components/Post";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const { EXPO_PUBLIC_API_URL } = process.env;

  useEffect(() => {
    getPosts();
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

  function renderPost(item) {
    const post = item.item;
    return <Post post={post} reload={getPosts} />;
  }

  async function handleRefresh() {
    setRefreshing(true);
    await getPosts();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }

  return (
    <View style={styles.list}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={post => post.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#264c59"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
});
