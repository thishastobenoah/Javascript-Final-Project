import { useParams } from "react-router-dom";

export function Profile() {
  const { userId } = useParams<{ userId: string }>();
  return <div>User ID: {userId}</div>;
}
