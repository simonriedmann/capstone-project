import React from 'react';
import RestaurantForm from '../components/RestaurantForm';
import PropTypes from 'prop-types'
import styled from 'styled-components';

export default function AddRestaurant(
    {addRestaurant}
){
    return (
    <div>
        <Main>
            <RestaurantForm onSubmitForm={addRestaurant}/>
        </Main>
    </div>
    )
}

    AddRestaurant.propTypes = {
        addRestaurant: PropTypes.func,

    };

  const Main = styled.div`
    margin-top: 6rem;
    margin-bottom: 8rem;
      


  `;


  

