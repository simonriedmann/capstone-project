import RestaurantForm from '../components/RestaurantForm';
import PropTypes from 'prop-types';


export default function AddRestaurant(
    {addRestaurant}
){
    return (
    <div>
        <RestaurantForm onSubmitForm={addRestaurant}/>
    </div>
    )
}

AddRestaurant.propTypes = {
    addRestaurant: PropTypes.func,

  };

