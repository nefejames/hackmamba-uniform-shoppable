import dynamic from "next/dynamic";
import getConfig from "next/config";
import format from "format-duration";
const { publicRuntimeConfig } = getConfig();

export default function ShoppableVideo({ component }) {
  const DynamicVideo = dynamic(() => import("./VideoPlayer"), {
    ssr: false,
  });

  const cta = component.parameters.cta.value;
  const { publicId } = component.parameters.cloudinary.value[0];
  const cloudname = publicRuntimeConfig.cloudname;

  let products = [];

  if (component.slots?.chapters) {
    products = component.slots.chapters.map((chapter) => {
      const { id, name, price, image } = chapter.parameters.product.value;
      console.log(chapter.parameters.product.value);
      const clickAction = { args: {} };
      if (chapter.parameters.clickAction.value === "goToProduct") {
        clickAction.action = "goto";
        clickAction.pause = true;
        clickAction.args.url = `${publicRuntimeConfig.storefront}/${name}`;
      } else {
        clickAction.action = "seek";
        clickAction.pause = true;
        clickAction.args.time = format(
          1000 * chapter.parameters.startTime.value,
          { leading: true }
        );
      }

      const hotspots = [];
      if (chapter?.slots?.hotspots) {
        const { time, tooltipposition, x, y } =
          chapter.slots.hotspots[0].parameters;

        hotspots.push({
          time: format(1000 * time.value, { leading: true }),
          x: `${x.value}%`,
          y: `${y.value}%`,
          tooltipPosition: tooltipposition.value,
          clickUrl: `${publicRuntimeConfig.storefront}/${name}`,
        });
      }

      const result = {
        productId: id,
        productName: `${name} - $${price}`,
        startTime: Number(chapter.parameters.startTime.value),
        endTime: Number(chapter.parameters.endTime.value),
        publicId: image,
        onClick: clickAction,
      };
      //`https://res.cloudinary.com/${cloudname}/image/fetch/q_auto,f_auto/${image}`
      console.log(result);

      if (hotspots.length > 0) {
        result.hotspots = hotspots;
      }

      return result;
    });
  }

  const options = {
    video: publicId,
    cta,
    cloudname,
    products,
  };

  return (
    <>
      <DynamicVideo {...options} />
    </>
  );
}
