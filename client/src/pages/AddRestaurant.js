import RestaurantForm from '../components/RestaurantForm'


export default function AddRestaurant(
    {addRestaurant}
){
    return (
    <div>
        <RestaurantForm onSubmitForm={addRestaurant}/>
    </div>
    )
}

