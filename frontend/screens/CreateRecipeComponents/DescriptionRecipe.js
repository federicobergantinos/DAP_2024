import React from "react";
import { Block, Text } from "galio-framework";
import Input from "../../components/Input.js";
import styles from "./CreateRecipeStyles.js";

const renderDescripcionPlato = ({
  preparationTime,
  servingCount,
  active,
  onUpdate,
}) => {
  return (
    <Block flex style={styles.CreateRecipeCard}>
      <Block>
        <Text bold size={14} color="#525F7F" style={{ marginTop: 3 }}>
          Porciones
        </Text>
        <Input
          right
          color="black"
          autoFocus={false}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="numeric"
          value={servingCount ? servingCount.toString() : ""}
          onChangeText={(text) =>
            onUpdate({ servingCount: text ? parseInt(text) : null })
          }
          iconContent={<Block />}
          style={[styles.search, active ? styles.shadow : null]}
          placeholder="Cuantas personas pueden comer?"
        />
        <Text bold size={14} color="#525F7F" style={{ marginTop: 3 }}>
          Tiempo de elaboración
        </Text>
        <Input
          right
          color="black"
          autoFocus={false}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="numeric"
          value={preparationTime ? preparationTime.toString() : ""}
          onChangeText={(text) =>
            onUpdate({ preparationTime: text ? parseInt(text) : null })
          }
          iconContent={<Block />}
          style={[styles.search, active ? styles.shadow : null]}
          placeholder="Agrega el tiempo en minutos!"
        />
      </Block>
    </Block>
  );
};

const renderDescripcionNutricional = ({
  totalFats,
  proteins,
  calories,
  active,
  onUpdate,
}) => {
  return (
    <Block flex style={styles.CreateRecipeCard}>
      <Block>
        <Text bold size={14} color="#525F7F" style={{ marginTop: 3 }}>
          Calorias
        </Text>
        <Input
          right
          color="black"
          autoFocus={false}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="numeric"
          value={calories ? calories.toString() : ""}
          onChangeText={(text) =>
            onUpdate({ calories: text ? parseInt(text) : null })
          }
          iconContent={<Block />}
          style={[styles.search, active ? styles.shadow : null]}
          placeholder=""
        />
        <Text bold size={14} color="#525F7F" style={{ marginTop: 3 }}>
          Proteinas
        </Text>
        <Input
          right
          color="black"
          autoFocus={false}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="numeric"
          value={proteins ? proteins.toString() : ""}
          onChangeText={(text) =>
            onUpdate({ proteins: text ? parseInt(text) : null })
          }
          iconContent={<Block />}
          style={[styles.search, active ? styles.shadow : null]}
          placeholder=""
        />
        <Text bold size={14} color="#525F7F" style={{ marginTop: 3 }}>
          Grasas totales
        </Text>
        <Input
          right
          color="black"
          autoFocus={false}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="numeric"
          value={totalFats ? totalFats.toString() : ""}
          onChangeText={(text) =>
            onUpdate({ totalFats: text ? parseInt(text) : null })
          }
          iconContent={<Block />}
          style={[styles.search, active ? styles.shadow : null]}
          placeholder=""
        />
      </Block>
    </Block>
  );
};

export { renderDescripcionNutricional, renderDescripcionPlato };
