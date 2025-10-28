const Hobbit = require('./hobbits-model')
const db = require('../../data/dbConfig')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

test('[1] Sanity Check - Env is Testing', () => {
    expect(process.env.NODE_ENV).toBe('testing')
})

describe('getAll', () => {
    test('[2] getAll() resolves all the hobbits in the table', async () => {
        const result = await Hobbit.getAll()
        expect(result).toHaveLength(4)
        expect(result[0]).toMatchObject({ name: 'sam'})
        expect(result[1]).toMatchObject({ name: 'frodo'})
        expect(result[2]).toMatchObject({ name: 'pippin'})
        expect(result[3]).toMatchObject({ name: 'merry'})
    })
})

describe('getById', () => {
    test('[3] getById(id) resolves the hobbit in the table at the specified id', async () => {
        let result = await Hobbit.getById(1)
        expect(result).toMatchObject({ name: 'sam'})
        result = await Hobbit.getById(2)
        expect(result).toMatchObject({ name: 'frodo'})
        result = await Hobbit.getById(3)
        expect(result).toMatchObject({ name: 'pippin'})
        result = await Hobbit.getById(4)
        expect(result).toMatchObject({ name: 'merry'})
    })
})

describe('insert', () => {
    const bilbo = { name: 'bilbo'}
    test('[4] insert(hobbit) resolves the new hobbit', async () => {
        const result = await Hobbit.insert(bilbo)
        expect(result).toMatchObject(bilbo)
    })
    test('[5] adds the hobbit to the hobbits table', async () => {
        await Hobbit.insert(bilbo)
        const records = await db('hobbits')
        expect(records).toHaveLength(5)
    })
})

describe('update', () => {
    test('[6] update(id, changes) updates the hobbit with the given id and resolves the changed hobbit', async () => {
        const updated = await Hobbit.update(3, {name: 'larry'})
        expect(updated).toMatchObject({ name: 'larry'})
    })
})

describe('remove', () => {
    test('[7] remove(id) removes the hobbit with the given id from the database and returns the deleted hobbit', async () => {
        await Hobbit.remove(2)
        const records = await db('hobbits')
        expect(records).toHaveLength(3)
    })
})

