import React from 'react';
import { Alert, ScrollView } from 'react-native';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import RecipeSideScroller from '../../components/RecipeSideScroller';
import HomeLayout from '../../layouts/HomeLayout';
import * as recipesApi from '../../api/recipes';
import * as userApi from '../../api/user';
import * as favoritesApi from '../../api/favorites'
import RecipeCard from '../../components/RecipeCard';

export default function HomeScreen({ navigation }) {
  const { data: usuarioData } = useQuery('user', userApi.getUser, {
    placeholderData: { usuario: { nombre: 'Invitado' }},
  });
  const queryClient = useQueryClient();
  const {data: recomendadosData} = useQuery('recomendados', recipesApi.recomendados);
  const {data: recetasUltimasData} = useQuery('recetasUltimas', recipesApi.recetasUltimas);
  const {data: ingredienteDeLaSemanaData} = useQuery('ingredienteDeLaSemana', recipesApi.ingredienteDeLaSemana);

  const { mutate, isLoading } = useMutation(favoritesApi.agregarFavorito, {
    onSuccess: () => {
      queryClient.invalidateQueries(['recomendados']);
      queryClient.invalidateQueries(['recetasUltimas']);
      queryClient.invalidateQueries(['ingredienteDeLaSemana']);
      queryClient.invalidateQueries(['favorites']);
    },
  });

  function handleIconPress() {
    navigation.jumpTo('PerfilStack', { screen: 'Perfil' });
  }

  function handleRecipePress(recipe) {
    const { user, ...receta } = recipe;
    navigation.navigate('Receta', { recetaId: recipe.id })
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

  function handleFavoritoPress(recipe) {
    mutate ({
      id: recipe.id
    })
  }

  return (
    <HomeLayout
      icon="account-circle-outline"
      title={`Hola ${usuarioData.usuario.nombre}`}
      onIconPress={handleIconPress}
      padding={16}
    >
      <ScrollView>
        <RecipeSideScroller
          title="Recomendados para vos"
          items={recomendadosData}
          onVerTodosPress={handleRecomendadosPress}
          onItemPress={handleRecipePress}
          onFavoritoPress={handleFavoritoPress}
        />
        <RecipeSideScroller
          title="??ltimas recetas a??adidas"
          items={recetasUltimasData}
          onVerTodosPress={handleUltimasRecetasPress}
          onItemPress={handleRecipePress}
          onFavoritoPress={handleFavoritoPress}
        />
        <RecipeSideScroller
          title="Ingrediente de la semana"
          items={ingredienteDeLaSemanaData}
          onVerTodosPress={handleIngredienteDeLaSemanaPress}
          onItemPress={handleRecipePress}
          onFavoritoPress={handleFavoritoPress}
        />
      </ScrollView>
    </HomeLayout>
  );
}
