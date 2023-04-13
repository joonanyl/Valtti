"use client"

type ToggleProps = {
  deletePost: () => void
  setToggle: (toggle: boolean) => void
}

// TO BE REPLACED: DaisyUI Modal

export default function Toggle({ deletePost, setToggle }: ToggleProps) {
  return (
    <div
      onClick={(e) => setToggle(false)}
      className="fixed bg-black/50 w-full h-full z-20 left-0 top-0">
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <h2>Are you sure you want to delete this listing?</h2>
        <h3 className="text-red-600 text-sm">
          Deleting a service listing will remove all associated order data. Post
          deletion cannot be undone.
        </h3>
        <button
          onClick={deletePost}
          className="bg-red-600 text-sm text-white py-2 px-4 rounded-md">
          Delete
        </button>
      </div>
    </div>
  )
}
