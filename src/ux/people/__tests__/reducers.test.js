import deepFreeze from 'deep-freeze'

import {
    GET,
    DELETE,
    SUCCESS,
    FAILURE } from 'api/actions'

import {
    PEOPLE } from '../actions'

import {
    ids,
    page } from '../reducers'

describe('ids', () => {

    var testAction = (method, status, data, error) => ({
        type: PEOPLE,
        method,
        status,
        data,
        error
    })

    it('compiles a list of ids from a successful GET response', () => {
        const existingState = []
        const responseData = {
            items: [
                { id: '58982f1930f193383f952a4f' },
                { id: '58982f1930f193383f952a4b' },
                { id: '58982f1930f193383f952a47' }
            ]}
        const newAction = testAction(GET, SUCCESS, responseData)
        const expected = [
            '58982f1930f193383f952a4b',
            '58982f1930f193383f952a4f',
            '58982f1930f193383f952a47'].sort()
        const result = ids(existingState, newAction).sort()
        expect(result).toEqual(expected)
    })

    it('replaces existing list of ids with ids from a successful GET response', () => {
        const existingState = [
            '58a553f930f1932fbe837f72',
            '58a553f930f1932fbe837f73',
            '58a553f930f1932fbe837f74']
        const responseData = {
            items: [
                { id: '58a553f930f1932fbe837f7b' },
                { id: '58a553f930f1932fbe837f7a' }
            ]}
        const newAction = testAction(GET, SUCCESS, responseData)
        const expected = [
            '58a553f930f1932fbe837f7b',
            '58a553f930f1932fbe837f7a'].sort()
        const result = ids(existingState, newAction).sort()
        expect(result).toEqual(expected)
    })

    it('returns default state if response method is not GET', () => {
        const existingState = [
            '58a553f930f1932fbe837f72',
            '58a553f930f1932fbe837f73',
            '58a553f930f1932fbe837f74'].sort()
        const newAction = testAction(DELETE, SUCCESS)
        const result = ids(existingState, newAction)
        expect(result).toEqual([])
    })

    it('returns previous state if response status is not SUCCESS', () => {
        const existingState = [
            '58a553f930f1932fbe837f72',
            '58a553f930f1932fbe837f73',
            '58a553f930f1932fbe837f74'].sort()
        const newAction = testAction(GET, FAILURE, undefined, { code: 404 })
        const result = ids(existingState, newAction).sort()
        expect(result).toEqual(existingState)
    })
})

describe('page', () => {

    it('returns 0 if skip is less than limit', () => {
        const newAction = {
            type: PEOPLE,
            method: GET,
            status: SUCCESS,
            data: {
                items: [],
                limit: 100,
                skip: 0
            }
        }
        const result = page(undefined, newAction)
        expect(result).toEqual(0)
    })

    it('returns positive value if skip is equal to or greater than limit', () => {
        const newAction = {
            type: PEOPLE,
            method: GET,
            status: SUCCESS,
            data: {
                items: [],
                limit: 100,
                skip: 200
            }
        }
        const result = page(undefined, newAction)
        expect(result).toEqual(2)
    })

    it('returns integer value if skip is not wholy divisible by limit', () => {
        const newAction = {
            type: PEOPLE,
            method: GET,
            status: SUCCESS,
            data: {
                items: [],
                limit: 100,
                skip: 123
            }
        }
        const result = page(undefined, newAction)
        expect(result).toEqual(1)
    })
})