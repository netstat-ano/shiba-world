import { useState } from 'react';
import Game from './components/Game/Game';
import Authentication from './components/Authentication/Authentication';
function App() {
    const [user, setUser] = useState();
    return (
        <div className="App">
            {!user && <Authentication setUser={setUser}/>}
            {user && (
                <>
                    <Game />
                </>
            )}
        </div>
    );
}

export default App;
