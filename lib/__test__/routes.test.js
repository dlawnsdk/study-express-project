const boardTest = require('../../routes/board')
const request = require('supertest')

test('board page redners', () => {

    const req = {}
    const res = { render: jest.fn() }

    request(boardTest).get('/board')
    expect(res.render.mock.calls.length).toBe(1)
    /*.then((res) => {
        expect(res.render.mock.calls.length).toBe(0)
    })*/
})