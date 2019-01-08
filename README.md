
# React Weather Application
[React Weather Application](https://reactlocalweatherapp.herokuapp.com/ "React Weather Application")

A mobile friendly app that gives you the current local weather as well as the option to search any place you'd like.



## User Flow

This application is designed to prompt you for your location upon initial load - upon accepting, it will display your current, hourly, five day forecast and a map location with radar layers consisting of cloud and precipitation.



If declined, it will display a default city with its related information. This still gives the user the option to search for another location. 


![](https://i.imgur.com/4nZENbj.png)



### Search


Weather data is obtained through [Openweathermaps API](https://openweathermap.org/ "Openweathermaps API"). For now the only option to search is by location name - ex, "Charlotte, US". The API's query is set up by "City, Country". 

### Location


The footer contains a location icon showing whether or not your location is enabled for the site. Blue is enabled, red is disabled. This can be changed in your Chrome settings.

![](https://i.imgur.com/1HCIV6P.png)




### Technology

This was built using React, Redux, Node, Material-UI, Axios and React-Leaflet. Also including some additional NPM packages.
