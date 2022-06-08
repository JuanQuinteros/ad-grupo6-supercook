import React from 'react';
import { Alert, ScrollView } from 'react-native';
import { useQuery } from 'react-query';
import RecipeSideScroller from '../../components/RecipeSideScroller';
import HomeLayout from '../../layouts/HomeLayout';
import * as recipesApi from '../../api/recipes';
import * as userApi from '../../api/user';

export default function HomeScreen({ navigation }) {
  const userQuery = useQuery('user', userApi.test, {
    placeholderData: { user: { nombre: 'Invitado' } },
  });
  const recomendadosQuery = useQuery('recomendados', recipesApi.recomendados);
  const recetasUltimasQuery = useQuery('recetasUltimas', recipesApi.recetasUltimas);
  const ingredienteDeLaSemanaQuery = useQuery('ingredienteDeLaSemana', recipesApi.ingredienteDeLaSemana);

  function handleIconPress() {
    navigation.navigate('Perfil');
  }

  function handleRecipePress(recipe) {
    const { user, ...receta } = recipe;
    Alert.alert('🍔', JSON.stringify(receta));
  }

  function handleRecomendadosPress() {
    navigation.navigate('Recomendados');
  }

  function handleUltimasRecetasPress() {
    navigation.navigate('UltimasRecetas');
  }

  function handleIngredienteDeLaSemanaPress() {
    navigation.navigate('IngredienteDeLaSemana');
  }

  return (
    <HomeLayout
      icon="account-circle-outline"
      title={`Hola ${userQuery.data.user.nombre}`}
      onIconPress={handleIconPress}
      padding={16}
    >
      <ScrollView>
        <RecipeSideScroller
          title="Recomendados para vos"
          items={recomendadosQuery.data}
          onVerTodosPress={handleRecomendadosPress}
          onItemPress={handleRecipePress}
        />
        <RecipeSideScroller
          title="Últimas recetas añadidas"
          items={recetasUltimasQuery.data}
          onVerTodosPress={handleUltimasRecetasPress}
          onItemPress={handleRecipePress}
        />
        <RecipeSideScroller
          title="Ingrediente de la semana"
          items={ingredienteDeLaSemanaQuery.data}
          onVerTodosPress={handleIngredienteDeLaSemanaPress}
          onItemPress={handleRecipePress}
        />
      </ScrollView>
    </HomeLayout>
  );
}
