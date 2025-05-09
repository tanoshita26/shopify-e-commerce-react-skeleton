import React, { memo, useState } from "react"
import { useSpring, a } from "react-spring"
import { usePrevious, useMeasure } from "./helpers"
import { Frame, Title, Content, toggle } from "./styles"

interface AccordionItem {
  children?: React.ReactNode
  name: string
  defaultOpen?: boolean
}

const Accordion = memo(
  ({ children, name, defaultOpen = false }: AccordionItem) => {
    const [isOpen, setOpen] = useState(defaultOpen)
    const previous = usePrevious(isOpen)
    const [bind, { height: viewHeight }]: any = useMeasure()
    const { height, opacity, transform } = useSpring({
      from: { height: 0, opacity: 0, transform: "translate3d(20px,0,0)" },
      to: {
        height: isOpen ? viewHeight : 0,
        opacity: isOpen ? 1 : 0,
        transform: `translate3d(${isOpen ? 0 : 20}px,0,0)`,
      },
    })

    return (
      <Frame>
        <a
          role="button"
          style={{ ...toggle, opacity: children ? 1 : 0.3 }}
          onClick={() => setOpen(!isOpen)}
        >
          <Title>{name}</Title>
        </a>
        <Content
          style={{
            opacity,
            height: isOpen && previous === isOpen ? "auto" : height,
          }}
        >
          <a.div style={{ transform }} {...bind} children={children} />
        </Content>
      </Frame>
    )
  }
)

export default Accordion
