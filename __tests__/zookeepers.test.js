const { filterByQuery, findById, createNewZookeeper, validateZookeeper } = require('../lib/zookeepers');
const fs = require('fs');
const { zookeepers } = require('../data/zookeepers.json');
const { test, expect } = require('@jest/globals');
const { validate } = require('@babel/types');

jest.mock('fs');

test('find zookeeper by Id', () => {
    const zookeepers = [
        {
            "id": "0",
            "name": "Kim",
            "age": 28,
            "favoriteAnimal": "dolphin"
            },
            {
            "id": "1",
            "name": "Raksha",
            "age": 31,
            "favoriteAnimal": "penguin"
            },
    ]
    const result = findById('0', zookeepers);

    expect(result.name).toBe('Kim');
});

test('filters by query', () => {
    const zookeepers = [
        {
            "id": "0",
            "name": "Kim",
            "age": 28,
            "favoriteAnimal": "dolphin"
            },
            {
            "id": "1",
            "name": "Raksha",
            "age": 31,
            "favoriteAnimal": "penguin"
            },
    ]
    const result = filterByQuery({ age: '31' }, zookeepers);

    expect(result.length).toEqual(1);
});

test('creates a new zookeeper', () => {
    const zookeeper = createNewZookeeper({
        "id": "15",
        "name": "Zakh",
        "age": 24,
        "favoriteAnimal": "kangaroo",
    }, zookeepers);

    expect(zookeeper.name).toBe('Zakh');
    expect(zookeeper.age).toEqual(24);
});

test('validates favorite animal', () => {
    const result = validateZookeeper({
        "id": "0",
        "name": "Kim",
        "age": 28,
        "favoriteAnimal": "dolphin"
    });
    const result2 = validateZookeeper({
        "id": "0",
        "name": "Kim",
        "age": 28,
        "favoriteAnimal": ""
    });

    expect(result).toBe(true);
    expect(result2).toBe(false);
})
