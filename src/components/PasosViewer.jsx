import React, { useState } from "react";
import { View } from "react-native";
import { Badge, IconButton, Text, useTheme } from "react-native-paper";
import { Alert } from "react-native-web";
import { CarouselMultimedia } from "./CarouselMultimedia";

export default function PasosViewer({ pasosReceta }) {
  const { colors } = useTheme();
  const [index, setIndex] = useState(0);

  function handleSiguientePress() {
    if (index === pasosReceta.length - 1) return;
    Alert.alert(JSON.stringify(pasosReceta))
    setIndex(index + 1);
  }

  function handleAnteriorPress() {
    if (index === 0) return;
    setIndex(index - 1);
  }

  function dataMultimedia(pasosMultimedia) {
    return pasosMultimedia?.map(item => item.img_multimedia);
  }

  return (
    <>
      <View style={{ marginVertical: 10, paddingHorizontal: 20 }}>
        <Text>{index + 1} de {pasosReceta.length}</Text>
      </View>
      <View style={{ marginVertical: 10 }}>
        <CarouselMultimedia data={dataMultimedia(pasosReceta[index].pasosMultimedia) ?? []} />
      </View>
      <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
        <Badge style={{ alignSelf: 'center', marginRight: 10 }}>{pasosReceta[index].numero_paso}</Badge>
        <View>
          <Text style={{ fontWeight: 'bold' }}>PASO {index + 1}</Text>
          <Text>{pasosReceta[index].descripcion_paso}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 'auto' }}>
        <IconButton
          icon="arrow-left"
          color={colors.primary}
          size={40}
          disabled={index === 0}
          onPress={handleAnteriorPress}
        />
        <IconButton
          icon="arrow-right"
          color={colors.primary}
          size={40}
          disabled={index === pasosReceta.length - 1}
          onPress={handleSiguientePress}
        />
      </View>
    </>
  )
}
