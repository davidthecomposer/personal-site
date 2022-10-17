import React from "react"
import renderer from "react-test-renderer"
import after from "images/after.webp"

import Hero from "sections/Music/Hero"

const mockData = [
  {
    title: "Fake Title",
    image: after,
    slug: "",
    buttonText: "Hear it now",
    news: "Some thing about the news",
    audio: "",
    video: "",
  },
]

describe("Hero", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Hero data={mockData} mobile={false} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
