import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  AiFillGithub,
  AiFillInstagram,
} from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { FaLinkedinIn } from "react-icons/fa";

import ProjectCard from "../Projects/ProjectCards";
import chatify from "../../Assets/Projects/chatify.png";
import editor from "../../Assets/Projects/codeEditor.png";

function Home2() {
  const navigate = useNavigate();
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const email = "j4512j@naver.com";
  const [footerBg, setFooterBg] = useState("rgba(82, 52, 121, 1)");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      const distanceFromBottom = docHeight - (scrollTop + windowHeight);
      const maxDistance = 100;

      let opacity;
      if (distanceFromBottom > maxDistance) {
        opacity = 1;
      } else {
        opacity = distanceFromBottom / maxDistance;
      }

      setFooterBg(`rgba(82, 52, 121, ${opacity})`);
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email)
      .then(() => {
        setToastMessage("이메일 주소가 복사되었습니다!");
        setTimeout(() => setToastMessage(""), 2500);
      })
      .catch(() => {
        setToastMessage("복사에 실패했습니다.");
        setTimeout(() => setToastMessage(""), 2500);
      });
  };

  return (
    <Container fluid className="home-about-section" id="about">
      <h1 style={{ color: "#eee", textAlign: "center", paddingLeft: "50px", marginBottom: "50px" }}>
        Project
      </h1>

      <Row style={{ justifyContent: "center", gap: "30px", alignItems: "center" }}>
        <Col md={3} style={{ marginRight: "40px" }}>
          <ProjectCard
            imgPath={chatify}
            isBlog={false}
            title="Defective Image Filtering"
            description={
              <>
                본 연구에서는 PCB 검사에서 불량 이미지 분류 성능을 향상시키기 위해 CNN과 라플라시안 필터를 결합한 기법을 제안하여, 불량 제품 판별 정확도 향상에 기여하였다.
                <br />
                해당 논문의 주저자로 MDPI Electronics 학술지에 게재되었으며, 현재까지 총 7회의 인용되었다.
              </>
            }
            ghLink="https://github.com/junhj14/pcb"
            demoLink="https://www.mdpi.com/2079-9292/12/18/3795"
          />
        </Col>

        <Col md={3}>
          <ProjectCard
            imgPath={editor}
            isBlog={false}
            title="Editor.io"
            description="Online code and markdown editor build with react.js. Online Editor which supports html, css, and js code with instant view of website. Online markdown editor for building README file which supports GFM, Custom Html tags with toolbar and instant preview.Both the editor supports auto save of work using Local Storage"
            ghLink="https://github.com/soumyajit4419/Editor.io"
            demoLink="https://editor.soumya-jit.tech/"
          />
        </Col>

        <Col
          md="auto"
          style={{
            cursor: "pointer",
            paddingLeft: "100px",
            paddingRight: "100px",
            color: "#6f42c1",
            fontWeight: "700",
            fontSize: "1.3rem",
          }}
          onClick={() => navigate("/projects")}
        >
          더보기 &gt;
        </Col>
      </Row>

      {/* Footer */}
      <Row
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: footerBg,
          borderTop: "1px solid #444",
          padding: "0",
          zIndex: 1100,
          justifyContent: "center",
          color: "#eee",
          margin: 0,
          transition: "background-color 0.3s ease",
        }}
      >
        <Col md={12} className="home-about-social">
          <ul
            className="home-about-social-links"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginBottom: 5,
              paddingLeft: 0,
              listStyle: "none",
            }}
          >
            <li className="social-icons">
              <a
                href="https://github.com/junhj14"
                target="_blank"
                rel="noreferrer"
                className="icon-colour home-social-icons"
              >
                <AiFillGithub />
              </a>
            </li>
            <li className="social-icons">
              <button
                onClick={() => setShowEmailModal(true)}
                className="icon-colour home-social-icons"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  color: "inherit",
                  fontSize: "inherit",
                }}
                aria-label="이메일 주소 보기"
              >
                <MdEmail />
              </button>
            </li>
            <li className="social-icons">
              <a
                href="https://www.linkedin.com/in/soumyajit4419/"
                target="_blank"
                rel="noreferrer"
                className="icon-colour home-social-icons"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.instagram.com/soumyajit4419"
                target="_blank"
                rel="noreferrer"
                className="icon-colour home-social-icons"
              >
                <AiFillInstagram />
              </a>
            </li>
          </ul>
        </Col>
      </Row>

      {/* 이메일 모달 */}
      {showEmailModal && (
        <div style={modalStyle} onClick={() => setShowEmailModal(false)}>
          <div
            style={modalContentStyle}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="email-modal-title"
          >
            <h3 id="email-modal-title" style={{ marginBottom: "0.5em" }}>
              이메일 주소
            </h3>
            <p
              style={{
                userSelect: "text",
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "1.5em",
                color: "#523479",
                letterSpacing: "0.05em",
                wordBreak: "break-all",
              }}
            >
              {email}
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "1em" }}>
              <button onClick={copyToClipboard} style={copyButtonStyle} type="button">
                복사하기
              </button>
              <button onClick={() => setShowEmailModal(false)} style={closeButtonStyle} type="button">
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 토스트 메시지 */}
      {toastMessage && <div style={toastStyle}>{toastMessage}</div>}
    </Container>
  );
}

const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 2000,
  backdropFilter: "blur(5px)",
};

const modalContentStyle = {
  backgroundColor: "#fff",
  padding: "30px 40px",
  borderRadius: "12px",
  minWidth: "320px",
  maxWidth: "90vw",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  textAlign: "center",
};

const copyButtonStyle = {
  backgroundColor: "#6f42c1",
  border: "none",
  padding: "10px 25px",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "1rem",
  transition: "background-color 0.3s ease",
};

const closeButtonStyle = {
  backgroundColor: "#e0e0e0",
  border: "none",
  padding: "10px 25px",
  borderRadius: "8px",
  color: "#444",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "1rem",
  transition: "background-color 0.3s ease",
};

const toastStyle = {
  position: "fixed",
  bottom: "30px",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: "#523479",
  color: "white",
  padding: "12px 24px",
  borderRadius: "20px",
  boxShadow: "0 4px 15px rgba(82, 52, 121, 0.7)",
  fontWeight: "600",
  fontSize: "1rem",
  zIndex: 3000,
  userSelect: "none",
  pointerEvents: "none",
};

export default Home2;
