import "./InfoModal.css";

const InfoModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>✖</button>
        <h2>Overview</h2>
        <p>
          The Product Manager Accelerator Program is designed to support PM professionals through every stage of their careers. From students looking for entry-level jobs to Directors looking to take on a leadership role, our program has helped over hundreds of students fulfill their career aspirations.
        </p>
        <p>
          Our Product Manager Accelerator community are ambitious and committed. Through our program they have learnt, honed and developed new PM and leadership skills, giving them a strong foundation for their future endeavors.
        </p>
        <p>Here are the examples of services we offer. Check out <a href="https://www.pmaccelerator.io/" target="_blank" rel="noopener noreferrer">
          our website
        </a> to learn more about our services.</p>

        <h3>🚀 PMA Pro</h3>
        <p>End-to-end product manager job hunting program that helps you master FAANG-level Product Management skills.</p>

        <h3>🚀 AI PM Bootcamp</h3>
        <p>Gain hands-on AI Product Management skills by building a real-life AI product.</p>

        <h3>🚀 PMA Power Skills</h3>
        <p>Designed for existing product managers to sharpen their product management skills.</p>

        <h3>🚀 PMA Leader</h3>
        <p>We help you accelerate your product management career, get promoted to Director.</p>

        <h3>🚀 1:1 Resume Review</h3>
        <p>We help you rewrite your killer product manager resume to stand out from the crowd.</p>

        <h3>🚀 Free Training</h3>
        <p>
          We also published over 500+ free training and courses. Please go to my
          <a href="https://www.youtube.com/c/drnancyli" target="_blank" rel="noopener noreferrer"> YouTube channel </a>
          and
          <a href="https://www.instagram.com/drnancyli/" target="_blank" rel="noopener noreferrer"> Instagram </a>
          to start learning for free today.
        </p>

        <h3>Website</h3>
        <a href="https://www.pmaccelerator.io/" target="_blank" rel="noopener noreferrer">
          https://www.pmaccelerator.io/
        </a>
      </div>
    </div>
  );
};

export default InfoModal;
