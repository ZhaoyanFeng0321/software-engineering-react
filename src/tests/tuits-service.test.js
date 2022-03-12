import {
    findAllTuits, findTuitById,
    createTuit, deleteTuit, deleteTuitsByTuit
} from "../services/tuits-service";

import {
    createUser,
    deleteUsersByUsername
} from "../services/users-service";

describe('can create tuit with REST API', () => {
    const mockUser = {
        username: 'userrr',
        password: '123456',
        email: 'userrr@email.com'
    };

    const post1 = {
        tuit: 'simply dummy text.'
    };
    // setup the tests before verification
    beforeAll(() => {
        // insert the sample user we then try to remove
        deleteUsersByUsername(mockUser.username);
        return deleteTuitsByTuit(post1.tuit);
    });

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        deleteTuitsByTuit(post1.tuit);
        return deleteUsersByUsername(mockUser.username);
    })

    test('can create tuit with REST API', async () => {
        // insert new user in the database
        const user = await createUser(mockUser);
        const newTuit = await createTuit(user._id, post1);
        // verify inserted tuit's properties match parameter tuit
        expect(newTuit.tuit).toEqual(post1.tuit);
    });
});

describe('can delete tuit with REST API', () => {
    const mockUser = {
        username: 'userrr',
        password: '123456',
        email: 'userrr@email.com'
    };
    const post1 = {
        tuit: 'simply dummy text.'
    };

    // setup the tests before verification
    beforeAll(async () => {
        // insert the sample tuit we then try to remove
        return deleteTuitsByTuit(post1.tuit);
    });

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        deleteTuitsByTuit(post1.tuit);
        return deleteUsersByUsername(mockUser.username);
    });

    test('can delete tuit with REST API', async () => {
        // delete a user by their tuit id.
        const user = await createUser(mockUser);
        const newTuit = await createTuit(user._id, post1);
        const status = await deleteTuit(newTuit._id);
        // verify we deleted at least one tuit
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
    const mockUser = {
        username: 'userrr',
        password: '123456',
        email: 'userrr@email.com'
    };

    // sample tuit we'll insert to then retrieve
    const post1 = {
        tuit: 'simply dummy text.'
    };

    const testId = {
        tid: ""
    };

    // setup data before test
    beforeAll(async() => {
        const user = await createUser(mockUser);
        const newTuit = await createTuit(user._id, post1);
        testId.tid = newTuit._id;
    });

    // clean up after ourselves
    afterAll(() => {
             // delete the tuits we inserted
        deleteTuitsByTuit(post1.tuit);
        return deleteUsersByUsername(mockUser.username);
    });

    test('can retrieve a tuit by their primary key with REST API', async () => {
        // retrieve all the tuits
        const target = await findTuitById(testId.tid);
        expect(target.tuit).toEqual(post1.tuit);
    });
});

describe('can retrieve all tuits with REST API', () => {
    const mockUser = {
        username: 'userrr',
        password: '123456',
        email: 'userrr@email.com'
    };
    // sample tuit we'll insert to then retrieve
    const tuits = [
        "mockpostcontent1", "mockpostcontent2", "mockpostcontent3"
    ];

    // setup data before test

    beforeAll(async() => {
        const user = await createUser(mockUser);
          tuits.map(t =>
            createTuit(user._id, {
                tuit: t
               })
          )}
    );

    // clean up after ourselves
    afterAll(() => {
        // delete the tuits we inserted
         tuits.map(tuit => deleteTuitsByTuit(tuit));
         return deleteUsersByUsername(mockUser.username);
     }
    );

    test('can retrieve all tuits with REST API', async () => {
        // retrieve all the tuits
        const allTuits = await findAllTuits();

        // there should be a minimum number of tuits
        expect(allTuits.length).toBeGreaterThanOrEqual(tuits.length);

        // let's check each tuit we created
        const tuitsWeInserted = allTuits.filter(
            t => tuits.indexOf(t.tuit) >= 0);

        // compare the actual tuits in database with the ones we sent
        tuitsWeInserted.forEach(t => {
            const tt = tuits.find(tt => tt === t.tuit);
            expect(t.tuit).toEqual(tt);
        });
    });
});
