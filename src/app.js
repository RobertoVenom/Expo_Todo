import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, View, Platform } from 'react-native';
import { CheckBox, Input, Button, Text } from '@rneui/themed';

export default function App() {

  const [tasks, setTasks] = useState([
    { key: '1', description: 'Set Room', completed: false },
    { key: '2', description: 'Organize the Material', completed: false },
    { key: '3', description: 'Build the Model', completed: false },
  ]);

  const [newTask, setNewTask] = useState('');

  const toggleTask = (key) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.key === key ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    if (newTask.trim() === '') return;

    const newItem = {
      key: Date.now().toString(),
      description: newTask,
      completed: false,
    };

    setTasks([...tasks, newItem]);
    setNewTask('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleTask(item.key)}
      />
      <Text
        style={
          item.completed
            ? styles.completedText
            : styles.taskText
        }
      >
        {item.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      <Text h3 style={styles.header}>TODO App</Text>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Enter a new task..."
          value={newTask}
          onChangeText={setNewTask}
          onSubmitEditing={addTask}
        />
        <Button title="Add" onPress={addTask} />
      </View>

      <FlatList
        data={tasks}
        renderItem={renderItem}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskText: {
    fontSize: 16,
  },
  completedText: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
});
