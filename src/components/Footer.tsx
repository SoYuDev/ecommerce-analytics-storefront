import Image from 'next/image';
export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-components">
          <div>
            <img className="footer-image" src="./Nextcom.png" alt="logo" />
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
          <div className="social-media-component">
            <img
              className="social-media-images"
              src="./placeholder.png"
              alt=""
            />
            <img className="social-media-images" src="./instagram.png" alt="" />
            <img className="social-media-images" src="./facebook.png" alt="" />
          </div>
        </div>
        {/* <hr className="hr-bottom" /> */}
        <div className="footer-bottom">
          <div className="text-bottom">
            <p>©2026 | Technologies</p>
          </div>
          <div className="text-bottom">
            <span>Privacy</span>
            <span>Accesibility</span>
            <span>Terms</span>
          </div>
        </div>
      </footer>
    </>
  );
}
