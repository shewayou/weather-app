console.log( 'client side javascript file is loaded!')
// console.log( location )  // location is pre-existing


const url_1= 'http://api.mapbox.com/geocoding/v5/mapbox.places/';
const access_token= 'access_token=pk.eyJ1IjoiaHNpd2VpN3l1IiwiYSI6ImNsNnJhanE2ajEybmczY3Izd2o0NDE0bTQifQ.ajJcfXQrZchQ2sa8sosylQ'
const addressSfx= '.json'

let locationName= 'ashburn va'
let locationUrl= url_1 + encodeURIComponent( locationName ) + addressSfx + '?' + access_token;


/* units=f for farenheit; units=m for metric; units=s for scientific */
const units= 'f'

fetch( locationUrl ).then(( response ) => {
    response.json().then((data ) => {
        // console.log( data )
        
        if ( data.error ) {
            console.log( "ERROR: geocode: %s", error )
            return;
        } else if ( data.message !== undefined ) {
            console.log( "Info: data.message: %s", data.message )
            return;
        } else if ( data.features.length === 0 ) {
            console.log( "ERROR: nothing found. data.features.length is 0" )
            return;
        } else {
            console.log( "Info: place_name %s", data.features[0].place_name )
            console.log( "Info: center: long=%d, lat=%d", data.features[0].center[0], data.features[0].center[1] )
            // console.log( data.features[0] )
            const weatherForecastUrl=
            'http://api.weatherstack.com/current?access_key=5f2497387693209da1ea913ffd41287d&query=' 
            + data.features[0].center[1] + ',' + data.features[0].center[0] + '&units=' + units;

            fetch( weatherForecastUrl ).then(( weatherResponse ) => {
                weatherResponse.json().then(( weatherData ) => {
                    if ( ! weatherData.error ) {
                        // console.log( "Info: weatherData is true" )
                        // console.log( "weatherData %O", weatherData )
                        if ( weatherData.success === undefined ) {
                            // weatherData.success is absent then all is good! a bit counter intuitive.
                            console.log( "Info: current temperature is %i and feels like %i", weatherData.current.temperature
                                , weatherData.current.feelslike )
                            console.log( "Info: weather descriptions: %o", weatherData.current.weather_descriptions )
                            
                        } else {
                            // weatherData.success is present then something went wrong!
                            console.log( "ERROR: %s", weatherData.error )
                            return;
                        }
                    } else {
                        console.log( 'ERROR: weatherData.error is true' )
                        console.log( 'weatherData.error %o', weatherData.error )
                        return;
                    }
                })
            })
        }
        
    })
})


