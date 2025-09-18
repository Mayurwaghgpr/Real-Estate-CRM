import React, { useState, useRef } from "react";
import {
  Upload,
  FileSpreadsheet,
  Download,
  X,
  CheckCircle,
  AlertCircle,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router";
import useLeadsService from "../../services/useLeadsService";
import { useSelector } from "react-redux";

const LeadExportImport = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // 'success', 'error', null
  const { isLeadSubmitting } = useSelector((state) => state.leads);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { importBulkLeads } = useLeadsService();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadStatus(null);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (
        droppedFile.type.includes("sheet") ||
        droppedFile.name.endsWith(".csv") ||
        droppedFile.name.endsWith(".xlsx")
      ) {
        setFile(droppedFile);
        setUploadStatus(null);
      }
    }
  };

  const handleUpload = async (type) => {
    if (!file) return;
    await importBulkLeads({ type, file });
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadStatus(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const downloadTemplate = () => {
    // Mock download - implement your actual template download logic
    console.log("Downloading template...");
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div
      onClick={() => navigate(-1)}
      className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Upload className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Import Leads</h2>
              <p className="text-gray-600">
                Upload your lead data from Excel or CSV files
              </p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          )}
        </div>

        <div className="p-6 space-y-6">
          {/* Template Download Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Need a template?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Download our sample template to ensure proper formatting
                  </p>
                </div>
              </div>
              <button
                onClick={downloadTemplate}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Download className="h-4 w-4" />
                <span>Download Template</span>
              </button>
            </div>
          </div>

          {/* File Upload Area */}
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
              dragActive
                ? "border-blue-500 bg-blue-50"
                : file
                ? "border-green-300 bg-green-50"
                : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, .xlsx"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            {!file ? (
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <Upload className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    {dragActive
                      ? "Drop your file here"
                      : "Choose file or drag and drop"}
                  </p>
                  <p className="text-gray-500 mt-1">
                    Excel (.xlsx) or CSV files only
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Maximum file size: 10MB
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <FileSpreadsheet className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-gray-500">{formatFileSize(file.size)}</p>
                  <button
                    onClick={handleRemoveFile}
                    className="mt-2 text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Remove file
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Upload Status */}
          {uploadStatus && (
            <div
              className={`p-4 rounded-xl flex items-center space-x-3 ${
                uploadStatus === "success"
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              {uploadStatus === "success" ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">
                      Upload successful!
                    </p>
                    <p className="text-sm text-green-600">
                      Your leads have been imported successfully.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-medium text-red-800">Upload failed</p>
                    <p className="text-sm text-red-600">
                      Please check your file format and try again.
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={() => handleUpload("excel")}
              disabled={!file || isLeadSubmitting}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isLeadSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  <span>Import Leads</span>
                </>
              )}
            </button>

            {onClose && (
              <button
                onClick={onClose}
                disabled={isLeadSubmitting}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Cancel
              </button>
            )}
          </div>

          {/* Instructions
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <h4 className="font-medium text-gray-900">File Requirements:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Supported formats: Excel (.xlsx) and CSV (.csv)</li>
              <li>• Maximum file size: 10MB</li>
              <li>• Ensure your file includes headers in the first row</li>
              <li>
                • Required columns: Name, Email, Phone (refer to template)
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LeadExportImport;
