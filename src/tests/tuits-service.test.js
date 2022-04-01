import {createUser, deleteUsersByUsername} from "../services/users-service";
import {createTuit, deleteTuit, deleteTuitsByUser, findAllTuits, findTuitById} from "../services/tuits-service";

describe('can create tuit with REST API', () => {
    // sample user to insert
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    // sample tuit to insert
    const testTuit = {
        tuit: "Hello! This is a test",
        postedBy: ""
    }

    // setup test before running test
    beforeAll(async () => {
        // remove any/all users to make sure we create it in the test
        await deleteUsersByUsername(ripley.username);
        const user = await createUser(ripley);
        testTuit.postedBy = user._id;
        return deleteTuitsByUser(testTuit.postedBy);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        deleteTuitsByUser(testTuit.postedBy);
        return deleteUsersByUsername(ripley.username);
    })

    test('can insert new tuits with REST API', async () => {
        // insert new user in the database
        const newTuit = await createTuit(testTuit.postedBy, testTuit);

        // verify inserted tuit's properties match parameter user
        expect(newTuit.tuit).toEqual(testTuit.tuit);
    });
});

describe('can delete tuit wtih REST API', () => {
    // sample user to insert
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    // sample tuit to insert
    const testTuit = {
        tuit: "Hello! This is a test",
        postedBy: ""
    }

    // setup test before running test
    beforeAll(async () => {
        // remove any/all users to make sure we create it in the test
        await deleteUsersByUsername(ripley.username);
        const user = await createUser(ripley);
        testTuit.postedBy = user._id;
        return deleteTuitsByUser(testTuit.postedBy);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        deleteTuitsByUser(testTuit.postedBy);
        return deleteUsersByUsername(ripley.username);
    })

    test('can delete tuits with REST API', async () => {
        // insert new user in the database
        const newTuit = await createTuit(testTuit.postedBy, testTuit);
        const deleteStatus = await deleteTuit(newTuit._id);


        // verify delete tuit's status
        expect(deleteStatus.deletedCount).toBeGreaterThanOrEqual(1);
    });


});

describe('can retrieve a tuit by their primary key with REST API', () => {
    // sample user to insert
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    // sample tuit to insert
    const testTuit = {
        tuit: "Hello! This is a test",
        postedBy: ""
    }

    // setup test before running test
    beforeAll(async () => {
        // remove any/all users to make sure we create it in the test
        await deleteUsersByUsername(ripley.username);
        const user = await createUser(ripley);
        testTuit.postedBy = user._id;
        return deleteTuitsByUser(testTuit.postedBy);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        deleteTuitsByUser(testTuit.postedBy);
        return deleteUsersByUsername(ripley.username);
    })

    test('can find tuits with REST API', async () => {
        // insert new user in the database
        const newTuit = await createTuit(testTuit.postedBy, testTuit);
        const findTuit = await findTuitById(newTuit._id);

        // verify delete tuit's status
        expect(findTuit.tuit).toEqual(newTuit.tuit);
    });

});

describe('can retrieve all tuits with REST API', () => {
    // sample users we'll insert to then retrieve
    const tuits = [
        "test1", "test2", "test3"
    ];

    // sample user to insert
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    let user = '';

    // setup data before test
    beforeAll(async () => {
        await deleteUsersByUsername(ripley.username);
        user = await createUser(ripley);
        // insert several known users
        tuits.map(tuit => createTuit(user._id,{
            tuit: tuit,
            postedBy:user._id
        })
        )}
    );
    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        deleteTuitsByUser(user._id);
        return deleteUsersByUsername(ripley.username);
    });

    test('can find all tuits with REST API', async () => {
        // insert new user in the database
        const allTuits = await findAllTuits();

        // there should be a minimum number of users
        expect(tuits.length).toBeGreaterThanOrEqual(allTuits.length);

        // let's check each user we inserted
        const tuitsWeInserted = allTuits.filter(
            tuit => tuits.indexOf(tuit.tuit) >= 0);

        // compare the actual users in database with the ones we sent
        tuitsWeInserted.forEach(tuit => {
            const tuitContent = tuits.find(tuitContent => tuitContent === tuit.tuit);
            expect(tuitContent).toEqual(tuitContent);
        });
    });
});