interface MenuProps {
    onStartGame: () => void; // Define the type for onStartGame
}

export default function Menu({ onStartGame }: MenuProps) {
    return (
        <div>
            <h1>Menu</h1>
            <button onClick={onStartGame}>Start Game</button>
        </div>
    );
}