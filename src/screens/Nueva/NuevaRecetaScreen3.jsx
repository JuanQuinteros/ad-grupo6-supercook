import React from 'react';
import { Alert, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Caption, Subheading, Title } from 'react-native-paper';
import { useReceta } from '../../hooks/receta-context';
import Paso from '../../components/Paso';

function NuevaRecetaScreen3 ({ navigation }) {
  const { value: receta } = useReceta();

  function handleAgregarPasoPress() {
    navigation.navigate('CrearRecetaAgregarPaso');
  }

  function handleEditPress(index) {
    navigation.navigate('CrearRecetaAgregarPaso', {index});
  }

  async function handleSubmit() {
    // navigation.navigate('CrearRecetaReview');
    Alert.alert("Próximamente", "Próximo a implementar");
  }

  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 20}}>
      <View style={{flexGrow: 1}}>
        <Title>{receta.nombre}</Title>
        <Subheading>Paso a paso</Subheading>
        {receta.pasos.length === 0 && (
          <Caption>Todavía no agregaste ningún paso para preparar esta receta 😬</Caption>
        )}
        {receta.pasos.map((p, i) => (
          <Paso key={i} paso={p} index={i} onEditPress={handleEditPress} />
        ))}
        <Button
          mode="text"
          icon="plus"
          onPress={handleAgregarPasoPress}
        >
          Agregar paso
        </Button>
      </View>
      <View style={{flexGrow: 1, justifyContent: 'flex-end'}}>
        <View style={{flexDirection: 'row'}}>
          <Button
            style={{width: '100%'}}
            mode="contained"
            disabled={receta.pasos.length === 0}
            onPress={handleSubmit}
          >
            Finalizar edición (3/3)
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default NuevaRecetaScreen3;
