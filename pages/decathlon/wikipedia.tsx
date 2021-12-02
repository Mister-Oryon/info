import { Box, HStack, Link, Stack, VStack } from '@chakra-ui/layout'
import { VtmnButton } from '@vtmn/react'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'

const Wikipedia: NextPage = () => {
  const [sports, setSports] = useState([])

  useEffect(() => {
    async function fetchDecathlonData() {
      const request = await fetch(`https://sports.api.decathlon.com/sports`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      const responseJSON = await request.json()

      // Errors handling
      if (responseJSON !== undefined) {
        setSports((sports) => responseJSON.data)
        console.log(responseJSON.data)
        return
      }
    }

    fetchDecathlonData()
  }, [])
  return (
    <Stack>
      {/**{sports.map((sport) => <Link>{sport.attributes!.name}</Link>)}*/}
    </Stack>
  )
}

export default Wikipedia
