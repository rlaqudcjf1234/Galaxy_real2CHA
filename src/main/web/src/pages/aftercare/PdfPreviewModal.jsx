// PdfPreviewModal.jsx
import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Info from "./Info";
import Class from "./Class";
import Academic from "./Academic";
import Certificate from "./Certificate";
import Aftercare from "./Aftercare";
import '../../css/aftercare/AftercareModal.css';

const PdfPreviewModal = ({ onClose }) => {
  // 옵션 상태: 해상도(scale), 오리엔테이션, 페이지 크기, 포함할 섹션 선택
  const [settings, setSettings] = useState({
    scale: 1,
    orientation: "portrait", // 'portrait' 또는 'landscape'
    pageSize: "a4",
    includeInfo: true,
    includeClass: true,
    includeAcademic: true,
    includeCertificate: true,
    includeAftercare: true,
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  // 각 섹션에 대한 ref
  const infoRef = useRef();
  const classRef = useRef();
  const academicRef = useRef();
  const certificateRef = useRef();
  const aftercareRef = useRef();

  // 지정한 요소를 캡처하는 헬퍼 함수
  const captureSection = async (element) => {
    const canvas = await html2canvas(element, { scale: settings.scale });
    return canvas;
  };

  // 전달된 요소를 캡처한 후 PDF에 이미지로 추가하는 함수
  // addNewPage가 true면 새 페이지에 추가합니다.
  const addSectionToPdf = async (pdf, element, addNewPage) => {
    const canvas = await captureSection(element);
    const imgData = canvas.toDataURL("image/png");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    if (addNewPage) {
      pdf.addPage();
    }
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  };

  // 각 섹션을 개별 페이지로 추가하여 PDF 객체를 생성하는 함수
  const generateMultiPagePdf = async () => {
    const pdf = new jsPDF(settings.orientation, "mm", settings.pageSize);
    let isFirstPage = true;
    if (settings.includeInfo && infoRef.current) {
      await addSectionToPdf(pdf, infoRef.current, !isFirstPage);
      isFirstPage = false;
    }
    if (settings.includeClass && classRef.current) {
      await addSectionToPdf(pdf, classRef.current, true);
    }
    if (settings.includeAcademic && academicRef.current) {
      await addSectionToPdf(pdf, academicRef.current, true);
    }
    if (settings.includeCertificate && certificateRef.current) {
      await addSectionToPdf(pdf, certificateRef.current, true);
    }
    if (settings.includeAftercare && aftercareRef.current) {
      await addSectionToPdf(pdf, aftercareRef.current, true);
    }
    return pdf;
  };

  // 미리보기 PDF 생성
  const generatePdfPreview = async () => {
    const pdf = await generateMultiPagePdf();
    const blob = pdf.output("blob");
    const url = URL.createObjectURL(blob) + "#zoom=50";
    setPreviewUrl(url);
  };

  // 최종 PDF 다운로드
  const handleDownload = async () => {
    const pdf = await generateMultiPagePdf();
    pdf.save("student_info.pdf");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>PDF 미리보기 및 설정</h3>
        {/* 옵션 설정 폼 */}
        <div className="settings-form">
          <label>
            해상도 (scale):
            <input
              type="number"
              value={settings.scale}
              onChange={(e) =>
                setSettings({ ...settings, scale: parseFloat(e.target.value) })
              }
              min="0.5"
              step="0.1"
            />
          </label>
          <label>
            오리엔테이션:
            <select
              value={settings.orientation}
              onChange={(e) =>
                setSettings({ ...settings, orientation: e.target.value })
              }
            >
              <option value="portrait">세로</option>
              <option value="landscape">가로</option>
            </select>
          </label>
          <div>
            <label>
              <input
                type="checkbox"
                checked={settings.includeInfo}
                onChange={(e) =>
                  setSettings({ ...settings, includeInfo: e.target.checked })
                }
              />
              기본정보
            </label>
            <label>
              <input
                type="checkbox"
                checked={settings.includeClass}
                onChange={(e) =>
                  setSettings({ ...settings, includeClass: e.target.checked })
                }
              />
              수강정보
            </label>
            <label>
              <input
                type="checkbox"
                checked={settings.includeAcademic}
                onChange={(e) =>
                  setSettings({ ...settings, includeAcademic: e.target.checked })
                }
              />
              학력정보
            </label>
            <label>
              <input
                type="checkbox"
                checked={settings.includeCertificate}
                onChange={(e) =>
                  setSettings({ ...settings, includeCertificate: e.target.checked })
                }
              />
              자격증정보
            </label>
            <label>
              <input
                type="checkbox"
                checked={settings.includeAftercare}
                onChange={(e) =>
                  setSettings({ ...settings, includeAftercare: e.target.checked })
                }
              />
              사후관리
            </label>
          </div>
        </div>

        <button onClick={generatePdfPreview}>미리보기 생성</button>

        {previewUrl && (
          <div className="preview-container">
            <h4>미리보기:</h4>
            <iframe
              src={previewUrl}
              title="PDF 미리보기"
              style={{ width: "100%", height: "500px" }}
            ></iframe>
          </div>
        )}

        <div className="modal-actions" style={{ marginTop: "20px" }}>
          <button onClick={handleDownload}>PDF 다운로드</button>
          <button onClick={onClose} style={{ marginLeft: "10px" }}>
            닫기
          </button>
        </div>

        {/* 각 섹션을 개별 페이지로 캡처할 offscreen 컨테이너 */}
        <div
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          {settings.includeInfo && <div ref={infoRef}><Info /></div>}
          {settings.includeClass && <div ref={classRef}><Class /></div>}
          {settings.includeAcademic && <div ref={academicRef}><Academic /></div>}
          {settings.includeCertificate && <div ref={certificateRef}><Certificate /></div>}
          {settings.includeAftercare && (
            <div ref={aftercareRef}>
              <Aftercare hideEditButton={true} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PdfPreviewModal;