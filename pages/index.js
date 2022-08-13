import Head from "next/head";

import { CanvasClient, enhance } from "@uniformdev/canvas";
import { Composition, Slot } from "@uniformdev/canvas-react";
import { enhancers } from "../enhancers";
import { resolveRenderer } from "../components/ResolveRenderer";

export default function IndexPage({ composition }) {
  return (
    <div>
      <Head>
        <title>Shoppable Video with Cloudinary, Uniform and BigCommerce</title>
      </Head>

      <Composition data={composition} resolveRenderer={resolveRenderer}>
        <Slot name="components" />
      </Composition>
    </div>
  );
}

export async function getStaticProps() {
  const client = new CanvasClient({
    apiKey: process.env.UNIFORM_API_KEY,
    projectId: process.env.UNIFORM_PROJECT_ID,
  });

  const { composition } = await client.getCompositionBySlug({
    slug: "/",
  });

  await enhance({
    composition,
    enhancers,
    context: {},
  });

  return {
    props: {
      composition,
    },
  };
}
