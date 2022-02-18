import { useState } from "react";
import Game from "./components/Game/Game";
import styles from "./App.module.scss";
import Authentication from "./components/Authentication/Authentication";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faArrowRight,
    faHandPaper,
    faHandRock,
    faHandScissors,
    faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { faBone } from "@fortawesome/free-solid-svg-icons";
import { faTint } from "@fortawesome/free-solid-svg-icons";
function App() {
    const [user, setUser] = useState();
    const [gameMode, setGameMode] = useState(false);
    library.add(
        faArrowLeft,
        faArrowRight,
        faDollarSign,
        faBone,
        faTint,
        faHandRock,
        faHandScissors,
        faHandPaper,
        faCircle
    );
    return (
        <div className={gameMode ? styles["app-game-mode"] : styles.app}>
            {!user && <Authentication setUser={setUser} />}
            {user && (
                <>
                    <Game gameMode={gameMode} setGameMode={setGameMode} />
                </>
            )}
        </div>
    );
}

export default App;
