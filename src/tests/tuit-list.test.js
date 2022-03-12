import {Tuits} from "../components/tuits/index";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

//jest.mock('axios');

const MOCKED_USERS = [
    {username: 'alice', password: 'lv426', email: 'alice@weyland.com', _id: "123"},
    {username: 'bob', password: 'illbeback', email: 'bob@bigjeff.com', _id: "234"},
]

const MOCKED_TUITS = [
    {tuit: "alice's tuit", postedBy: "123", _id: "1212"},
    {tuit: "bob's tuit2", postedBy: "234", _id: "2323"}
];

test('tuit list renders static tuit array', () => {
  render(
      <HashRouter>
        <Tuits tuits={MOCKED_TUITS}/>
      </HashRouter>);

  const linkElement1 = screen.getByText(/alice's tuit/i);
  const linkElement2 = screen.getByText(/bob's tuit2/i);

  expect(linkElement1).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();

});

test('tuit list renders async', async () => {
    const tuits = await findAllTuits();
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);
    const linkElement = screen.getByText(/Lorem Ipsum is simply dummy text of the printing and typesetting industry/i);
    expect(linkElement).toBeInTheDocument();
})

test('tuit list renders mocked', async () => {
    const mock = jest.spyOn(axios, 'get');
    mock.mockImplementation(() =>
        Promise.resolve({ data: {tuits: MOCKED_TUITS} }));
      const response = await findAllTuits();
      const tuits = response.tuits;
    mock.mockRestore();

      render(
        <HashRouter>
          <Tuits tuits={tuits}/>
        </HashRouter>);

    const tuit1 = screen.getByText(/alice's tuit/i);
    const tuit2 = screen.getByText(/bob's tuit2/i);

    expect(tuit1).toBeInTheDocument();
    expect(tuit2).toBeInTheDocument();
});
