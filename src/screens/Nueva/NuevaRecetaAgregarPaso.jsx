import React, { useState } from 'react';
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Subheading, TextInput, Title, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useReceta } from '../../hooks/receta-context';

function NuevaRecetaAgregarPasoScreen({ navigation, route }) {
  const index = route?.params?.index;
  const { value: receta, onChange: setReceta } = useReceta();
  const [descripcion, setDescripcion] = useState(Number.isInteger(index) ? receta.pasos[index].descripcion : '');
  const { colors }  = useTheme();

  function handleCancelar() {
    navigation.goBack();
  }

  function handleGuardar() {
    const creandoPaso = index === undefined;
    const nuevoPaso = {
      descripcion,
      media: [],
    };
    const nuevosPasos = [
      ...receta.pasos,
    ];
    if(creandoPaso) {
      nuevosPasos.push(nuevoPaso);
    }
    else {
      nuevosPasos[index] = nuevoPaso;
    }
    setReceta({
      ...receta,
      pasos: nuevosPasos,
    });
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 20}}>
      <View style={{flexGrow: 1}}>
        <Title>Nuevo paso</Title>
        <Subheading>Paso {(index ?? receta.pasos.length) + 1}</Subheading>
        <TextInput
          label="Descripción del paso"
          mode="outlined"
          value={descripcion}
          multiline
          numberOfLines={2}
          onChangeText={setDescripcion}
        />
        <View style={{marginTop: 20}}>
          <Subheading>Agregar imágenes/videos deseados</Subheading>
          <View style={{flexDirection: 'row'}}>
            <View style={{...styles.multimediaContainer, backgroundColor: colors.background}}>
              <Avatar.Icon icon="camera" color={colors.disabled} style={{backgroundColor: 'transparent'}} />
            </View>
            <View style={{...styles.multimediaContainer, backgroundColor: colors.background}}>
              <Avatar.Icon icon="video" color={colors.disabled} style={{backgroundColor: 'transparent'}} />
            </View>
          </View>
        </View>
      </View>
      <View style={{flexGrow: 1, justifyContent: 'flex-end'}}>
        <View style={{flexDirection: 'row'}}>
          <Button
            style={{flex: 1, width: '100%'}}
            mode="outlined"
            onPress={handleCancelar}
          >
            Cancelar
          </Button>
          <Button
            style={{flex: 1, width: '100%'}}
            mode="contained"
            onPress={handleGuardar}
          >
            Guardar
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  multimediaContainer: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
});

export default NuevaRecetaAgregarPasoScreen;