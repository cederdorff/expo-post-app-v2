import { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import User from "../../components/User";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const API_URL = "https://expo-post-app-default-rtdb.firebaseio.com";

    useEffect(() => {
        getUsers();
    }, []);

    async function getUsers() {
        const response = await fetch(`${API_URL}/users.json`);
        const dataObj = await response.json();
        const usersArray = Object.keys(dataObj).map(key => ({ id: key, ...dataObj[key] })); // from object to array
        usersArray.sort((userA, userB) => userA.name.localeCompare(userB.name)); // sort by name
        setUsers(usersArray);
    }

    async function handleRefresh() {
        setRefreshing(true);
        await getUsers();
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    }

    function renderUser(item) {
        const user = item.item;
        return <User user={user} />;
    }

    return (
        <View style={styles.list}>
            <FlatList
                data={users}
                renderItem={renderUser}
                keyExtractor={user => user.id}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#264c59" />
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
