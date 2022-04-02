import Tuits from "../tuits";
import * as service from "../../services/dislikes-service";
import {useEffect, useState} from "react";

const MyDislikes = () => {
    const [dislikedTuits, setDislikedTuis] = useState([]);
    const findTuitsIDislike = async () => {
        const findDislikedTuits = await service.findAllTuitsDislikedByUser("me");
        setDislikedTuis(findDislikedTuits);
        }
    useEffect(findTuitsIDislike, []);
    
    return(
        <div>
            <Tuits tuits={dislikedTuits} refreshTuits={findTuitsIDislike}/>
        </div>
    );
};
export default MyDislikes;