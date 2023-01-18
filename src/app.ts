import { Viewer, PanoData } from '@photo-sphere-viewer/core';
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
    defaultZoomLvl: 1,
    plugins: [
        MarkersPlugin,
        [GalleryPlugin, {
            thumbnailSize: { width: 100, height: 100 },
        }],
        [VirtualTourPlugin, {
            positionMode: 'manual',
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
        case 'torre_est':
            lensflare.setLensflares([
                {
                    id: 'sun',
                    position: { yaw: '340deg', pitch: '18deg' },
                    type: 0,
                }
            ]);
            break;
        case 'area_training':
            lensflare.setLensflares([
                {
                    id: 'sun1',
                    position: { yaw: '200deg', pitch: '22deg' },
                    type: 0,
                },
                {
                    id: 'light1',
                    position: { yaw: '100deg', pitch: '65deg' },
                    type: 0,
                    color: {h:0, s: 0.4, l: 0.2}
                },
                {
                    id: 'light2',
                    position: { yaw: '340deg', pitch: '68deg' },
                    type: 0,
                    color: {h:0, s: 0.4, l: 0.2}
                }
            ]);
            break;
        case 'interno_1':
            lensflare.setLensflares([
                {
                    id: 'light1',
                    position: { yaw: '82deg', pitch: '55deg' },
                    type: 0,
                },
                {
                    id: 'light2',
                    position: { yaw: '130deg', pitch: '50deg' },
                    type: 0,
                }
            ]);
            break;
        case 'interno_2':
            lensflare.setLensflares([
                {
                    id: 'light1',
                    position: { yaw: '235deg', pitch: '40deg' },
                    type: 0,
                },
                {
                    id: 'light2',
                    position: { yaw: '305deg', pitch: '44deg' },
                    type: 0,
                }
            ]);
            break;
        case 'interno_3':
            lensflare.setLensflares([
                {
                    id: 'light1',
                    position: { yaw: '354deg', pitch: '52deg' },
                    type: 0,
                },
                {
                    id: 'light2',
                    position: { yaw: '295deg', pitch: '40deg' },
                    type: 0,
                },
                {
                    id: 'light3',
                    position: { yaw: '122deg', pitch: '56deg' },
                    type: 0,
                }
            ]);
            break;
        default:
            lensflare.setLensflares([]);
            break;
    }
});

virtualTour.setNodes([
    {
        id: 'torre_est',
        panorama: 'images/torre_est.JPG',
        thumbnail: 'images/thumbnails/torre_est.jpg',
        name: 'Torre (est)',
        links: [
            { nodeId: 'torre_ovest', position: { textureX: 6000, textureY: 5000 } },
            { nodeId: 'interno_2', position: { textureX: 1500, textureY: 5000 } },
        ],
        panoData: { poseHeading: 220 } as PanoData,
    },
    {
        id: 'torre_ovest',
        panorama: 'images/torre_ovest.JPG',
        thumbnail: 'images/thumbnails/torre_ovest.jpg',
        name: 'Torre (ovest)',
        links: [
            { nodeId: 'torre_est', position: { textureX: 9000, textureY: 5000 } },
            { nodeId: 'area_training', position: { textureX: 15500, textureY: 5000 } },
        ],
        panoData: { poseHeading: 210 } as PanoData,
    },
    {
        id: 'interno_1',
        panorama: 'images/interno_1.JPG',
        thumbnail: 'images/thumbnails/interno_1.jpg',
        name: 'Palestra Interna (1)',
        links: [
            { nodeId: 'interno_2', position: { textureX: 3000, textureY: 5000 } },
        ],
        panoData: { poseHeading: 320 } as PanoData,
    },
    {
        id: 'interno_2',
        panorama: 'images/interno_2.JPG',
        thumbnail: 'images/thumbnails/interno_2.jpg',
        name: 'Palestra Interna (2)',
        links: [
            { nodeId: 'interno_1', position: { textureX: 9500, textureY: 5000 } },
            { nodeId: 'interno_3', position: { textureX: 14000, textureY: 5000 } },
            { nodeId: 'torre_est', position: { textureX: 0, textureY: 5000 } },
        ],
        panoData: { poseHeading: 200 } as PanoData,
    },
    {
        id: 'interno_3',
        panorama: 'images/interno_3.JPG',
        thumbnail: 'images/thumbnails/interno_3.jpg',
        name: 'Palestra Interna (3)',
        links: [
            { nodeId: 'area_training', position: { textureX: 12000, textureY: 5000 } },
            { nodeId: 'interno_2', position: { textureX: 18000, textureY: 5000 } }
        ],
        panoData: { poseHeading: 190 } as PanoData,
    },
    {
        id: 'area_training',
        panorama: 'images/area_training.JPG',
        thumbnail: 'images/thumbnails/area_training.jpg',
        name: 'Area Training',
        links: [
            { nodeId: 'torre_ovest', position: { textureX: 10500, textureY: 5000 } },
            { nodeId: 'interno_3', position: { textureX: 3000, textureY: 5000 } },
        ],
        panoData: { poseHeading: 200 } as PanoData,
    },
], 'torre_est');
