// Instead of directly initializing these constants, wrap them in a function
function getWebsocketInfo() {
    const url = new URL(typeof window !== 'undefined' ? window.location.href : 'http://defaulturl.com');
    const params = new URLSearchParams(url.search);
  
    return {
      WEBSOCKET_ENDPOINT: params.get("collabEndpoint") || "ws://localhost:1234",
      WEBSOCKET_ID: params.get("collabId") || "0"
    };
  }
  
  export function createWebsocketProvider(id, yjsDocMap) {
    let doc = yjsDocMap.get(id);
  
    if (doc === undefined) {
      doc = new Doc();
      yjsDocMap.set(id, doc);
    } else {
      doc.load();
    }
  
    const { WEBSOCKET_ENDPOINT, WEBSOCKET_ID } = getWebsocketInfo();
  
    // @ts-ignore
    return new WebsocketProvider(
      WEBSOCKET_ENDPOINT,
      "playground" + "/" + WEBSOCKET_ID + "/" + id,
      doc,
      {
        connect: false
      }
    );
  }
  