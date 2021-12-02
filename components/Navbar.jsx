import React, { useState } from 'react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
function Navbar(props) {
  const [state, setState] = useState(false)
  return (
    <VStack>
      <Button
        colorScheme={props.color}
        onClick={() => setState((state) => !state)}
      >
        Button {state ? 'truc' : 'pas truc'}
      </Button>
    </VStack>
  )
}
export default Navbar
