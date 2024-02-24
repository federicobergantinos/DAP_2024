import React from "react";
import { Block, Text } from "galio-framework";
import { yummlyTheme } from "../../constants/index.js";
import Icon from "../../components/Icon.js";
import styles from "./CreateRecipeStyles.js";
import tags from "../../constants/tabs";
import MultiSelect from "react-native-multiple-select";
import { TouchableOpacity, View } from "react-native";

const RenderSelectedTags = ({ selectedTags, removeTag, tags }) => (
  <View style={styles.tagsContainer}>
    {selectedTags.map((id) => (
      <View key={id} style={styles.tag}>
        <Text style={styles.tagText}>
          {tags.find((tag) => tag.id === id).title}
        </Text>
        <TouchableOpacity onPress={() => removeTag(id)}>
          <Icon
            name="cross"
            family="Entypo"
            size={20}
            color={yummlyTheme.COLORS.ICON}
          />
        </TouchableOpacity>
      </View>
    ))}
  </View>
);

export default renderTags = ({ selectedTags, onUpdate }) => {
  onSelectedItemsChange = (selectedTags) => {
    onUpdate({ selectedTags });
  };

  toggleMultiSelect = (isOpen) => {
    onUpdate({ isMultiSelectOpen: isOpen });
  };

  removeTag = (id) => {
    onUpdate((prevState) => ({
      selectedTags: prevState.selectedTags.filter((tagId) => tagId !== id),
    }));
  };

  return (
    <Block style={styles.CreateRecipeCard}>
      <Text bold size={14} color="#525F7F" style={{ marginTop: 3 }}>
        Tags
      </Text>
      <MultiSelect
        hideTags
        items={tags.tags}
        uniqueKey="id"
        onSelectedItemsChange={this.onSelectedItemsChange}
        selectedItems={selectedTags}
        selectText="Aplicá los Tags"
        searchInputPlaceholderText="Buscar los Tags..."
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="title"
        onToggleList={this.toggleMultiSelect}
        searchInputStyle={{ color: "#CCC" }}
        submitButtonColor="#CCC"
        submitButtonText="Confirmar"
      />
      <RenderSelectedTags
        selectedTags={selectedTags}
        removeTag={removeTag}
        tags={tags.tags}
      />
    </Block>
  );
};
