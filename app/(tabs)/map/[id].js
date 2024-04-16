import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import Post from "../../components/Post";

export default function MapDetail() {
    const [post, setPost] = useState({});
    const API_URL =
        "https://expo-post-app-default-rtdb.firebaseio.com";
    const { id } = useLocalSearchParams();

    useEffect(() => {
        getPost();
    }, [id]);

    async function getPost() {
        const response = await fetch(`${API_URL}/posts/${id}.json`);
        const data = await response.json();
        data.id = id;
        setPost(data);
    }

    return (
        <ScrollView>
            <Stack.Screen
                options={{
                    title: post?.caption
                }}
            />
            <Post post={post} key={post.id} reload={getPost} />
        </ScrollView>
    );
}
