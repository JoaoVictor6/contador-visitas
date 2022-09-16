import NodeCache from "node-cache";
import { generateImage } from "../counterPanelCreator/index.js";

let oldCacheSize = 0
export const cache = new NodeCache({deleteOnExpire: false})

cache.addListener('addingAddress', () => {
  if(cache.stats.keys !== oldCacheSize){
    generateImage(cache.stats.keys)
    oldCacheSize = cache.stats.keys
    return
  }
})