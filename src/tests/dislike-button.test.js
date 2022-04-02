/**
 * @file Implements tests for dislikes button
 */
import React from "react";
import {act, create} from "react-test-renderer";
import TuitStats from "../components/tuits/tuit-stats";

/**
 * Test the dislike stats can display correct number of dislikes
 */
test("render dislikes stats with static tuit correctly", () => {

    let stats = {replies:523,retuits:234, likes: 123, dislikes: 998};


    let tuitStats
    act(() => {
        tuitStats = create(
            <TuitStats
                tuit={{stats: stats}}/>
        );
    })

    const root = tuitStats.root;
    // eslint-disable-next-line testing-library/await-async-query
    const dislikesCounter = root.findByProps({className: 'ttr-stats-dislikes'});
    let dislikesText = dislikesCounter.children[0];
    expect(dislikesText).toBe('998')

});

/**
 * Test user can dislike a tuit and dislikes should be added by 1
 */
test("Increase dislikes & update component on click", () => {

    let stats = {replies:523,retuits:234, likes: 123, dislikes: 998};

    const dislikeTuit = () =>{
        act(() => {
            stats.dislikes++;
            tuitStats.update(
                <TuitStats
                    tuit={{stats: stats}}
                    dislikeTuit={() => {}}
                />)
        })

    }

    let tuitStats
    act(() => {
        tuitStats = create(
            <TuitStats
                dislikeTuit={dislikeTuit}
                tuit={{stats: stats}}/>
        )
    })

    const root = tuitStats.root;
    // eslint-disable-next-line testing-library/await-async-query
    const dislikeCounter = root.findByProps({className: 'ttr-stats-dislikes'});
    // eslint-disable-next-line testing-library/await-async-query
    const dislikeButton = root.findByProps({className:'ttr-dislike-tuit-click'});

    let dislikesText = dislikeCounter.children[0];
    expect(dislikesText).toBe('998');

    act(()=>{
        dislikeButton.props.onClick()
    })

    dislikesText = dislikeCounter.children[0];
    expect(dislikesText).toBe('999');

});

/**
 * Test can un-dislike the tuit after dislike the tuit and the dislikes should be deducted by 1
 */
test("decrease dislikes & update component on click after dislike a tuit", async () => {

    let stats = {replies: 523, retuits: 234, likes: 123, dislikes: 998};

    const dislikeTuit = () => {
        act(() => {
            stats.dislikes--;
            tuitStats.update(
                <TuitStats
                    tuit={{stats: stats}}
                    dislikeTuit={() => {}}
                />)
        })

    }

    let tuitStats
    act(() => {
        tuitStats = create(
            <TuitStats
                dislikeTuit={dislikeTuit}
                tuit={{stats: stats}}/>
        )
    })

    const root = tuitStats.root;
    // eslint-disable-next-line testing-library/await-async-query
    const dislikeCounter = root.findByProps({className: 'ttr-stats-dislikes'});
    // eslint-disable-next-line testing-library/await-async-query
    const dislikeButton = root.findByProps({className: 'ttr-dislike-tuit-click'});

    let dislikesText = dislikeCounter.children[0];
    expect(dislikesText).toBe('998');

    await act(() => {
        dislikeButton.props.onClick()
    })

    dislikesText = dislikeCounter.children[0];
    expect(dislikesText).toBe('997');

});