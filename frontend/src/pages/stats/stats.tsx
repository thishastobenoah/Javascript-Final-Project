import UserStats from "../../components/UserStats/UserStats";
import { useUser } from "../../hooks/useUser";

export function Stats() {
  const {user} = useUser()
  console.log (user)
  if  (!user) return null
  return <div><UserStats userId={user.uid} /></div>;
}