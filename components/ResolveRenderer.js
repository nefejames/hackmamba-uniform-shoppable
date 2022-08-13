import { DefaultNotImplementedComponent } from "@uniformdev/canvas-react";

import ShoppableVideo from "./ShoppableVideo";

const mappings = {
  shoppablevideo: ShoppableVideo,
};

export function resolveRenderer(component) {
  const componentImpl = mappings[component.type];
  return componentImpl ? componentImpl : DefaultNotImplementedComponent;
}

export default mappings;
