import React from "react";
import {View, StyleSheet, Text, Dimensions} from "react-native";
import {Chip} from "react-native-paper";

const width = Dimensions.get('window').width

const TaskCard = ({item}) => {
    return(
        <View style={styles.body}>
            <View style={styles.upper}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleLabel} numberOfLines={1}>{item.task_title}</Text>
                    <Text style={styles.descriptionLabel} numberOfLines={2}>{item.task_des}</Text>
                </View>
                <View style={styles.chipContainer}>
                    <Chip icon="information" style={{backgroundColor: item.task_status === "Pending" ? '#ffcc00': item.task_status === "Complete" ? '#22ff55' : '#ff3333'}} >{item.task_status}</Chip>
                </View>
            </View>
            <View style={styles.lower}>
                <View style={styles.taskDateContainer}>
                    <View style={styles.startDate}>
                        <Text style={styles.dateLabel}>Start Date</Text>
                        <Text style={styles.date}>{item.task_startDate}</Text>
                    </View>
                    <View style={styles.to}>
                        <Text style={styles.toText}>to</Text>
                    </View>
                    <View style={styles.startDate}>
                        <Text style={styles.dateLabel}>Due Date</Text>
                        <Text style={styles.date}>{item.task_dueDate}</Text>
                    </View>
                </View>
                <View style={styles.createDateContainer}>
                    <Text style={styles.dateLabel}>Created Date</Text>
                    <Text style={styles.date}>{item.task_createDate}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        marginStart: 16,
        marginEnd: 16,
        marginTop: 8,
        marginBottom: 8,
        height: 160,
        backgroundColor: '#fff',
        borderRadius: 30,
        elevation: 6,
    },
    upper: {
        width: width-32,
        height: 160*0.6,
        backgroundColor: '#e9eded',
        borderTopEndRadius : 30,
        borderTopStartRadius: 30,
        flexDirection: "row",
        padding: 10,
    },
    lower: {
        width: width-32,
        height: 160*0.4,
        backgroundColor: '#fff',
        borderBottomStartRadius: 30,
        borderBottomEndRadius: 30,
        flexDirection: "row",
    },
    titleContainer: {
        width: (width-50)*0.7,
        height: 160*0.6-20,
        padding: 8,
        justifyContent: "center",
    },
    chipContainer: {
        width: (width-50)*0.3,
        height: 160*0.6-20,
        padding: 8,
        justifyContent: "center",
    },
    titleLabel: {
        fontFamily: 'BalsamiqSans-Bold',
        fontSize: 24,
    },
    descriptionLabel: {
        fontFamily: 'BalsamiqSans-Regular',
        fontSize: 14,
    },
    taskDateContainer: {
        padding: 8,
        width: (width-32)*0.7,
        flexDirection: "row",
        borderBottomStartRadius: 30,
    },
    createDateContainer: {
        padding: 8,
        width: (width-32)*0.3,
        borderBottomEndRadius: 30,
        justifyContent: "center",
    },
    startDate: {
        justifyContent: "center",
        padding: 8,
    },
    to: {
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
    },
    toText: {
        fontSize: 18,
        fontFamily: 'BalsamiqSans-Bold',
    },
    dateLabel: {
        fontSize: 12,
        fontFamily: 'BalsamiqSans-Bold',
    },
    date: {
        fontSize: 12,
        fontFamily: 'BalsamiqSans-Regular',
    },

})

export default TaskCard
