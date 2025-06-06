import React from "react";
import { useTranslation } from "react-i18next"; 
import { pdfDocumentName, pdfDownloadLink } from "../utils"; 

/**
 * Renders an SVG icon representing a PDF document.
 * 
 * @param {Object} props - Component properties
 * @param {number} [props.width=20] - Width of the SVG icon
 * @param {number} [props.height=20] - Height of the SVG icon
 * @param {Object} [props.style] - Custom styles to apply to the SVG
 * @returns {JSX.Element} SVG icon for PDF documents
 */
const PDFSvg = ({ width = 20, height = 20, style }) => (
  <svg style={style} xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20" fill="gray">
    <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z" />
  </svg>
);

/**
 * Renders a document viewer component for E-Waste module.
 * Displays a document with its type and provides a download/view link.
 * 
 * @param {Object} props - Component properties
 * @param {Object} props.doc - Document object containing file information
 * @param {string} props.doc.fileStoreId - Unique identifier for the file in storage
 * @param {string} props.doc.fileType - Type/extension of the document
 * @param {string} props.Code - Document code identifier
 * @param {number} props.index - Index of the document in a list
 * @returns {JSX.Element} Document viewer component with download capability
 */
function EWASTEDocument({ doc, Code, index }) {
  const { t } = useTranslation(); 
  let documents = {}; 
  let documentLink = pdfDownloadLink(documents, doc?.fileStoreId); 

  return (
    <div style={{ marginTop: "19px" }}>
      <React.Fragment>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {/* Link to download or view the document */}
          <a target="_" href={documentLink} style={{ minWidth: "160px" }} key={index}>
            {/* Render the PDF icon */}
            <PDFSvg width={45} height={50} style={{ background: "#f6f6f6", padding: "8px" }} />
            {/* Render the document type */}
            <p style={{ marginTop: "8px" }}>{t(`EWASTE_${doc?.fileType?.replace(".", "_")}`)}</p>
          </a>
        </div>
      </React.Fragment>
    </div>
  );
}

export default EWASTEDocument; 