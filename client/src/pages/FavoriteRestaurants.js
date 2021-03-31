import styled from 'styled-components';
import RestaurantCard from '../components/RestaurantCard';

export default function FavoriteRestaurants({
    favoriteRestaurants,
    updateFavorites,
  }) {
    const isFavorite = (restaurant) =>
      favoriteRestaurants.some(
        (favoriteRestaurant) => restaurant._id === favoriteRestaurant._id
      )

    const removeFavoriteRestaurant = (restaurant) => {
        if (isFavorite(restaurant)) {
          updateFavorites(
            favoriteRestaurants.filter(
              (favoriteRestaurant) => favoriteRestaurant._id !== restaurant._id
            )
          )
        }
    }

  
    return (
      <Main>
        <h1>Favorite Restaurants</h1>
        <Wrapper>
          {favoriteRestaurants.map((restaurant, index) => (
            <RestaurantCard
              key={restaurant._id + index}
              restaurant={restaurant}
              onAddToFavorites={() => removeFavoriteRestaurant(restaurant)}
              isFavorite={() => isFavorite(restaurant)}
              onDeleteCard={() => removeFavoriteRestaurant(restaurant)}
            />
          ))}
        </Wrapper>
      </Main>
    );
  }
  
  const Main = styled.div`
    margin-top: 6rem;
    margin-bottom: 8rem;
      
    h1 {
      padding: 2rem;
      text-align: center;
    }

  `;
  
  const Wrapper = styled.section`
    display: grid;
  
    place-items: center;
    gap: 1rem;
  `;

