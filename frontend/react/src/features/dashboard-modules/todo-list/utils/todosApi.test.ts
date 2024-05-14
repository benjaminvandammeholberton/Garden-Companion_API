import MockAdapter from "axios-mock-adapter";
import { getTodosApi, deleteToDoApi } from "./todosApi";
import axiosInstance from "../../../../api/axios";

const mock = new MockAdapter(axiosInstance);

describe("getTodosApi", () => {
  afterEach(() => {
    mock.reset();
  });

  it("fetches todos successfully", async () => {
    const mockResponse = [
      { id: 1, title: "Todo 1" },
      { id: 2, title: "Todo 2" },
    ];
    mock.onGet("/api/v1/todo/").reply(200, mockResponse);

    const todos = await getTodosApi();
    expect(todos).toEqual(mockResponse);
  });

  it("throws error when fetching todos fails", async () => {
    mock.onGet("/api/v1/todo/").reply(500);

    await expect(getTodosApi()).rejects.toThrow("can't fetch todos");
  });
});

describe("deleteToDoApi", () => {
  afterEach(() => {
    mock.reset();
  });

  it("deletes todo successfully", async () => {
    const id = "123";
    mock.onDelete(`/api/v1/todo/${id}`).reply(204);

    await expect(deleteToDoApi(id)).resolves.toBeUndefined();
  });

  it("throws error when deletion fails", async () => {
    const id = "123";
    mock.onDelete(`/api/v1/todo/${id}`).reply(500);
    await expect(deleteToDoApi(id)).rejects.toThrow("Can't delete todo");
  });
});
