import React from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";

function MapBox({
  callback,
  nearby,
  zoom,
  token,
  lng,
  lat,
  flushMapToken,
  fetchMapToken,
  setCurrentPosition
}) {
  const map = React.useRef();
  const mapContainer = React.useRef();
  const marker = React.useRef();
  const allMarkers = React.useRef();

  const blockScrollToRefresh = React.useCallback(() => {
    return window.addEventListener("touchmove", (e) => e.preventDefault(), {
      passive: false
    });
  }, []);

  const onDragEnd = React.useCallback(() => {
    const { lng, lat } = marker.current.getLngLat();
    window.removeEventListener("touchmove", (e) => e.preventDefault(), {
      passive: false
    });
    return setCurrentPosition(lat, lng);
  }, [setCurrentPosition]);

  const initMap = React.useRef({ lng, lat, zoom });

  React.useEffect(() => {
    console.count("mapbox setup");

    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [initMap.current.lng, initMap.current.lat],
      zoom: initMap.current.zoom
    });

    map.current.touchZoomRotate.disable();
    map.current.scrollZoom.disable();

    const currentMap = map.current;

    return () => currentMap.remove();
  }, [token]);

  React.useEffect(() => {
    if (map.current) {
      map.current.on("error", ({ error }) => {
        const { status } = error;
        if (status === 401) {
          flushMapToken();
          fetchMapToken();
        }
      });
    }
  }, [flushMapToken, fetchMapToken]);

  React.useEffect(() => {
    console.count("main marker setup");
    if (map.current) {
      if (!marker.current) {
        marker.current = new mapboxgl.Marker({
          draggable: true
        });
        marker.current.on("dragstart", blockScrollToRefresh);
        marker.current.on("dragend", onDragEnd);
      }

      marker.current.setLngLat([lng, lat]).addTo(map.current);

      const currentMarker = marker.current;

      return () => currentMarker.remove();
    }
  }, [lat, lng, onDragEnd]);

  React.useEffect(() => {
    console.count("zoom adjust");
    if (map.current) {
      map.current.zoomTo(zoom, { duration: 1000 });
    }
  }, [zoom]);

  React.useEffect(() => {
    console.count("flyto setup");
    if (map.current) {
      const center = [lng, lat];
      map.current.flyTo({ center });
      marker.current.setLngLat(center);
    }
  }, [lng, lat]);

  React.useEffect(() => {
    console.count("stop markers setup");

    if (map.current) {
      allMarkers.current = nearby.map(({ id, lat, lon }) => {
        const el = document.createElement("div");
        el.setAttribute("id", id);
        return new mapboxgl.Marker(el).setLngLat([lon, lat]).addTo(map.current);
      });

      callback(nearby);
      const currentMarkers = allMarkers.current;

      const cleanUp = () => currentMarkers.map((marker) => marker.remove());

      return cleanUp;
    }
  }, [nearby, callback]);

  const style = {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "100%",
    zIndex: -10
  };

  return <div style={style} ref={mapContainer} />;
}

export default MapBox;
