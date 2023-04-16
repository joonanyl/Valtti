import { BsStar, BsStarFill } from "react-icons/bs"

interface StarProps {
  filled: boolean
  onClick?: () => void
}

export default function Star({ filled, onClick }: StarProps) {
  return (
    <button onClick={onClick}>
      {filled ? <BsStarFill color="orange" /> : <BsStar color="orange" />}
    </button>
  )
}
