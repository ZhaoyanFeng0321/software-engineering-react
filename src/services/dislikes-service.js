
import axios from "axios";

const BASE_URL = "http://localhost:4000"
const USERS_API = `${BASE_URL}/api/users`;
const TUITS_API = `${BASE_URL}/api/tuits`;

const api = axios.create({
    withCredentials: true
});

/**
 * Find all tuits that disliked by a user
 * @param userId user's id
 * @return {Promise<AxiosResponse<any>>} a list of tuits
 */
export const findAllTuitsDislikedByUser = (userId) =>
    api.get(`${USERS_API}/${userId}/dislikes`)
        .then(response => response.data);
/**
 * find all users that dislike a tuit
 * @param tid tuit id
 * @return {Promise<AxiosResponse<any>>} a list of users
 */
export const findAllUsersThatDislikedTuit = (tid) =>
    api.get(`${TUITS_API}/${tid}/dislikes`)
        .then(response => response.data);

/**
 * Records a user dislikes a tuit
 * @param uid user id
 * @param tid tuit id
 * @return {Promise<AxiosResponse<any>>} a status if dislike object created or not
 */
export const userDislikesTuit = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data);

/**
 * Retrieves if a user dislikes a tuit or not
 * @param uid user id
 * @param tid tuit id
 * @return {Promise<AxiosResponse<any>>} a boolean value wrap in json format
 */
export const isUserDislikeTuit = (uid, tid) =>
    api.get(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data);