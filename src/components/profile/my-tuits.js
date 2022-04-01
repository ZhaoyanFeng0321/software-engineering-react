import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service";
import {profile} from "../../services/security-service";
import Tuits from "../tuits";

const MyTuits = () => {
    const [tuits, setTuits] = useState([]);
    const findMyTuits = async () => {
        const user = await profile();
        if (user) {
            console.log("find tuits for me")
            service.findTuitByUser("me")
                .then(tuits => setTuits(tuits));
        }
    }
    useEffect(findMyTuits, []);
    return(
        <Tuits tuits={tuits}
               refreshTuits={findMyTuits}/>
    );
};

export default MyTuits;