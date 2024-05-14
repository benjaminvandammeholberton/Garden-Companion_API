import {
  sortByDateAscending,
  sortByDateDescending,
  sortByNameAscending,
  sortByNameDescending,
  sortByStatusAscending,
  sortByStatusDescending,
  sortByPriorityAscending,
  sortByPriorityDescending,
} from "./sortFunctions";

const mockData = [
  {
    title: "Task 1",
    created_at: "2024-05-06T12:00:00Z",
    updated_at: "2024-05-06T12:00:00Z",
    status: false,
    priority: false,
    todo_id: "1",
  },
  {
    title: "Task 2",
    created_at: "2024-05-05T12:00:00Z",
    updated_at: "2024-05-05T12:00:00Z",
    status: true,
    priority: true,
    todo_id: "2",
  },
  {
    title: "Task 3",
    created_at: "2024-05-07T12:00:00Z",
    updated_at: "2024-05-07T12:00:00Z",
    status: false,
    priority: false,
    todo_id: "3",
  },
];

test("sortByDateAscending sorts tasks by date in ascending order", () => {
  const sortedData = sortByDateAscending(mockData);
  expect(sortedData[0].created_at).toBe("2024-05-05T12:00:00Z");
  expect(sortedData[1].created_at).toBe("2024-05-06T12:00:00Z");
  expect(sortedData[2].created_at).toBe("2024-05-07T12:00:00Z");
});
test("sortByDateDescending sorts tasks by date in descending order", () => {
  const sortedData = sortByDateDescending(mockData);
  expect(sortedData[2].created_at).toBe("2024-05-05T12:00:00Z");
  expect(sortedData[1].created_at).toBe("2024-05-06T12:00:00Z");
  expect(sortedData[0].created_at).toBe("2024-05-07T12:00:00Z");
});
test("sortByNameAscending sorts tasks by title in ascending order", () => {
  const sortedData = sortByNameAscending(mockData);
  expect(sortedData[0].title).toBe("Task 1");
  expect(sortedData[1].title).toBe("Task 2");
  expect(sortedData[2].title).toBe("Task 3");
});
test("sortByNameDescending sorts tasks by title in descending order", () => {
  const sortedData = sortByNameDescending(mockData);
  expect(sortedData[2].title).toBe("Task 1");
  expect(sortedData[1].title).toBe("Task 2");
  expect(sortedData[0].title).toBe("Task 3");
});
test("sortByStatusAscending sorts tasks by status in ascending order", () => {
  const sortedData = sortByStatusAscending(mockData);
  expect(sortedData[2].status).toBe(true);
  expect(sortedData[1].status).toBe(false);
  expect(sortedData[1].status).toBe(false);
});
test("sortByStatusDescending sorts tasks by status in descending order", () => {
  const sortedData = sortByStatusDescending(mockData);
  expect(sortedData[0].status).toBe(true);
  expect(sortedData[1].status).toBe(false);
  expect(sortedData[2].status).toBe(false);
});
test("sortByPriorityAscending sorts tasks by priority in ascending order", () => {
  const sortedData = sortByPriorityAscending(mockData);
  expect(sortedData[0].status).toBe(true);
  expect(sortedData[1].status).toBe(false);
  expect(sortedData[2].status).toBe(false);
});
test("sortByPriorityDescending sorts tasks by priority in descending order", () => {
  const sortedData = sortByPriorityDescending(mockData);
  expect(sortedData[2].status).toBe(true);
  expect(sortedData[1].status).toBe(false);
  expect(sortedData[0].status).toBe(false);
});
