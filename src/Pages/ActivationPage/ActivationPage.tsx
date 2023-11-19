import { useNavigate, useParams } from "react-router-dom";
import styles, { colors } from "../../styles";
import { ActivationAPI } from "../../Components/API/API";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { toast } from "react-toastify";
export default function ActivationPage() {
  const { uid, token } = useParams();
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (uid && token && feedback == "") {
      ActivationAPI({ uid, token }).then((response) => {
        if (response) {
          setFeedback("Activation successful");
          toast("Activation successful", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          toast("Please login to continue", {
            position: "top-right",
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate("/");
          });
        } else {
          setFeedback("Invalid activation link");
          setError(true);
        }
      });
    }
    if (!uid || !token) {
      setFeedback("Missing uid or token");
    }
    setLoading(false);
  }, [uid, token, feedback, navigate]);
  return (
    <div style={styles.background}>
      <div
        style={{
          ...styles.flex_column,
          ...{
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            height: "100%",
          },
        }}
      >
        {loading ? (
          <CircularProgress style={{ height: "128px", width: "128px" }} />
        ) : (
          <></>
        )}
        {error && !loading ? (
          <ErrorOutlineIcon
            style={{ height: "128px", width: "128px", color: colors.red }}
          />
        ) : (
          <CheckCircleOutlineIcon
            style={{ height: "128px", width: "128px", color: colors.green }}
          />
        )}

        <p style={{ ...styles.text_dark, ...styles.text_L }}>{feedback}</p>
        <div
          style={{
            backgroundColor: colors.header_color,
            marginTop: "16px",
            width: "30%",
            height: "4px",
            marginBottom: 8,
          }}
        />
        <p style={{ ...styles.text_dark, ...styles.text_L }}>
          Activating your CITC Equipment Tracker Account
        </p>
      </div>
    </div>
  );
}
