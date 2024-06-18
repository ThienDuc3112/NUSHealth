import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

const TextInputWithSuggestion = ({
  onBlur,
  onChangeText,
  value,
  suggestions
}: {
  onBlur: (e: any) => void,
  onChangeText: (text: string) => void,
  value: string,
  suggestions: string[]
}) => {
  const [focus, setFocus] = useState(false)

  return (
    <View style={{ position: "relative" }}>
      <TextInput
        style={styles.input}
        onBlur={(e) => {
          setFocus(false)
          console.log("blured")
          onBlur(e)
        }}
        onChangeText={onChangeText}
        value={value}
        onFocus={() => { if (!value) setFocus(true) }}
      />
      {focus && value === '' && <View style={styles.suggestionsContainer}>
        <FlatList
          style={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
          data={suggestions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onChangeText(item)}>
              <Text style={styles.suggestionItem}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>}
    </View>
  )
}

export default TextInputWithSuggestion

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 0,
    paddingLeft: 8,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 40, // Adjust based on your input's position
    left: 0,
    right: 0,
    backgroundColor: 'white',
    maxHeight: 200,
    borderColor: 'gray',
    borderWidth: 1,
    borderTopWidth: 0,
    zIndex: 1,
  },
  suggestionItem: {
    padding: 12,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
})
