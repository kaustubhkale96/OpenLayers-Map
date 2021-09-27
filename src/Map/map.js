import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Map from "ol/Map";
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import * as proj from 'ol/proj';
import { Overlay } from 'ol';
import "./map.css";
import Geocoder from "ol-geocoder"

const posIndia = proj.fromLonLat([78.9629, 20.5937])



export default class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = { center: posIndia, zoom: 5 };

        this.map = new Map({
            target: null,
            layers: [
                new TileLayer({
                    source: new OSM(),
                    // source: new XYZ({    
                    //     attributions: 'Copyright:© 2013 ESRI, i-cubed, GeoEye',
                    //     url: 'https://services.arcgisonline.com/arcgis/rest/services/' +
                    //         'ESRI_Imagery_World_2D/MapServer/tile/{z}/{y}/{x}',
                    //     projection: 'EPSG:4326',
                    //     tileSize: 512, // the tile size supported by the ArcGIS tile service
                    //     maxResolution: 180 / 512, // Esri's tile grid fits 180 degrees on one 512 px tile
                    //     wrapX: true,
                    // })
                })
            ],
            view: new View({
                center: this.state.center,
                zoom: this.state.zoom,
            }),

            // controls: []
        });
        console.log("map", this.map)
    }


    componentDidMount() {
        this.map.setTarget("map");
        var geocoder = new Geocoder('nominatim', {
            provider: 'osm',
            lang: 'en',
            placeholder: 'Search for ...',
            limit: 5,
            debug: false,
            autoComplete: true,
            keepOpen: true
        });
        this.map.addControl(geocoder);


        geocoder.on('addresschosen', function (evt) {
            console.info(evt);
            window.setTimeout(function () {
                // this.popup.show(evt.coordinate, evt.address.formatted);
            }, 3000);
        });
        // Map Changes
        // this.map.on("movend", () => {
        //     let center = this.map.getView().getCenter();
        //     let zoom = this.map.getView().getZoom();
        //     this.setState({ center, zoom });
        // });

        // Basic Overlay
        // const overlay = new Overlay({
        //     position: posIndia,
        //     element: ReactDOM.findDOMNode(this).querySelector("#overlay"),
        //     postioning: "center-center",
        //     stopEvent: false,
        // })
        // this.map.addOverlay(overlay);

        // Popup Showing position user clicked
        // this.popup = new Overlay({
        //     element: ReactDOM.findDOMNode(this).querySelector("#popup")
        // });

        // Listener to add Popup overlay
        // this.map.on("click", evt => {
        //     this.popup.setPosition(evt.coordinate);
        //     this.map.addOverlay(this.popup);
        // })
    }




    componentWillUnmount() {
        this.mapsetTarget(null);
    }
    render() {
        return (
            <div>
                <div>
                    <h1>OpenLayers Maps</h1>
                </div>
                <div className="map-container">
                    <div className="map" id="map"></div>
                    {/* <div className="blue-circle" id="overlay" title="overlay" /> */}
                    {/* <div className="blue-circle" id="popup" title="Welcome to Maps" /> */}
                </div>
            </div>
        )
    }
}
