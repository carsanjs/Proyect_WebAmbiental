import Login from "../../../../components/login/Signin";
import { PublicRoute } from "../../../../components/route/PublicRoute";

export default function Page() {
  return (
    <PublicRoute>
      <Login></Login>
    </PublicRoute>
  );
}
