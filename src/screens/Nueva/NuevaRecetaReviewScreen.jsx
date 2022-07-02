import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FAB, Text, Title } from "react-native-paper";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import { useQuery, useMutation } from 'react-query';
import UserDetail from '../Receta/UserDetail';
import ButtonGroup, { BUTTON_VALUES } from '../Receta/ButtonGroup';
import IngredientesCalculator from '../Receta/IngredientesCalculator';
import PasosView from '../Receta/PasosView';
import { useReceta } from '../../hooks/receta-context';
import { getUser } from '../../api/user';
import * as recipesApi from '../../api/recipes';
import { CarouselMultimedia } from '../../components/CarouselMultimedia';

function NuevaRecetaReviewScreen({ navigation }) {
  const { data: usuario, isLoading: isUsuarioLoading } = useQuery('usuario', getUser, {
    select: (data) => data.usuario,
  });
  const { value: receta } = useReceta();
  const [selectedTab, setSelectedTab] = useState(BUTTON_VALUES.Ingredientes);
  const [ingredientes, setIngredientes] = useState([]);
  const [porciones, setPorciones] = useState(1);

  const { mutate, isLoading } = useMutation(recipesApi.crearReceta, {
    onSuccess: (data) => {
      navigation.navigate('RecetaEnviada');
    },
    onError: (error) => {
      Alert.alert('😞', error.response?.data?.message ?? 'Algo salió mal');
    },
  });

  useEffect(() => {
    setPorciones(receta.porciones);
    setIngredientes(receta.ingredientes.slice());
  }, []);

  function handleButtonPress(selected) {
    setSelectedTab(selected);
  }

  function handleIngredientesChange(porciones, ingredientes) {
    setPorciones(porciones);
    setIngredientes(ingredientes);
  }

  function handlePasoAPasoPress() {
    navigation.navigate('PasosReview');
  }

  function handleSavePress() {
    mutate(receta);
    // navigation.navigate('RecetaEnviada');
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginTop: 15 }}>
        <CarouselMultimedia data={receta.fotosPortada} />
      </View>
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={styles.container}>
          <Title>{receta.nombre}</Title>
          {!isUsuarioLoading && <UserDetail user={usuario} />}
          <Text style={{ marginTop: 10 }}>{receta.descripcion}</Text>
          <ButtonGroup selected={selectedTab} onPress={handleButtonPress} />
          {selectedTab === BUTTON_VALUES.Ingredientes && (
            <IngredientesCalculator
              ingredientes={ingredientes}
              porciones={porciones}
              receta={receta}
              editable={false}
              onChange={handleIngredientesChange}
            />
          )}
          {selectedTab === BUTTON_VALUES.Instrucciones && (
            <PasosView
              navigation={navigation}
              receta={receta}
              onPasoAPasoPress={handlePasoAPasoPress}
            />
          )}
        </View>
      </ScrollView>
      <FAB
        style={styles.fab}
        small
        icon="content-save"
        onPress={handleSavePress}
        loading={isLoading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    marginVertical: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
});

export default NuevaRecetaReviewScreen;
