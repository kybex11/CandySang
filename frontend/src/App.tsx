import React, { useEffect } from 'react';
import { Renderer } from './core/renderer';

export default function App() {
    useEffect(() => {
        const container = document.getElementById('canvas-container');
        if (container) {
            new Renderer(container);
        }
    }, []);

    return (
        <>
            <div id="canvas-container"></div>
        </>
    );
}