import Tuits from "../components/tuits/index";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

const MOCKED_USERS = [
  {username: 'ellen_ripley', _id: "123"},
  {username: 'sarah_conor', _id: "234"},
];

const MOCKED_TUITS = [
  {tuit: "test 1", postBy: "123", _id: "1231"},
  {tuit: "test 2", postBy: "234", _id: "1232"},
  {tuit: "test 3", postBy: "234", _id: "1233"}
];

test('tuit list renders static tuit array', () => {
  render(
      <HashRouter>
        <Tuits tuits={MOCKED_TUITS}/>
      </HashRouter>
  )
  const linkElement1 = screen.getByText(/test 1/i);
  const linkElement2 = screen.getByText(/test 2/i);
  const linkElement3 = screen.getByText(/test 3/i);
  expect(linkElement1).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
  expect(linkElement3).toBeInTheDocument();
});

test('tuit list renders async', async () => {
  const tuits = await findAllTuits();
  render(
      <HashRouter>
        <Tuits tuits={tuits}/>
      </HashRouter>
  )
  const linkElement1 = screen.getByText(/bob's 1st tuit/i);
  const linkElement2 = screen.getByText(/bob's 3rd tuit/i);
  expect(linkElement1).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
})

test('tuit list renders mocked', async () => {
  const mock = jest.spyOn(axios, 'get');
  mock.mockImplementation(() =>
      Promise.resolve({data: {tuits: MOCKED_TUITS}}));
  const response = await findAllTuits();
  const tuits = response.tuits;

  render(
      <HashRouter>
        <Tuits tuits={tuits}/>
      </HashRouter>
  )
  const linkElement1 = screen.getByText(/test 1/i);
  const linkElement2 = screen.getByText(/test 2/i);
  const linkElement3 = screen.getByText(/test 3/i);
  expect(linkElement1).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
  expect(linkElement3).toBeInTheDocument();
});
