var favicons = require( 'favicons' ),
    fs = require('fs'),
    source = 'favicon.png',
    imagePath = './images',
    manifestPath = './manifest'
    configuration = {
      appName: 'Favicon Generator',   // Your application's name. `string`
      appDescription: null,           // Your application's description. `string`
      developerName: null,            // Your (or your developer's) name. `string`
      developerURL: null,             // Your (or your developer's) URL. `string`
      background: '#001f3f',          // Background colour for flattened icons. `string`
      path: '/',                      // Path for overriding default icons path. `string`
      url: '/',                       // Absolute URL for OpenGraph image. `string`
      display: 'standalone',          // Android display: 'browser' or 'standalone'. `string`
      orientation: 'portrait',        // Android orientation: 'portrait' or 'landscape'. `string`
      version: '1.0',                 // Your application's version number. `number`
      logging: false,                 // Print logs to console? `boolean`
      online: false,                  // Use RealFaviconGenerator to create favicons? `boolean`
      icons: {
        android: true,                // Create Android homescreen icon. `boolean`
        appleIcon: true,              // Create Apple touch icons. `boolean`
        appleStartup: true,           // Create Apple startup images. `boolean`
        coast: true,                  // Create Opera Coast icon. `boolean`
        favicons: true,               // Create regular favicons. `boolean`
        firefox: true,                // Create Firefox OS icons. `boolean`
        opengraph: true,              // Create Facebook OpenGraph image. `boolean`
        twitter: true,                // Create Twitter Summary Card image. `boolean`
        windows: true,                // Create Windows 8 tile icons. `boolean`
        yandex: true                  // Create Yandex browser icon. `boolean`
      }
    },
    callback = ( error, response ) => {
      if ( error ) {
        console.log(error.status);    // HTTP error code (e.g. `200`) or `null`
        console.log(error.name);      // Error name e.g. 'API Error'
        console.log(error.message);   // Error description e.g. 'An unknown error has occurred'
      }
      fs.mkdir( imagePath, ( error ) => {
        if ( error ) {
          // console.log( 'Error' );
        }
        response.images.forEach( file => {
          fs.writeFile( imagePath + '/' + file.name, file.contents );
        } );
      });
      fs.mkdir( manifestPath, ( error ) => {
        if ( error ) {
          // console.log( 'Error' );
        }
        response.files.forEach( file => {
          fs.writeFile( manifestPath + '/' + file.name, file.contents );
        } );
      });
      fs.writeFile( configuration.appName + '.html', response.html.join('\n') );
    };


return favicons( source, configuration, callback );