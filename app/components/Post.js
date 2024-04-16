import { useActionSheet } from "@expo/react-native-action-sheet";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Avatar from "./Avatar";

export default function Post({ post, reload }) {
    const { showActionSheetWithOptions } = useActionSheet();
    const API_URL = "https://expo-post-app-default-rtdb.firebaseio.com";
    const router = useRouter();

    function formatDate(timestamp) {
        const createdAt = new Date(timestamp);
        let month = createdAt.getMonth();
        let date = createdAt.getDate();

        month++; // index 0 is January
        month = month < 10 ? "0" + month : month;
        date = date < 10 ? "0" + date : date;

        return `${createdAt.getFullYear()}-${month}-${date}`;
    }

    function showEditMenu() {
        const options = ["Update Post", "Delete Post", "Cancel"];
        const destructiveButtonIndex = 1;
        const cancelButtonIndex = 2;

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
                destructiveButtonIndex,
                title: "Edit Post"
            },
            selectedIndex => {
                switch (selectedIndex) {
                    case 0:
                        // Update Post
                        showUpdateModal();
                        break;

                    case destructiveButtonIndex:
                        // Delete Post
                        showDeleteDialog();
                        break;

                    case cancelButtonIndex:
                    // Canceled
                }
            }
        );
    }

    function showUpdateModal() {
        router.push({
            pathname: "/post-modal",
            params: { id: post.id }
        });
    }

    function showDeleteDialog() {
        Alert.alert(
            "Delete Post",
            `Do you want to delete post '${post.caption}'?`,
            [
                {
                    text: "No",
                    style: "destructive"
                },
                { text: "Yes", onPress: deletePost }
            ]
        );
    }

    async function deletePost() {
        const response = await fetch(`${API_URL}/posts/${post.id}.json`, {
            method: "DELETE"
        });
        if (response.ok) {
            console.log("Post deleted!");
            reload();
        }
    }

    return (
        <View style={styles.postContainer}>
            <View style={styles.headerContainer}>
                <Avatar userId={post.uid} />
                <TouchableOpacity style={styles.dots} onPress={showEditMenu}>
                    <Ionicons
                        name="ellipsis-horizontal"
                        size={28}
                        color="#264c59"
                    />
                </TouchableOpacity>
            </View>
            <Image style={styles.image} source={{ uri: post.image }} />
            <Text style={styles.caption}>{post.caption}</Text>
            {post.location?.city ? (
                <Text style={styles.city}>
                    {post.location?.city}, {post.location?.country}
                </Text>
            ) : null}
            <Text style={styles.date}>{formatDate(post.createdAt)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    postContainer: {
        flex: 1,
        minHeight: 320,
        paddingBottom: 30,
        borderBottomColor: "#acc6c9",
        borderBottomWidth: 0.5
    },
    headerContainer: {
        alignItems: "center",
        flexDirection: "row"
    },
    caption: {
        fontSize: 22,
        padding: 15
    },
    date: {
        fontSize: 15,
        paddingHorizontal: 15
    },
    city: {
        fontSize: 15,
        paddingHorizontal: 15,
        paddingBottom: 15
    },
    image: {
        aspectRatio: 1,
        flex: 1
    },
    dots: {
        position: "absolute",
        right: 10
    }
});
