import React, { useContext, useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  IconButton, 
  Box, 
  Divider,
  Tooltip,
  Chip,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  CircularProgress,
  Paper
} from '@mui/material';
import { 
  PictureAsPdf, 
  DeleteOutline, 
  GetApp, 
  Visibility,
  History,
  Category,
  Description,
  Close
} from '@mui/icons-material';
import { Document, Page, pdfjs } from 'react-pdf';
import { ThemeContext } from '../../ThemeContext.jsx';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const UploadHistory = ({ onDelete, onDownload }) => {
  const { darkMode } = useContext(ThemeContext);
  const [uploads, setUploads] = useState([]);
  const [viewingFile, setViewingFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfError, setPdfError] = useState(false);
  
  // Load uploads from localStorage
  useEffect(() => {
    const storedUploads = JSON.parse(localStorage.getItem('uploads') || '[]');
    setUploads(storedUploads);
  }, []);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    else if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    else return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  };
  
  const getCategoryColor = (category) => {
    const categories = {
      'Medical Report': '#2196f3', // blue
      'Lab Results': '#4caf50', // green
      'Prescription': '#f44336', // red
      'Insurance Document': '#ff9800', // orange
      'Vaccination Record': '#9c27b0', // purple
      'Discharge Summary': '#795548', // brown
      'Referral Letter': '#607d8b', // blue-gray
    };
    
    return categories[category] || '#757575'; // default gray
  };
  
  const handleDelete = (id) => {
    // Remove from local state
    const updatedUploads = uploads.filter(upload => upload.id !== id);
    setUploads(updatedUploads);
    
    // Update localStorage
    localStorage.setItem('uploads', JSON.stringify(updatedUploads));
    
    // If external handler provided, call it too
    if (onDelete) {
      onDelete(id);
    }
  };
  
  const handleView = (file) => {
    setViewingFile(file);
    setPageNumber(1);
    setPdfError(false);
  };
  
  const handleCloseViewer = () => {
    setViewingFile(null);
    setNumPages(null);
    setPageNumber(1);
  };
  
  const handleDownload = (file) => {
    // Create an anchor element and set the href to the file url
    const link = document.createElement('a');
    link.href = file.url;
    link.download = file.name; // Set the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // If external handler provided, call it too
    if (onDownload) {
      onDownload(file);
    }
  };
  
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  
  const handlePdfLoadError = (error) => {
    console.error("Error loading PDF in viewer:", error);
    setPdfError(true);
  };
  
  return (
    <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <History color="primary" sx={{ mr: 1 }} />
          <Typography variant="h5" component="h2">
            Document Upload History
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        {uploads.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="textSecondary">
              No documents uploaded yet.
            </Typography>
          </Box>
        ) : (
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {uploads.map((file, index) => (
              <React.Fragment key={file.id}>
                {index > 0 && <Divider component="li" />}
                <ListItem 
                  alignItems="flex-start"
                  sx={{ 
                    py: 1.5,
                    backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
                    '&:hover': {
                      backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'
                    }
                  }}
                >
                  <ListItemIcon>
                    <Badge
                      badgeContent={
                        <Category 
                          sx={{ 
                            fontSize: 12, 
                            color: getCategoryColor(file.category)
                          }} 
                        />
                      }
                      overlap="circular"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                    >
                      <PictureAsPdf sx={{ color: '#f44336' }} />
                    </Badge>
                  </ListItemIcon>
                  
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight={500}>
                        {file.name}
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                          <Chip 
                            size="small" 
                            label={file.category}
                            sx={{ 
                              backgroundColor: darkMode 
                                ? `${getCategoryColor(file.category)}22` 
                                : `${getCategoryColor(file.category)}11`,
                              color: getCategoryColor(file.category),
                              fontWeight: 500
                            }}
                          />
                          
                          <Typography variant="body2" color="text.secondary" component="span">
                            {formatFileSize(file.size)}
                          </Typography>
                          
                          <Typography variant="body2" color="text.secondary" component="span">
                            Uploaded: {formatDate(file.uploadDate)}
                          </Typography>
                        </Box>
                        
                        {file.description && (
                          <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                            <Description fontSize="small" sx={{ mr: 0.5, opacity: 0.6, fontSize: '0.9rem' }} />
                            <Typography variant="body2" color="text.secondary">
                              {file.description}
                            </Typography>
                          </Box>
                        )}
                      </React.Fragment>
                    }
                  />
                  
                  <Box>
                    <Tooltip title="View">
                      <IconButton 
                        aria-label="view" 
                        size="small" 
                        onClick={() => handleView(file)}
                        sx={{ color: 'primary.main' }}
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Download">
                      <IconButton 
                        aria-label="download" 
                        size="small"
                        onClick={() => handleDownload(file)}
                        sx={{ color: 'success.main' }}
                      >
                        <GetApp />
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Delete">
                      <IconButton 
                        aria-label="delete" 
                        size="small"
                        onClick={() => handleDelete(file.id)}
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteOutline />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        )}
      </CardContent>
      
      {/* PDF Viewer Dialog */}
      <Dialog
        open={viewingFile !== null}
        onClose={handleCloseViewer}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            bgcolor: darkMode ? 'background.paper' : '#fff'
          }
        }}
      >
        {viewingFile && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PictureAsPdf sx={{ color: '#f44336', mr: 1 }} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  {viewingFile.name}
                </Typography>
              </Box>
              <IconButton onClick={handleCloseViewer} size="small">
                <Close />
              </IconButton>
            </DialogTitle>
            
            <DialogContent dividers>
              {pdfError ? (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="body1" color="error">
                    Failed to load PDF. The file may be corrupted or in an unsupported format.
                  </Typography>
                </Paper>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Document
                    file={viewingFile.url}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={handlePdfLoadError}
                    loading={
                      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                        <CircularProgress size={40} />
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
                      width={500}
                    />
                  </Document>
                  
                  {numPages > 1 && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                      <Button
                        disabled={pageNumber <= 1}
                        onClick={() => setPageNumber(pageNumber - 1)}
                        variant="outlined"
                        size="small"
                        sx={{ mr: 2 }}
                      >
                        Previous
                      </Button>
                      <Typography variant="body2">
                        Page {pageNumber} of {numPages}
                      </Typography>
                      <Button
                        disabled={pageNumber >= numPages}
                        onClick={() => setPageNumber(pageNumber + 1)}
                        variant="outlined"
                        size="small"
                        sx={{ ml: 2 }}
                      >
                        Next
                      </Button>
                    </Box>
                  )}
                </Box>
              )}
            </DialogContent>
          </>
        )}
      </Dialog>
    </Card>
  );
};

export default UploadHistory; 