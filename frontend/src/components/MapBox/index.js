import React, { Component } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";

class MapBox extends Component {
  componentDidMount() {
    mapboxgl.accessToken = this.props.token;
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [this.props.lng, this.props.lat],
      zoom: 13
    });

    this.map.scrollZoom.disable();

    this.marker = new mapboxgl.Marker()
      .setLngLat([this.props.lng, this.props.lat])
      .addTo(this.map);

    this.allMarkers = this.props.nearby.map(({ id, lat, lon }) => {
      const el = document.createElement("div");
      el.setAttribute("id", id);
      return new mapboxgl.Marker(el).setLngLat([lon, lat]).addTo(this.map);
    });
    this.props.callback();
  }

  componentWillUnmount() {
    this.map.remove();
    this.marker.remove();
    this.allMarkers.remove();
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
