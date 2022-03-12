import React from "react";
import TuitStats from "./tuit-stats";
import TuitImage from "./tuit-image";
import TuitVideo from "./tuit-video";

const Tuit = ({tuit, deleteTuit}) => {
    return(
        <li>
            <img src={`../images/${tuit.postedBy.username}.jpg`}/>
            <div className="w-100">
                <i onClick={() => deleteTuit(tuit._id)}></i>
                <h2>
                    {tuit.postedBy.username}
                    @{tuit.postedBy.username} -
                </h2>
                {tuit.tuit}
                {
                    tuit.youtube &&
                    <TuitVideo tuit={tuit}/>
                }
                {
                    tuit.image &&
                    <TuitImage tuit={tuit}/>
                }
                <TuitStats tuit={tuit}/>
            </div>
        </li>
    );
}
export default Tuit;