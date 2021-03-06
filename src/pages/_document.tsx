import type { ReactElement } from "react"
import type { DocumentContext, DocumentInitialProps } from "next/document"
import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return { ...initialProps }
  }

  render(): ReactElement {
    return (
      <Html lang="ko">
        <Head>
          <meta property="og:image" content="/link_image.png" />
          <meta property="og:title" content="슬램" />
          <meta name="description" content="우리 주변 농구장을 빠르게" />
          <meta property="og:description" content="우리 주변 농구장을 빠르게" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
          />
          <script
            defer
            type="text/javascript"
            src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&autoload=false&libraries=services`}
          />
          <script
            defer
            src="https://developers.kakao.com/sdk/js/kakao.min.js"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
