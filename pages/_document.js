import Document, { Head, Main, NextScript } from 'next/document'
import React from "react";

export default class extends Document {
  render() {
    /**
    * Here we use _document.js to add a "lang" propery to the HTML object if
    * one is set on the page.
    **/

    const metricaCode = ``;

    return (
      <html lang='en'>
        <Head>
            <link rel="shortcut icon" type="image/x-icon"   href="/static/favicon.ico"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="google-site-verification" content={process.env.GOOGLE_SITE_VERIFICATION || ''} />
            <meta name="yandex-verification" content={process.env.YANDEX_SITE_VERIFICATION || ''} />


            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
                  integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay"
                  crossOrigin="anonymous" />

            {/*Materialize */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />

        </Head>

        <body>
        {process.env.NODE_ENV === 'production' && <div dangerouslySetInnerHTML={{ __html: metricaCode }} />}
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}