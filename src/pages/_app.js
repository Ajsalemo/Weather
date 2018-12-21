// --------------------------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------------------------------- //

import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import CssBaseline from "@material-ui/core/CssBaseline";

// --------------------------------------------------------------------------------------------------------- //
// ---------------------- Used to override default styles to apply Google Roboto font----------------------- //
// ------ Reference: https://medium.com/@aduyng/build-a-spa-with-next-js-and-material-ui-26d2f5f35792 -------//

export default class Override extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  renderHead() {
    return (
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        />
      </Head>
    );
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        {this.renderHead()}
        <CssBaseline />
        <Component {...pageProps} />
      </Container>
    );
  }
}

// --------------------------------------------------------------------------------------------------------- //