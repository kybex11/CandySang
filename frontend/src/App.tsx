import { useEffect, useState } from 'react';
import { Renderer } from './core/renderer';
import Menu from './core/visual/Menu';

export default function App() {
    const [isGameShow, setIsGameShow] = useState<boolean>(false);
    const [isMenuShow, setIsMenuShow] = useState<boolean>(true);

    useEffect(() => {
        const container = document.getElementById('canvas-container');
        if (container && isGameShow) {
            const renderer = new Renderer();
            
            renderer.initializePlayer(container);
        }
    }, [isGameShow]);

    const handleStartGame = () => {
        setIsMenuShow(false);
        setIsGameShow(true);
    };

    return (
        <>
            {isMenuShow && <Menu onStartGame={handleStartGame} />}
            {isGameShow && (
                <div id="canvas-container"></div>
            )}
        </>
    );
}