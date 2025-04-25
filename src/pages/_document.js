import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* DEFAULT Meta */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Diet Tracker" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        {/* CUSTOM Meta */}
        <meta name="application-name" content="Diet Tracker" />
        <meta name="description" content="No-fuss diet tracking with big buttons, big font, and a big graph. " />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
