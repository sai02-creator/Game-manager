function GameList(props) {
    const games = props.games;
    return( <div className="games-grid">{games.map((game,key) => (
        <div key={key} className="game-card">
            <h3>{game.name}</h3>
            <p>{game.platform}</p>
            <p>{game.genre}</p>
        </div>
    ))}
    </div>
    );
}

export default GameList;