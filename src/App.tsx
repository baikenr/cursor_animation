import CursorFollower from "./components/CursorFollower";
import "./App.css";

function App() {
  return (
    <section>
      <CursorFollower/>
      <div className="container">
        <p>
          <span style={{ color: "#000000" }}>Linus Lehbrink</span>
          <br />
          Working at{" "}
          <a href="https://x.com/openpurpose" target="_blank" rel="noopener noreferrer">
            OpenPurpose®<sup>↗</sup>
          </a>.
          <br />
          Previously an independent contractor, I collaborated with{" "}
          <a href="https://www.instagram.com/glebkostin/" target="_blank" rel="noopener noreferrer">
            Gleb Kostin<sup>↗</sup>
          </a>,
          <br />
          <a href="https://www.instagram.com/newdaysamepain/" target="_blank" rel="noopener noreferrer">
            New Day Same Pain<sup>↗</sup>
          </a>,{" "}
          <a href="https://www.instagram.com/siberiahills/" target="_blank" rel="noopener noreferrer">
            Siberia Hills<sup>↗</sup>
          </a> and{" "}
          <a href="https://www.instagram.com/soooraven/" target="_blank" rel="noopener noreferrer">
            Body by Raven Tracy<sup>↗</sup>
          </a> along with dozens of
          <br />
          other brands. Over the last 7 days, well over 181 152<sup>*</sup> people have used websites or
          <br />
          services I made singlehandedly.
          <br /><br />
          Message me on{" "}
          <a href="https://x.com/httpslinus" target="_blank" rel="noopener noreferrer">
            Twitter<sup>↗</sup>
          </a>{" "}
          or by{" "}
          <a href="mailto:your-email@example.com" target="_blank" rel="noopener noreferrer">
            email<sup>↗</sup>
          </a>.
        </p>
      </div>
    </section>
  );
}

export default App;
