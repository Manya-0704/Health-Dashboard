import React, { useState, useRef, useContext, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  IconButton, 
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@mui/material';
import { 
  CloudUpload, 
  FileCopy, 
  Delete, 
  PictureAsPdf,
  Category
} from '@mui/icons-material';
import { Document, Page, pdfjs } from 'react-pdf';
import { ThemeContext } from '../../ThemeContext.jsx';
import { getPdfCategories } from '../../utils/samplePdfs';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const fileInputRef = useRef(null);
  const { darkMode } = useContext(ThemeContext);
  const categories = getPdfCategories();
  
  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    
    if (!selectedFile) {
      return;
    }
    
    // Check file type
    if (selectedFile.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }
    
    // Check file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size should not exceed 5MB');
      return;
    }
    
    setError('');
    setFile(selectedFile);
    
    // Create preview URL
    try {
      const fileURL = URL.createObjectURL(selectedFile);
      setPreview(fileURL);
    } catch (err) {
      console.error("Error creating object URL:", err);
      setError('Failed to preview the PDF. You can still upload it.');
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const droppedFile = event.dataTransfer.files[0];
      
      // Check file type
      if (droppedFile.type !== 'application/pdf') {
        setError('Please upload a PDF file');
        return;
      }
      
      // Check file size (max 5MB)
      if (droppedFile.size > 5 * 1024 * 1024) {
        setError('File size should not exceed 5MB');
        return;
      }
      
      setError('');
      setFile(droppedFile);
      
      // Create preview URL safely
      try {
        const fileURL = URL.createObjectURL(droppedFile);
        setPreview(fileURL);
      } catch (err) {
        console.error("Error creating object URL:", err);
        setError('Failed to preview the PDF. You can still upload it.');
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    if (!category) {
      setError('Please select a document category');
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, you would upload the file to a server here
      // For this demo, we'll simulate an upload with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Use simple data URL for consistency
      const samplePdfDataUrl = "data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G";
      
      // Call the onFileUpload callback with the file info
      onFileUpload({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toISOString(),
        url: samplePdfDataUrl, // Use the sample PDF instead of generating a new one
        category: category,
        description: description || ''
      });
      
      // Reset the component state
      setFile(null);
      setPreview(null);
      setNumPages(null);
      setPageNumber(1);
      setCategory('');
      setDescription('');
      
    } catch (error) {
      console.error("Upload error:", error);
      setError('An error occurred while uploading the file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFile = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    
    setFile(null);
    setPreview(null);
    setNumPages(null);
    setPageNumber(1);
    setError('');
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // Function to handle PDF loading error
  const handlePdfLoadError = (error) => {
    console.error("Error loading PDF preview:", error);
    setError('Failed to preview the PDF. The file may be corrupted, but you can still try to upload it.');
  };

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {!file ? (
        <Box
          className="file-upload"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current.click()}
          sx={{
            cursor: 'pointer',
            border: '2px dashed var(--border-color)',
            borderRadius: '12px',
            p: 4,
            textAlign: 'center',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: 'var(--primary-color)',
            },
            borderColor: error ? 'var(--error-color)' : 'var(--border-color)',
            backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.02)'
          }}
        >
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          <CloudUpload sx={{ fontSize: 48, color: 'var(--primary-color)', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Drag & Drop PDF file here
          </Typography>
          <Typography variant="body2" color="textSecondary">
            or click to browse (Max size: 5MB)
          </Typography>
        </Box>
      ) : (
        <Box sx={{ mb: 3 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 2,
              p: 1,
              borderRadius: 1,
              backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'
            }}
          >
            <PictureAsPdf sx={{ mr: 1, color: '#f44336' }} />
            <Typography 
              variant="body2" 
              sx={{ 
                flexGrow: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </Typography>
            <IconButton 
              size="small" 
              onClick={handleRemoveFile}
              aria-label="remove file"
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
          
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="document-category-label">Document Category</InputLabel>
            <Select
              labelId="document-category-label"
              id="document-category"
              value={category}
              label="Document Category"
              onChange={(e) => setCategory(e.target.value)}
              startAdornment={<Category sx={{ mr: 1, ml: -0.5 }} />}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            label="Description (optional)"
            variant="outlined"
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={2}
          />
          
          {preview && (
            <Box 
              sx={{ 
                border: '1px solid var(--border-color)',
                borderRadius: 1,
                overflow: 'hidden',
                mb: 2,
                mt: 2,
                '& .react-pdf__Document': {
                  display: 'flex',
                  justifyContent: 'center',
                  backgroundColor: darkMode ? '#1a1a1a' : '#f5f5f5',
                },
                '& .react-pdf__Page': {
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                  maxWidth: '100%',
                  height: 'auto'
                }
              }}
            >
              <Document
                file={preview}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={handlePdfLoadError}
                loading={
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                    <CircularProgress size={40} />
                  </Box>
                }
                error={
                  <Box sx={{ p: 4, textAlign: 'center' }}>
                    <Typography color="error">
                      Failed to preview PDF. You can still upload the file.
                    </Typography>
                  </Box>
                }
                options={{
                  cMapUrl: 'https://unpkg.com/pdfjs-dist@3.4.120/cmaps/',
                  cMapPacked: true,
                  standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@3.4.120/standard_fonts/'
                }}
              >
                <Page 
                  pageNumber={pageNumber} 
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  width={300}
                />
              </Document>
              
              {numPages > 1 && (
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 1,
                    backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <Button
                    disabled={pageNumber <= 1}
                    onClick={() => setPageNumber(pageNumber - 1)}
                    size="small"
                  >
                    Previous
                  </Button>
                  <Typography variant="body2" sx={{ mx: 2 }}>
                    Page {pageNumber} of {numPages}
                  </Typography>
                  <Button
                    disabled={pageNumber >= numPages}
                    onClick={() => setPageNumber(pageNumber + 1)}
                    size="small"
                  >
                    Next
                  </Button>
                </Box>
              )}
            </Box>
          )}
          
          <Button
            variant="contained"
            color="primary"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <CloudUpload />}
            onClick={handleUpload}
            disabled={loading || !category}
            fullWidth
          >
            {loading ? 'Uploading...' : 'Upload File'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FileUpload; 