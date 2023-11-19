import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { JWTRefreshAPI, setAccessToken, setRefreshToken } from "../API/API";
import { auth_toggle } from "../Plugins/Redux/Slices/AuthSlice/AuthSlice";
import { RootState } from "../Plugins/Redux/Store/Store";

export default function Revalidator() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authenticated = useSelector((state: RootState) => state.auth.value);
  const [rechecked, setRechecked] = useState(false);

  useEffect(() => {
    if (!authenticated && rechecked) {
      navigate("/");
      console.log("Not logged in");
    }
  }, [authenticated, navigate, rechecked]);

  useEffect(() => {
    if (!authenticated) {
      JWTRefreshAPI().then(async (response) => {
        if (response) {
          await dispatch(auth_toggle());
          navigate("/dashboard");
          console.log("User session restored");
        } else {
          await setRefreshToken("");
          await setAccessToken("");
          console.log("User session expired");
        }
        setRechecked(true);
      });
    }
  }, []);

  return <></>;
}
