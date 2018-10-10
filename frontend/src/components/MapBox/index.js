import React, { Component } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";

class MapBox extends Component {
  componentDidMount() {
    mapboxgl.accessToken = this.props.token;
    const zoom = this.props.zoom;
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [this.props.lng, this.props.lat],
      zoom
    });

    this.map.touchZoomRotate.disable();
    this.map.scrollZoom.disable();

    this.map.on("error", ({ error }) => {
      const { status } = error;
      if (status === 401) {
        return this.props.flushMapToken() || this.props.fetchMapToken();
      }
    });

    this.marker = new mapboxgl.Marker({
      draggable: true
    })
      .setLngLat([this.props.lng, this.props.lat])
      .addTo(this.map);

    this.allMarkers = this.props.nearby.map(({ id, lat, lon }) => {
      const el = document.createElement("div");
      el.setAttribute("id", id);
      return new mapboxgl.Marker(el).setLngLat([lon, lat]).addTo(this.map);
    });
    this.marker.on("dragstart", this.blockScrollToRefresh);
    this.marker.on("dragend", this.onDragEnd);
    this.props.callback();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.zoom !== this.props.zoom) {
      this.zoomTo(this.props.zoom);
    }
    if (prevProps.lng !== this.props.lng && prevProps.lat !== this.props.lat) {
      this.setCenter([this.props.lng, this.props.lat]);
    }
    if (prevProps.fetching === true && this.props.fetching === false) {
      this.allMarkers = this.props.nearby.map(({ id, lat, lon }) => {
        const el = document.createElement("div");
        el.setAttribute("id", id);
        return new mapboxgl.Marker(el).setLngLat([lon, lat]).addTo(this.map);
      });
      this.props.callback();
    }

    return null;
  }

  zoomTo = zoom => this.map.zoomTo(zoom, { duration: 1000 });

  setCenter = center => {
    this.map.setCenter(center);
    this.marker.setLngLat(center);
  };

  preventDefault = e => {
    return e && e.preventDefault();
  };

  blockScrollToRefresh = () => {
    return window.addEventListener("touchmove", this.preventDefault, {
      passive: false
    });
  };

  onDragEnd = () => {
    const { lng, lat } = this.marker.getLngLat();
    window.removeEventListener("touchmove", this.preventDefault, {
      passive: false
    });
    return this.props.setCurrentPosition(lat, lng);
  };

  componentWillUnmount() {
    this.map.remove();
    this.marker.remove();
    this.allMarkers.map(marker => marker.remove());
  }

  render() {
    const style = {
      position: "absolute",
      top: 0,
      bottom: 0,
      width: "100%",
      zIndex: -10
    };

    return <div style={style} ref={el => (this.mapContainer = el)} />;
  }
}

export default MapBox;
