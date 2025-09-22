
function CreateGame() {
    return<div className="page-container">
        <h2>Add A New Game</h2>
        <form className="form-container bg-card" style={{padding: "1rem"}}>
            <label> Game Name </label>
            <input placeholder="E.g. Super Mario"/>

               <label> Platform </label>
            <input placeholder="E.g. Switch, PC"/>

               <label> Genre </label>
            <input placeholder="E.g. RPG, Action, Puzzle"/>

            <button type="submit"> Create</button>
        </form>
    </div>
} 

export default CreateGame;