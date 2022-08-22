console.log( 'client side javascript file is loaded!')
// console.log( location )  // location is pre-existing

/* units=f for farenheit; units=m for metric; units=s for scientific */
/* ***
let units= 'f'
let address= 'leesburg va'
let weatherUrl= '/weather?address=' + encodeURIComponent( address ) + '&units=' + units
fetch( weatherUrl ).then(( response ) => {
    response.json().then((data ) => {
        console.log( data )
        
        if ( data.error ) {
            console.log( "%s", data.error )
            return;
        } else {
            console.log( "location: %s", data.location )
            console.log( "temperature: %i, feelslike: %i, descriptions: %O", data.temperature
            , data.feelslike_temperature, data.weather_descriptions )
        }
        
    })
})
*** */

const weatherForm= document.querySelector( 'form')

weatherForm.addEventListener( 'submit', ( event ) => {
    event.preventDefault()
    // let address= document.getElementById( 'inputID' ).value   // works great!
    // let units= document.getElementById('selectID' ).value
    // let address= document.querySelector( 'inputID' ).value   // works great!
    // let units= document.querySelector('selectID' ).value
    let address= document.querySelector( 'input' ).value   // works great!
    let units= document.querySelector('select' ).value
    console.log( 'location: %s', address )
    console.log( 'temperature unit: %s', units )
    // let address= document.querySelector( 'inputName' ).value    // Failed. FYI
    // let units= document.querySelector('selectName' ).value
    // let address= document.getElementById( 'inputName' ).value   // Failed. FYI
    // let units= document.getElementById('selectName' ).value

    // let message1= document.querySelector( ".class-name-abc")
    let message1= document.querySelector( "#message-1")
    let message2= document.querySelector( "#message-2")
    message1.textContent= 'Loading'
    message2.textContent= ''
    

    let weatherUrl= '/weather?address=' + encodeURIComponent( address ) + '&units=' + units
    fetch( weatherUrl ).then(( response ) => {
        response.json().then((data ) => {
            console.log( data )
            
            if ( data.error ) {
                console.log( "%O", data.error )
                message1.textContent= data.error
                return;
            } else {
                // console.log( "location: %s", data.location )
                message1.textContent= data.location

                // console.log( "temperature: %i, feelslike: %i, descriptions: %O", data.temperature
                //  , data.feelslike_temperature, data.weather_descriptions )
                message2.textContent= "temperature: " + data.temperature
                 + ", feelslike: " + data.feelslike_temperature 
                 + ", description: " + data.weather_descriptions[0]
                // message2.textContent= data  // Failed shows only [object Object]
            }
            
        })
    })
    

})
