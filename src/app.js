import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, TextInput, Button, View } from 'react-native';
import { CheckBox } from '@rneui/themed';  // Import CheckBox from React Native Elements

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  taskText: {
    marginLeft: 10,
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 10,
    flex: 1,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
});

export default function App() {
  const [tasks, setTasks] = useState([
    { id: '1', description: 'Build a fun schedule', completed: false },
    { id: '2', description: 'Complete Assignment', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');

  // Toggle task completion
  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Add new task
  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObject = {
        id: (tasks.length + 1).toString(),
        description: newTask,
        completed: false,
      };
      setTasks([...tasks, newTaskObject]);
      setNewTask('');  // Clear input field
    }
  };

  // Render each task in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.task}>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleTaskCompletion(item.id)}
      />
      <Text
        style={[
          styles.taskText,
          item.completed && { textDecorationLine: 'line-through', textDecorationStyle: 'solid' },
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
        keyExtractor={(item) => item.id}
      />

      {/* Input for new task */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter task description"
          value={newTask}
          onChangeText={setNewTask}
        />
        <Button title="Add" onPress={addTask} />
      </View>
    </SafeAreaView>
  );
}

}

