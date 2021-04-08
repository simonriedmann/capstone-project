# RestaurantCard

This is a documentation about my RestaurantCard:

Restaurant Card (not a Favorite)

```js
const restaurantExample = {
    name: 'Michelangelo Pizzeria',
    type: 'Italian',
    website: 'michelangelo-augsburg.de',
    street: 'Donauwörther Str. 47',
    postal_code: 86154,
    city: 'Augsburg',
    phone: '0821 415637',
};

<RestaurantCard restaurant={restaurantExample}/>;
```
Restaurant Card (Favorite)

```js
const restaurantExample = {
    name: 'Michelangelo Pizzeria',
    type: 'Italian',
    website: 'michelangelo-augsburg.de',
    street: 'Donauwörther Str. 47',
    postal_code: 86154,
    city: 'Augsburg',
    phone: '0821 415637',
};

<RestaurantCard restaurant={restaurantExample} isFavorite="true"/>;
```