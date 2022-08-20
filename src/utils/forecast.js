'use strict'

const request= require( 'request' )


/* units=f for farenheit; units=m for metric; units=s for scientific */
const forecast= ( long= 0, lat= 0, units= 'f', callback ) => {

const url=
'http://api.weatherstack.com/current?access_key=5f2497387693209da1ea913ffd41287d&query=' + lat + ',' + long + '&units=' + units;

console.log( 'Info: forecast url %s', url )
request({url: url, json: true }, (error, response) => {
    /* ***
    const data= JSON.parse( response.body)
    console.log( data )
    console.log( data.current )
    *** */
    if ( error ) {
        // console.log( 'ERRORR: cannot connect to api.weatherstack.com' )
        // console.log( 'ERROOR: %s', error )
        callback( 'cannot connect to api.weatherstack.com', undefined )
    } else {
        if ( response.body ) {
            // console.log( "Info: response.body is true" )
            // console.log( "response.body %O", response.body )
            if ( response.body.success === undefined ) {
                // response.body.success is absent then all is good! a bit counter intuitive.
                // console.log( "Info: current temperature is %i and feels like %i", response.body.current.temperature
                //     , response.body.current.feelslike )
                // for ( var i= 0; i < response.body.current.weather_descriptions.length; i++ ) {
                //     console.log( "Info: description %s", response.body.current.weather_descriptions[i])
                // }
                callback( undefined, response.body.current )
            } else {
                // response.body.success is present then something went wrong!
                // console.log( "ERROR: %s", response.body.error )
                callback( response.body.error, undefined )
            }
        } else {
            // console.log( 'ERROR: response.body is false' )
            // console.log( 'response %o', response )
            callback( response, undefined )
        }
    }
})
}


// calling module must use two level name
// module.exports= {
//     forecast: forecast
// }

// calling module can use one level name
module.exports= forecast

