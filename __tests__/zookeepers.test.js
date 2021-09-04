const fs = require("fs");
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require("../lib/zookeepers.js");
const { zookeepers } = require("../data/zookeepers");

jest.mock('fs');

test("creates a zookeeper object", () => {
  const zookeeper = createNewZookeeper(
    { name: "Darlene", id: "jhgdja3ng2" },
    zookeepers
  );

  expect(zookeeper.name).toBe("Darlene");
  expect(zookeeper.id).toBe("jhgdja3ng2");
});

test("filters by query", () => {
  const startingZookeepers = [
    {
        id: "2",
        name: "Isabella",
        age: 67,
        favoriteAnimal: "bear"
    },
    {
        id: "3",
        name: "Linda",
        age: 48,
        favoriteAnimal: "otter"
    }
  ];

  const updatedZookeepers = filterByQuery({ age: 67 }, startingZookeepers);

  expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
  const startingZookeepers = [
    {
        id: "2",
        name: "Isabella",
        age: 67,
        favoriteAnimal: "bear"
    },
    {
        id: "3",
        name: "Linda",
        age: 48,
        favoriteAnimal: "otter"
    }
  ];

  const result = findById("3", startingZookeepers);

  expect(result.name).toBe("Linda");
});

test("validates favorite animal", () => {
  const zookeeper = {
    id: "3",
    name: "Linda",
    age: 48,
    favoriteAnimal: "otter"
};

  const invalidZookeeper = {
    id: "3",
    name: "Linda",
    age: 48
};

  const result = validateZookeeper(zookeeper);
  const result2 = validateZookeeper(invalidZookeeper);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});