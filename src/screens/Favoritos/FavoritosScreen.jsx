import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Title } from 'react-native-paper';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import HomeLayout from '../../layouts/HomeLayout';
import * as userApi from '../../api/user';
import RecipeCard from '../../components/RecipeCard';
import * as favoritesApi from '../../api/favorites';

function FavoritosScreen({ navigation }) {
  const { data: usuario } = useQuery('user', userApi.getUser, {
    placeholderData: { nombre: 'Invitado' },
    select: (data) => data.usuario,
  });

  const queryClient = useQueryClient();

  const { data: favoritos } = useQuery('favorites', favoritesApi.favoritos, {
    placeholderData: [],
  });

  function handleIconPress() {
    navigation.navigate('PerfilStack', { screen: 'Perfil' });
  }

  const { mutate } = useMutation(favoritesApi.agregarFavorito, { // agregar: post_favorito..
    onSuccess: () => {
      queryClient.invalidateQueries(['favorites']);
      queryClient.invalidateQueries(['recomendados']);
      queryClient.invalidateQueries(['recetasUltimas']);
      queryClient.invalidateQueries(['ingredienteDeLaSemana']);
    },
  });

  function handleRecipePress(recipe) {
    const { user, ...receta } = recipe;
    navigation.navigate('Receta', { recetaId: recipe.id })
  }

  // const queryClient = useQueryClient();
  // const { mutate, isLoading } = useMutation(favoritesApi.agregarFavorito, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['favorites']);
  //   },
  // });

  function handleFavoritoPress(recipe) {
    mutate ({
      id: recipe.id
      //esFavorito: !recipe.esFavorito
    })
  }

  return (
    <HomeLayout
      icon="account-circle-outline"
      title={`Hola ${usuario.nombre}`}
      onIconPress={handleIconPress}
      padding={16}
    >
      <Title>Recetas Favoritas</Title>
      {/* {console.log(JSON.stringify(favoritos))} */}
      <ScrollView style={{marginTop: 10}}>
        {favoritos.map(r => (
          <RecipeCard
            key={r.id}
            recipe={r}
            onPress={handleRecipePress}
            onFavoritoPress={handleFavoritoPress}
          />
        ))}
      </ScrollView>
    </HomeLayout>
  );
}

export default FavoritosScreen;
