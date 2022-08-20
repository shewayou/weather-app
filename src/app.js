console.log( '__dirname %s', __dirname)
console.log( '__filename %s', __filename)

const path= require( 'path')
const express= require( 'express')
const app= express()
const hbs= require( 'hbs' )
const geocode= require( './utils/geocode.js' )
const forecast= require( './utils/forecast.js' )


// Setup location for static contents
const publicDirectory= path.join( __dirname, '../public')
app.use( express.static( publicDirectory ))
console.log( 'publicDirectory %s', publicDirectory )

// Setup handlebar, hbs, for views dynamic contents
const viewsPath= path.join( __dirname, '../templates-replacing-views/views')
app.set( 'view engine', 'hbs' )
app.set( 'views', viewsPath )
console.log( 'viewsPath %s', viewsPath )

// Setup handlebar partials for views dynamic contents
const partialsPath= path.join( __dirname, '../templates-replacing-views/partials')
hbs.registerPartials( partialsPath )
console.log( 'partialsPath %s', partialsPath )


app.listen( 3000, () => {
    console.log( 'server starting on port 3000')
})





app.get( '', ( req, res ) => {
    res.render( 'index', { h1_title: 'Weather 1', author_name: 'Hsiwei Yu' })
})

app.get( '/about', ( req, res ) => {
    res.render( 'about', { h1_title: 'About 2', author_name: 'Hsiwei A Yu' })
})

app.get( '/help', ( req, res ) => {
    let host_datetime= Date().toString()
    console.log( 'host_datetime: %s', host_datetime )
    res.render( 'help'
    , { helpText: host_datetime
        , h1_title: 'Help 3'
        , author_name: 'Hsiwei H Yu' })
})

app.get( '/weather', ( req, res ) => {
    console.log( "Info: received user query data" )
    console.log( req.query )
    Object.keys( req.query ).forEach( (key, index ) => {
        console.log( "Info: key=%s value=%o", key, req.query[key])
    })
    
    if ( ! req.query.address ) {
        return res.send( { error: "ERROR: address is absent but required" })
    }
    let units
    if ( req.query.units ) {
        units= req.query.units
    }

    geocode( req.query.address, ( error, { place_name, center }= {} ) => {
        if ( error ) {
            // console.log( "ERROR: geocode: %o", error )
            return res.send( { error: error } )
        } else {
        // note center is array [ long, lat ]
        console.log( "Info: place_name=%s long=%d lat=%d", place_name, center[0], center[1] )
        forecast( center[0], center[1], units, ( error, { temperature, feelslike: feelslike_temperature, weather_descriptions }= {} ) => {
            if ( error ) {
                // console.error( 'ERROR: forecast: %o', error )
                return res.send( { error: error })
            } else {
                // console.log( ++seqNo )
                let respInfo={ location: place_name, temperature: temperature, feelslike_temperature: feelslike_temperature
                    , weather_descriptions: weather_descriptions }
                console.log( respInfo )
                console.log( "temperature: %i, feelslike: %i, descriptions: %O", temperature
                , feelslike_temperature, weather_descriptions )
                res.send( respInfo )
                // console.log( ++seqNo )
            }
        })  // end of forecast( )
        // console.log( ++seqNo )
        }
    }) // end of geocode( )
    
    // console.log( ++seqNo )
})




app.get( '/help/*', (req, res ) => {
    // var help_topic= req.url.substr(1)
    // help_topic= help_topic.replace( '/', ' ')
    // console.log( 'req.url=%s', help_topic )
    
    res.render( 'page-not-found', { errorMessage: `Help topic ${req.url} NOT available yet.`
    , page_title: 'Help topic NOT available'
    , h1_title: 'Help topic NOT available'
    , author_name: 'Help documentation team' })
})

app.get( '*', (req, res ) => {
    // console.log( req )
    res.render( 'page-not-found', { errorMessage: `Resource ${req.url} NOT available yet.`
    , page_title: 'Resource NOT available'
    , h1_title: 'Resource NOT available'
    , author_name: 'Support team' })
})




