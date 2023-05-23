import { prisma } from "~/lib/db"

async function getUsers({ size, page }: { size: number, page: number }) {
  const skip = (page - 1) * size
  const users = await prisma.user.findMany({
    take: size,
    skip
  })
  return users
}

export default async function Home({ searchParams }: {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}) {
  const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
  console.log({ page })
  const users = await getUsers({
    size: 10,
    page 
  })
  console.log(users)
  return (
    <h1>home page: {users.length}</h1>
  )
}
