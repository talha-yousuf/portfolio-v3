import { useEffect } from "react";

function ResumePdfPage() {
  useEffect(() => {
    window.location.href = window.document.title + ".pdf";
  }, []);

  return "Redirecting to PDF...";
}

export default ResumePdfPage;
