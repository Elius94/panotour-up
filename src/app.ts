import { Viewer } from '@photo-sphere-viewer/core';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import { VirtualTourPlugin } from '@photo-sphere-viewer/virtual-tour-plugin';
import { GalleryPlugin } from '@photo-sphere-viewer/gallery-plugin';
import { LensflarePlugin } from 'photo-sphere-viewer-lensflare-plugin';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/markers-plugin/index.css';
import '@photo-sphere-viewer/gallery-plugin/index.css';

const viewer = new Viewer({
    container: document.querySelector('#viewer') as HTMLElement,
    caption: 'Up Urban Climbing <b>&copy; 2023</b>',
    touchmoveTwoFingers: true,
    mousewheelCtrlKey: true,
    defaultYaw: '130deg',
    navbar: 'zoom move gallery caption fullscreen',
    plugins: [
        MarkersPlugin,
        [GalleryPlugin, {
            thumbnailSize: { width: 100, height: 100 },
        }],
        [VirtualTourPlugin, {
            positionMode: 'gps',
            renderMode: '3d',
        }],
        LensflarePlugin
    ]
});

const virtualTour = viewer.getPlugin(VirtualTourPlugin) as VirtualTourPlugin;
const lensflare = viewer.getPlugin(LensflarePlugin) as LensflarePlugin;

virtualTour.addEventListener('node-changed', ({ node }) => {
    console.log(`Current node is ${node.id}`);
    switch (node.id) {
        case '1':
            lensflare.setLensflares([
                {
                    id: 'sun',
                    position: { yaw: '145deg', pitch: '2deg' },
                    type: 0,
                }
            ]);
            break;
        case '2':
            lensflare.setLensflares([
                {
                    id: 'sun',
                    position: { yaw: '145deg', pitch: '2deg' },
                    type: 0,
                },
                {
                    id: 'moon',
                    position: { yaw: '30.6deg', pitch: '41.2deg' },
                    color: { h: 0.6, s: 0.5, l: 0.2 },
                }
            ]);
            break;
        case '3':
            lensflare.setLensflares([]);
            break;
        case '4':
            lensflare.setLensflares([]);
            break;
        case '5':
            lensflare.setLensflares([]);
            break;
        case '6':
            lensflare.setLensflares([]);
            break;
        default:
            lensflare.setLensflares([]);
            break;
    }
});

virtualTour.setNodes([
    {
        id: '1',
        panorama: 'images/torre_est.JPG',
        thumbnail: 'images/torre_est.JPG',
        name: 'Torre (est)',
        links: [
            { nodeId: '2' }
        ],
        gps: [44.50396161405211, 11.404367415507782],
        panoData: { poseHeading: 100 } as any,
    },
    {
        id: '2',
        panorama: 'images/torre_ovest.JPG',
        thumbnail: 'images/torre_ovest.JPG',
        name: 'Torre Ovest',
        links: [
            { nodeId: '6' },
            { nodeId: '4' },
            { nodeId: '1' }
        ],
        gps: [44.50409864245173, 11.404218029872105],
        panoData: { poseHeading: 170 },
    },
    {
        id: '3',
        panorama: 'images/interno_1.JPG',
        thumbnail: 'images/interno_1.JPG',
        name: 'Palestra Interna (1)',
        links: [
            { nodeId: '4' },
            { nodeId: '5' }
        ],
        gps: [44.503875718274784, 11.404077473221383],
        panoData: { poseHeading: 328 },
    },
    {
        id: '4',
        panorama: 'images/interno_2.JPG',
        thumbnail: 'images/interno_2.JPG',
        name: 'Palestra Interna (2)',
        links: [
            { nodeId: '3' },
            { nodeId: '5' },
            { nodeId: '2' }
        ],
        gps: [44.50393116931159, 11.404115299016564],
        panoData: { poseHeading: 78 },
    },
    {
        id: '5',
        panorama: 'images/interno_3.JPG',
        thumbnail: 'images/interno_3.JPG',
        name: 'Palestra Interna (3)',
        links: [
            { nodeId: '6' },
            { nodeId: '4' }
        ],
        gps: [44.503963443732424, 11.403965357751147],
        panoData: { poseHeading: 190 },
    },
    {
        id: '6',
        panorama: 'images/area_training.JPG',
        thumbnail: 'images/area_training.JPG',
        name: 'Area Training',
        links: [
            { nodeId: '5' },
            { nodeId: '2' }
        ],
        gps: [44.5040143176, 11.403956445523963],
        panoData: { poseHeading: 328 },
    },
], '2');