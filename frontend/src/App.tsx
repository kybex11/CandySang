import { useEffect, useState } from 'react';
import { Renderer } from './core/renderer';

export default function App() {
    const [isGameShow, setIsGameShow] = useState<boolean>(false);
    const [isMenuShow, setIsMenuShow] = useState<boolean>(true);

    useEffect(() => {
        const container = document.getElementById('canvas-container');
        if (container && isGameShow) {
            new Renderer(container);
        }
    }, [isGameShow]);

    return (
        <>
            {isMenuShow && (
                <div>
                    <h1>Menu</h1>
                    <button onClick={() => { setIsMenuShow(false); setIsGameShow(true); }}>Start Game</button>
                </div>
            )}
            {isGameShow && (
                <div id="canvas-container"></div>
            )}
        </>
    );
}