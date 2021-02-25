const request = require("supertest");

const app = require("../app");

describe("GET route", () => {
  const expected = {
    "my-todo": [
      {
        priority: "3",
        date: "2021-02-17 18:56:24",
        text: "dfsf",
        isDone: false,
      },
      {
        text: "sac",
        date: "2021-02-15 21:12:59",
        priority: "1",
        isDone: false,
      },
      {
        priority: "3",
        date: "2021-02-17 21:24:22",
        text: "wsdf",
        isDone: false,
      },
      {
        priority: "4",
        date: "2021-02-18 17:12:19",
        text: "sdfds",
        isDone: false,
      },
    ],
    id: "tasks",
  };

  it("should return task by given id", async () => {
    const response = await request(app).get("/b/tasks");
    expect(response.status).toBe(200); // passes
    expect(response.body.id).toBe(expected.id);
  });

  it("should appropriate response and statues if id is wrong", async () => {
    const response = await request(app).get("/b/tas");
    expect(response.status).toBe(400);
    expect(response.res.statusMessage).toBe("Invalid Bin Id provided");
  });
});

describe("POST route", () => {
  const expectedPostMsg = {
    success: true,
  };
  const post = {
    name: "samuel",
    lastName: "gasasa",
  };
  const illegalPost = { message: "Bin can not be blank" };

  it("should post tasks by id", async () => {
    const response = await request(app).post("/b").send(post);
    expect(response.status).toBe(201); // passes
    const getResponse = await request(app).get(`/b/${response.body.id}`);
    expect(getResponse.body.success).toBe(expectedPostMsg.success);
  });

  it("should appropriate response and statues body illegal", async () => {
    const response = await request(app).post("/b").send("");
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(illegalPost.message);
  });
});

describe("PUT route", () => {
  const expectedPutMsg = {
    message: "Bin Id not found",
  };
  const put = {
    name: "yonatan",
    lastName: "gasasa",
  };
  const illegalPost = {};

  it("should update tasks by id and not create new one", async () => {
    const response = await request(app).put("/b/tasks").send(put);
    expect(response.status).toBe(201);
    expect(response.body).not.toBe(put);
  });

  it("should appropriate response and statues body illegal id", async () => {
    const response = await request(app).put("/b/asf").send(illegalPost);
    expect(response.status).toBe(400);
    expect(response.text).toBe('{"message":"Bin Id not found"}');
  });
});

// describe("DELETE route", () => {
//   it("should delete the task", async () => {
//     const response = await request(app).delete("/b/tasks");

//     expect(response.status).toBe(201);
//     console.log(response);
//   });
// });
