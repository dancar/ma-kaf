import React from 'react'
import Terminal from './Terminal'

test('generateStringFrames', () => {
  const frames = new Terminal({content: []}).generateFrames(["hello"])
  expect(frames).toEqual([ [ 'h' ], [ 'he' ], [ 'hel' ], [ 'hell' ], [ 'hello' ] ])
})

test('Terminal constructes two string objects correctly', () => {
  const frames = new Terminal({content: []}).generateFrames(["ab", "c"])
  expect(frames).toEqual([  [ 'a' ], [ 'ab' ], [ 'ab', 'c']])
})
