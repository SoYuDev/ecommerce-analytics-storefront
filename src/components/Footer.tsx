import Image from 'next/image';
export default function Footer() {
  return (
    <>
      <footer className="footer" role='contentinfo'>
        <div className="footerComponents">
          <div>
            <img className="footerImage" src="./Nextcom.png" alt="Nextcom" />
          </div>
          <div className="">
            <div>
              <strong>Company</strong>
              <p>About us</p>
              <p>Blog</p>
              <p>Contact</p>
            </div>
          </div>
          <div className="">
            <div>
              <strong>Products</strong>
              <p>Home</p>
              <p>Electronics</p>
              <p>Clothing</p>
              <p>Accesories</p>
            </div>
          </div>
          <div className="socialMediaComponent">
            <img className="socialMediaImages" src="./placeholder.png" alt="Placeholder" />
            <img className="socialMediaImages" src="./instagram.png" alt="Instagram" />
            <img className="socialMediaImages" src="./facebook.png" alt="Facebook" />
          </div>
        </div>
        {/* <hr className="hr-bottom" /> */}
        <div className="footerBottom">
          <div className="textBottom">
            <p>©2026 | Technologies</p>
          </div>
          <div className="textBottom">
            <span>Privacy</span>
            <span>Accesibility</span>
            <span>Terms</span>
          </div>
        </div>
      </footer>
    </>
  );
}
