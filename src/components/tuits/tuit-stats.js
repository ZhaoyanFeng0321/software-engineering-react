import React, {useEffect, useState} from "react";
import {profile} from "../../services/security-service";
import * as likeService from "../../services/likes-service";
import * as dislikeService from "../../services/dislikes-service";

const TuitStats = ({
                       tuit, likeTuit = () => {
    }, dislikeTuit = () => {
    }
                   }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);

    const initLike = async () => {
        const user = await profile();
        if (user) {
            const isLikeVal = await likeService.isUserLikeTuit("me", tuit._id);
            setIsLiked(isLikeVal.like);
            const isDislikeVal = await dislikeService.isUserDislikeTuit("me", tuit._id);
            setIsDisliked(isDislikeVal.dislike);
        }
    }

    useEffect(initLike, [tuit.stats]);

    return (
        <div className="row mt-2">
            <div className="col">
                <i className="far fa-message me-1"/>
                {tuit.stats && tuit.stats.replies}
            </div>
            <div className="col">
                <i className="far fa-retweet me-1"/>
                {tuit.stats && tuit.stats.retuits}
            </div>
            <div className="col">
                <span onClick={() => likeTuit(tuit)}>
              {
                  tuit.stats && isLiked === true &&
                  <i className="fa-solid fa-thumbs-up me-1" style={{color: 'orangered'}}/>
              }
                    {
                        tuit.stats && isLiked === false &&
                        <i className="fa-solid fa-thumbs-up me-1"/>
                    }
                    {tuit.stats && tuit.stats.likes}
                </span>
            </div>
            <div className="col">
                <span onClick={() => dislikeTuit(tuit)}>
              {
                  tuit.stats && isDisliked === true &&
                  <i className="fa-solid fa-thumbs-down me-1" style={{color: 'dodgerblue'}}/>
              }
                    {
                        tuit.stats && isDisliked === false &&
                        <i className="fa-solid fa-thumbs-down me-1"/>
                    }
                    {tuit.stats && tuit.stats.dislikes}
                </span>
            </div>
            <div className="col">
                <i className="far fa-inbox-out"/>
            </div>
        </div>
    );
}
export default TuitStats;