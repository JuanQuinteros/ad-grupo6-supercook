import React from 'react';
import { Alert, ScrollView } from 'react-native';
import { Title } from 'react-native-paper';
import { useQuery } from 'react-query';
import HomeLayout from '../../layouts/HomeLayout';
import * as recipesApi from '../../api/recipes';
import * as userApi from '../../api/user';
import RecipeCard from '../../components/RecipeCard';

export default function RecomendadosScreen({ navigation }) {
  const { data: usuario } = useQuery('user', userApi.test, {
    placeholderData: { user: { nombre: 'Invitado' } },
    select: (data) => data.user
  });
  const { data: recomendados } = useQuery('recomendados', recipesApi.recomendados);

  function handleIconPress() {
    navigation.navigate('Perfil');
  }

  function handleRecipePress(recipe) {
    const { user, ...receta } = recipe;
    Alert.alert('🍔', JSON.stringify(receta));
  }

  return (
    <HomeLayout
      icon="account-circle-outline"
      title={`Hola ${usuario.nombre}`}
      onIconPress={handleIconPress}
      padding={16}
    >
      <Title>Recomendados</Title>
      <ScrollView>
        {recomendados.map(r => (
          <RecipeCard
            key={r.id}
            recipe={r}
            onPress={handleRecipePress}
          />
        ))}
      </ScrollView>
    </HomeLayout>
  );
}