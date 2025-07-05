// Sample PDF data for demonstration purposes
// In a real application, these would be actual PDF files from the server

// For demo purposes, we'll use data URLs instead of remote URLs to avoid CORS issues
const samplePdfDataUrl = "data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G";

export const samplePdfs = [
  {
    id: 'pdf-001',
    name: 'Medical Report - Annual Checkup.pdf',
    size: 1024 * 1024 * 1.5, // 1.5MB
    type: 'application/pdf',
    uploadDate: '2023-09-15T10:30:00Z',
    url: samplePdfDataUrl,
    category: 'Medical Report',
    description: 'Annual health checkup results showing all vitals within normal range.'
  },
  {
    id: 'pdf-002',
    name: 'Lab Results - Blood Test.pdf',
    size: 1024 * 512, // 512KB
    type: 'application/pdf',
    uploadDate: '2023-10-05T14:45:00Z',
    url: samplePdfDataUrl,
    category: 'Lab Results',
    description: 'Complete blood count (CBC) and metabolic panel results.'
  },
  {
    id: 'pdf-003',
    name: 'Prescription - Medication.pdf',
    size: 1024 * 256, // 256KB
    type: 'application/pdf',
    uploadDate: '2023-11-20T09:15:00Z',
    url: samplePdfDataUrl,
    category: 'Prescription',
    description: 'Prescription for allergy medication.'
  },
  {
    id: 'pdf-004',
    name: 'Vaccination Record - COVID-19.pdf',
    size: 1024 * 384, // 384KB
    type: 'application/pdf',
    uploadDate: '2023-12-01T11:20:00Z',
    url: samplePdfDataUrl,
    category: 'Vaccination Record',
    description: 'COVID-19 vaccination record including booster shots.'
  },
  {
    id: 'pdf-005',
    name: 'Insurance Policy - Health Coverage.pdf',
    size: 1024 * 1024 * 2.2, // 2.2MB
    type: 'application/pdf',
    uploadDate: '2024-01-15T09:45:00Z',
    url: samplePdfDataUrl,
    category: 'Insurance Document',
    description: 'Annual health insurance policy and coverage details.'
  },
  {
    id: 'pdf-006',
    name: 'Specialist Referral - Cardiology.pdf',
    size: 1024 * 300, // 300KB
    type: 'application/pdf',
    uploadDate: '2024-02-10T14:30:00Z',
    url: samplePdfDataUrl,
    category: 'Referral Letter',
    description: 'Referral letter to cardiology specialist for heart palpitations.'
  },
  {
    id: 'pdf-007',
    name: 'Hospital Discharge Summary.pdf',
    size: 1024 * 1024 * 1.1, // 1.1MB
    type: 'application/pdf',
    uploadDate: '2024-03-22T16:15:00Z',
    url: samplePdfDataUrl,
    category: 'Discharge Summary',
    description: 'Discharge summary following minor outpatient procedure.'
  },
  {
    id: 'pdf-008',
    name: 'Lab Results - Cholesterol Panel.pdf',
    size: 1024 * 450, // 450KB
    type: 'application/pdf',
    uploadDate: '2024-04-05T10:00:00Z',
    url: samplePdfDataUrl,
    category: 'Lab Results',
    description: 'Lipid panel showing cholesterol, HDL, LDL, and triglyceride levels.'
  }
];

// Function to add sample PDFs to localStorage for demonstration
export const initializeSamplePdfs = () => {
  const existingUploads = JSON.parse(localStorage.getItem('uploads') || '[]');
  
  // Only add sample PDFs if there are no uploads yet
  if (existingUploads.length === 0) {
    console.log("Initializing sample PDFs in localStorage");
    localStorage.setItem('uploads', JSON.stringify(samplePdfs));
  } else {
    console.log("Sample PDFs already initialized or user uploads exist");
  }
};

// Function to reset and reload all sample PDFs (for demo purposes)
export const resetAndLoadAllSamplePdfs = () => {
  console.log("Resetting and loading all sample PDFs in localStorage");
  localStorage.setItem('uploads', JSON.stringify(samplePdfs));
  return samplePdfs;
};

// Function to get PDF category options
export const getPdfCategories = () => [
  'Medical Report',
  'Lab Results',
  'Prescription',
  'Insurance Document',
  'Vaccination Record',
  'Discharge Summary',
  'Referral Letter',
  'Other'
]; 