import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function SignIn() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button className="header-login" onClick={handleOpen}>
        로그인
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: "center" }}>Login
          <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField variant="outlined" margin="normal" label="이메일" fullWidth sx={{ mb: 2 }} />
          <TextField type="password" label="비밀번호" fullWidth />
        </DialogContent>
        <button> 로그인 하기</button> <br />
      </Dialog>
    </>
  );
}

export default SignIn;
