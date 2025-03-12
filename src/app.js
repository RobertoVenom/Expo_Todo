import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, TextInput, Button, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { CheckBox } from '@rneui/themed';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingHorizontal: 10,
  },
  taskText: {
    fontSize: 18,
    marginLeft: 10,
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: 'gray',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
});

export default function App() {
  // State to store the list of tasks
  const [tasks, setTasks] = useState([
    { key: '1', description: 'Buy some Foods', completed: false },
    { key: '2', description: 'Attend the Bowling Class', completed: false },
    { key: '3', description: 'Clean my Room', completed: false },
  ]);
  
  // State to handle new task input
  const [newTask, setNewTask] = useState('');

  // Toggle task completion status
  const toggleTaskCompletion = (key) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.key === key ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Add a new task to the list
  const addTask = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        key: (tasks.length + 1).toString(),
        description: newTask,
        completed: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTaskObj]);
      setNewTask('');
    }
  };

  // Render individual task item
  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleTaskCompletion(item.key)}
      />
      <Text
        style={[
          styles.taskText,
          item.completed ? styles.taskCompleted : null,
        ]}
      >
        {item.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
      
      {/* Input box and button to add a new task */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={newTask}
          onChangeText={setNewTask}
          onSubmitEditing={addTask} // Add task when Enter is pressed
        />
        <Button title="Add" onPress={addTask} />
      </View>
    </SafeAreaView>
  );
}

