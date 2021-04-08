import React from 'react';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';


export default function RestaurantCard({
  restaurant, 
  isFavorite,
  onRemoveFromFavorites
}) {

  return (
    <Card>
      <CardContent>
        <h4>{restaurant.name}</h4>
        <FavoriteButton isFavorite={isFavorite} onClick={onRemoveFromFavorites}>
          <div></div>
        </FavoriteButton>
        <Description>
          <div>
            <p>Type: {restaurant.type}</p>
            <p>Address: {restaurant.street}, {restaurant.postal_code} {restaurant.city}</p>
            <p>Menu: {restaurant.website}</p>
            <p>Phone: {restaurant.phone}</p>
          </div>
        </Description>
      </CardContent>
    </Card>
  );
}

RestaurantCard.propTypes = {
  restaurant: PropTypes.object,
  isFavorite: PropTypes.bool,
  onRemoveFromFavorites: PropTypes.func,
};

  const Card = styled.div`
    background: grey;
    border-radius: 1rem;
    box-shadow: 0px 2px 4px 0px var(--grey-400);
    max-width: 26rem;
    min-width: 16rem;
    overflow: hidden;
    z-index: 1;
    margin: 0.5rem;
  
    position: relative;
  `;
  
  
  const CardContent = styled.div`
    padding: 0 2rem 2rem;
    position: relative;
  
    p {
      color: white;
      font-size: 1rem;
      display: inline-block;
      margin-bottom: 0.75rem;
      left: 0;
      line-height: 1rem;
      padding-right: 0.75rem;
      position: relative;
  
    }
    h4 {
      margin-bottom: 1.75rem;
      color: orange;
      font-size: 1.5rem;
      line-height: 1.5rem;
      font-weight: 600;
      letter-spacing: -0.025em;
    }
  `;
  
  const Description = styled.div`
    margin-bottom: 0.25rem;
    font-size: 1rem;
    line-height: 1.5rem;
  `;
  


  const FavoriteButton = styled.div`
  right: 2.5rem;
  margin-top: 0.25rem;
  position: absolute;
  top: 2.4rem;

  div {
    height: 1rem;
    width: 1rem;
    background: ${(props) =>
      props.isFavorite ? 'var(--primary-400)' : 'var(--grey-200)'};
    transform: rotate(45deg);

    &::before {
      content: '';
      height: 1rem;
      width: 1rem;
      background: ${(props) =>
        props.isFavorite ? 'var(--primary-400)' : 'var(--grey-200)'};
      position: absolute;
      border-radius: 50%;
      right: 10px;
      bottom: 0px;
    }
    &::after {
      content: '';
      height: 1rem;
      width: 1rem;
      background: ${(props) =>
        props.isFavorite ? 'var(--primary-400)' : 'var(--grey-200)'};
      border-radius: 50%;
      position: absolute;
      right: 0px;
      bottom: 11px;
    }
  }
`;
  