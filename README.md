# FoodRestaurantBE

## Api Workings

   - Register user ->    post : localhost:8088/api/register
   - Login user ->    post : localhost:8088/api/login
   - Password Reset -> patch  : localhost:8088/api/user/:id/reset
   - Available Restaurant -> get  : localhost:8088/api/restaurant
   - Specific Restaurant  -> get  : localhost:8088/api/restaurant/:id
   - Specific Restaurant Menu -> get  : localhost:8088/api/restaurant/:id/menu/
   - Adding new menu item to Specific Restaurant -> post : localhost:8088/api/restaurant/:id/menu
   - Delete menu item from Restaurant -> Delete : localhost:8088/api/restaurant/:id1/menu/:id2
   - post a new order -> post : localhost:8088/api/orders
   - Get all the orders -> get : localhost:8088/api/ordes
