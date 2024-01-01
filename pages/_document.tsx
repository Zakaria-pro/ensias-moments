import Document, { Head, Html, Main, NextScript } from "next/document";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="ENSIAS Moments are not just captured in photographs; they are imprinted in the minds and hearts of a community that values the pursuit of knowledge, collaboration, and the pursuit of excellence."
          />
          <meta property="og:site_name" content="ensias-moments.vercel.app" />
          <meta
            property="og:description"
            content="ENSIAS Moments are not just captured in photographs; they are imprinted in the minds and hearts of a community that values the pursuit of knowledge, collaboration, and the pursuit of excellence."
          />
          <meta property="og:title" content="ENSIAS Moments" />
          {/* <meta name="twitter:card" content="summary_large_image" /> */}
          {/* <meta name="twitter:title" content="ENSIAS Moments" /> */}
          {/* <meta
            name="twitter:description"
            content="ENSIAS Moments are not just captured in photographs; they are imprinted in the minds and hearts of a community that values the pursuit of knowledge, collaboration, and the pursuit of excellence."
          /> */}
        </Head>
        <body className="bg-black antialiased">
          <Main />
          <NextScript />
          <SpeedInsights />
          <Analytics />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
