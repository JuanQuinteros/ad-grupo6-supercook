import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, Chip, Menu, Text, TextInput, Title, useTheme } from 'react-native-paper';
import FilterButtonGroup, { BUTTON_VALUES } from '../../components/FilterButtonGroup';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useQuery } from 'react-query';
import * as recetasApi from "../../api/recipes";
import RecipeCard from '../../components/RecipeCard';

const ORDENAMIENTOS = [
  { nombre: 'Sin ordenar', sort: undefined, icon: 'null', menuLabel: 'Sin ordenar' },
  { nombre: 'Nombre', sort: 1, icon: 'sort-alphabetical-ascending', menuLabel: 'Nombre' },
  { nombre: 'Nombre', sort: 2, icon: 'sort-alphabetical-descending', menuLabel: 'Nombre' },
];

function BusquedaNombreScreen({ navigation }) {
  const { colors } = useTheme();
  const [selectedButton] = useState(BUTTON_VALUES.Nombre);
  const [nombre, setNombre] = useState('');
  const [queryNombre, setQueryNombre] = useState('');
  const [sort, setSort] = useState(undefined);
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const { data: recetas, isLoading } = useQuery(
    ['recetas-busqueda', queryNombre, sort], // Cuando alguno de estos cambia, hace refetch
    () => recetasApi.getRecetaPorNombre({ nombre: queryNombre, sort }),
    {
      enabled: true,
      initialData: [],
    },
  );

  function handleSelectButton(url) {
    navigation.navigate(url);
  }

  function handleRecipePress(recipe) {
    navigation.navigate('Receta', { recetaId: recipe.id })
  }

  function handleRemoveSort() {
    setSort(undefined);
  }

  function handleRemoveSearch() {
    setNombre('');
    setQueryNombre('');
  }

  function handleSearch() {
    setQueryNombre(nombre);
  }

  function handleSortPress(sort) {
    setSort(sort);
    closeMenu();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Title style={{ marginTop: 15, marginLeft: 15 }}>B??squeda</Title>
      <FilterButtonGroup
        selected={selectedButton}
        onPress={handleSelectButton} />
      <TextInput
        style={{ marginLeft: 8, marginRight: 8, marginTop: 5}}
        label="B??squeda"
        mode="outlined"
        placeholder="??Qu?? vas a buscar hoy? ????"
        returnKeyType='search'
        value={nombre}
        left={<TextInput.Icon name="magnify" />}
        onChangeText={setNombre}
        onSubmitEditing={handleSearch}
      />
      <Title style={{ marginTop: 15, marginLeft: 15 }}>Resultados</Title>
      <View style={{ flexDirection: 'row', marginRight: 8, marginLeft: 8 }}>
        <Chip
          onClose={handleRemoveSearch}
          disabled={queryNombre === ''}
        >
          Nombre: {queryNombre}
        </Chip>
        <View style={{ marginLeft: 'auto' }}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={(
              <Chip
                icon={ORDENAMIENTOS[sort ?? 0].icon}
                onPress={openMenu}
                onClose={handleRemoveSort}
              >
                {ORDENAMIENTOS[sort ?? 0].nombre}
              </Chip>
            )}
          >
            {ORDENAMIENTOS.map((o, i) => (
              <Menu.Item
                key={i}
                icon={o.icon}
                onPress={() => handleSortPress(o.sort)}
                title={o.menuLabel}
              />
            ))}
          </Menu>
        </View>
      </View>
      {isLoading && (
        <ActivityIndicator animating={isLoading} color={colors.primary} />
      )}
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
          {recetas.length === 0 && (
            <View>
              <Text style={{ textAlign: 'center' }}>Sin resultados ????</Text>
            </View>
          )}
          {recetas?.map(receta => (
            <RecipeCard
              key={receta.id}
              recipe={receta}
              onPress={handleRecipePress}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BusquedaNombreScreen;
