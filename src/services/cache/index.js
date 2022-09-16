import NodeCache from "node-cache";
import { generateImage } from "../counterPanelCreator/index.js";

export const cache = new NodeCache({deleteOnExpire: false})

cache.addListener('addingAddress', () => {
  generateImage(cache.stats.keys)
})
