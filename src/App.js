import { useState } from 'react';
import BottomPanel from './components/BottomPanel/BottomPanel';
import Authentication from './components/Authentication/Authentication';
function App() {
    const [user, setUser] = useState();
    return (
        <div className="App">
            {!user && <Authentication setUser={setUser}/>}
            {user && (
                <>
                    <div style={{ marginTop: '100vw' }}>shiba-world</div>{' '}
                    <BottomPanel />
                </>
            )}
        </div>
    );
}

export default App;
