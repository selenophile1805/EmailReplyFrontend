import {
  Container,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  CircularProgress
} from "@mui/material";
import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generateReply, setGenerateReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async ()=>{
    setLoading(true);
    setError('')
    try{
      const response = await axios.post("http://localhost:8080/email/generate", {
        emailContent,
        tone
      })
      setGenerateReply(typeof response.data === "string" ? response.data : JSON.stringify(response.data));
      
    }catch(error){
      setError("Failed to generate email reply. please try again ");
      console.error(error);
    }finally{
      setLoading(false);
      
    }

  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Email Reply Generator!!
      </Typography>
      
      <Box sx={{ mx: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="original email content"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 2 }}
        />
        

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="tone-select-label">Tone (Optional)</InputLabel>
          <Select
            labelId="tone-select-label"
            id="tone-select"
            value={tone}
            label="Tone (Optional)"
            onChange={(e) => setTone(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!emailContent || loading}
          fullWidth>
          {loading? <CircularProgress size={24} /> : "Generate Reply"}
        </Button>



      </Box>

      {error && (
        <Typography color="error" sx={{mb:2}}>
            {error}
        </Typography>
      )}


      { generateReply && (
        <Box sx={{mt:3}}>
          <Typography variant="h6" gutterBottom>
            Generated Reply:
          </Typography>
          <TextField
            fullWidth
            rows={6}
            multiline
            variant="outlined"
            value={generateReply}
            inputProps={{readOnly:true}}/>
            <Button
              variant="outlined"
              sx={{mt:2}}
              onClick={()=>navigator.clipboard.writeText(generateReply)}
            >
              Copy to Clipboard
            </Button>
        </Box> 
      )
      }
    </Container>
  );
}

export default App;