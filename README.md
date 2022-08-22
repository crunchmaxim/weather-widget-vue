Vue JS weather widget.

Example of usage: https://crunchmaxim.github.io/weather-widget-vue-example/

How to use:

1. Build project via "npm run build"
2. Add weather-widget.js or weather-widget.min.js from dist folder into any html template.
3. Use widget as web component 
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weather widget example</title>
</head>
<body>
  <h1>Weather widget example</h1>
  <weather-widget></weather-widget>
  <script src="weather-widget.js"></script>
</body>
</html>
```

API key from https://openweathermap.org/api is required. API key can be setted as env variable before build, or pass as html attribute to web component as
```
<weather-widget apikey="YOUR_API_KEY"><weather-widget/>
```
