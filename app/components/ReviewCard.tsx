"use client"

import {
  Avatar,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import Star from "./Star"

type ReviewCardProps = {
  id: string
  userImage: string
  userName: string
  createdAt: string
  content: string
  rating: number
}

export default function ReviewCard({
  id,
  userImage,
  userName,
  createdAt,
  content,
  rating,
}: ReviewCardProps) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    }

    return date.toLocaleDateString(navigator.language, options)
  }

  const starDisplay = [1, 2, 3, 4, 5].map((value) => (
    <Star key={value} filled={value <= rating} />
  ))

  return (
    <Stack
      boxShadow={"lg"}
      w={{ base: "80%", lg: "50%" }}
      p={8}
      rounded={"lg"}
      bg={useColorModeValue("gray.50", "gray.700")}>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={4}
        align={"center"}>
        <Avatar src={userImage} name={"avatar"} />
        <Stack direction={"column"} spacing={0} fontSize={"sm"}>
          <Text fontWeight={600}>{userName}</Text>
          <Text color={"gray.500"}>{formatDate(createdAt)}</Text>
        </Stack>
        <Stack direction={{ base: "column" }}>
          <HStack>{starDisplay}</HStack>
          <Text ml={{ md: 4 }} fontWeight={500}>
            {content}
          </Text>
        </Stack>
      </Stack>
    </Stack>
  )
}
