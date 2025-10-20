import CursorFollower from "./components/CursorFollower";
import "./App.css";

function App() {

  return (
    <section>
      <CursorFollower/>
      <div className="container">
        <p>
          <strong>Linus Lehbrink</strong>
          <br />
          Working at OpenPurpose®<sup>↗</sup>.
          <br />
          Previously an independent contractor, I collaborated with Gleb Kostin<sup>↗</sup>,
          <br />
          New Day Same Pain<sup>↗</sup>, Siberia Hills<sup>↗</sup> and Body by Raven Tracy<sup>↗</sup> along with dozens of
          <br />
          other brands. Over the last 7 days, well over 181 152<sup>*</sup> people have used websites or
          <br />
          services I made singlehandedly.
          <br /><br />
          Message me on Twitter<sup>↗</sup> or by email<sup>↗</sup>.
        </p>
      </div>
    </section>
  );
}

export default App;
