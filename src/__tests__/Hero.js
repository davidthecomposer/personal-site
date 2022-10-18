import React from "react"
import renderer from "react-test-renderer"
import { mockData } from "../../__mocks__/data"

import Hero from "sections/Music/Hero"

describe("Hero", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Hero data={mockData} mobile={false} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
