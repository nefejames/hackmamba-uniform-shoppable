import { compose, EnhancerBuilder } from "@uniformdev/canvas";
import {
  CLOUDINARY_PARAMETER_TYPES,
  cloudinaryEnhancer,
} from "@uniformdev/canvas-cloudinary";

import {
  createBigCommerceClient,
  createBigCommerceEnhancer,
  CANVAS_BIGCOMMERCE_PARAMETER_TYPES,
} from "@uniformdev/canvas-bigcommerce";

export const bigCommerceClient = createBigCommerceClient({
  storeHash: process.env.BIGCOMMERCE_STORE_HASH,
  token: process.env.BIGCOMMERCE_API_TOKEN,
});

export const bigCommerceEnhancer = () =>
  createBigCommerceEnhancer({
    client: bigCommerceClient,
    createProductOptions: () => {
      return {
        include_fields: ["id", "name", "price"],
      };
    },
  });

export const bigCommerceModelCleaner = ({ parameter }) => {
  const { id, name, images, price } = parameter.value;

  parameter.value = {
    id,
    name,
    price,
    image: images[0].url_standard,
  };

  return parameter.value;
};

export const enhancers = new EnhancerBuilder()
  .parameterType(CLOUDINARY_PARAMETER_TYPES, cloudinaryEnhancer)
  .parameterType(
    CANVAS_BIGCOMMERCE_PARAMETER_TYPES,
    compose(bigCommerceEnhancer(), bigCommerceModelCleaner)
  );
