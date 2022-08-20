'use strict'

const request= require( 'request' )



const geocode= ( address, callback ) => {
const url_1= 'http://api.mapbox.com/geocoding/v5/mapbox.places/';
const access_token= 'access_token=pk.eyJ1IjoiaHNpd2VpN3l1IiwiYSI6ImNsNnJhanE2ajEybmczY3Izd2o0NDE0bTQifQ.ajJcfXQrZchQ2sa8sosylQ'
const addressSfx= '.json'
/*
address= 'atlanta'
address= '33-16 147th st flushing queens ny ny'
address= '22332 tees ter ashburn va'
address= '22328 tees ter bbburuu NN'
address= '22328 tees ter ashburn va'
address= ''
address= '13 janina ave edison nj'
*/
const url= url_1
+ encodeURIComponent( address ) + addressSfx
+ '?' + access_token
;
console.log( 'Info: geocode url %s', url )

request({url: url, json: true }, (error, response) => {
    /* ***
    const data= JSON.parse( response.body)
    console.log( data )
    console.log( data.current )
    *** */
    if ( error ) {
        // console.log( 'ERROOR: cannot connect to api.mapbox.com' )
        // console.log( 'ERROOR: %o', error )
        callback( 'ERROR: Cannot connect to api.mapbox.com', undefined );
    } else if ( response.body.message !== undefined ) {
        // console.log( "Info: Response.body.message: %O", response.body.message )
        callback( "ERROR: response.body.message is hell!" );
    } else if ( response.body.features.length === 0 ) {
        // console.log( "ERROR: nothing found. response.body.features.length is 0" )
        callback( "ERROR: Nothing found. response.body.features.length is 0" );
    } else {
        // console.log( "center: long=%d, lat=%d", response.body.features[0].center[0], response.body.features[0].center[1] )
        // console.log( response.body.features[0] )
        /* ***
        console.log(); console.log(); console.log( "features.length=%i ...", response.body.features.length )
        for ( var i= 0; i < response.body.features.length; i++ ) {
        for ( [ key, value ] of Object.entries( response.body.features[i])) {
            console.log( "%i: %s: %O", i, key, value )
        }
        }
        *** */
        callback( undefined, response.body.features[0] )
    }
}) // end of request( .. )
}



// module.exports = {
//     geocode: geocode
// }

module.exports= geocode

