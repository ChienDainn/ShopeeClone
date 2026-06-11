import Section1Destructuring from './sections/Section1Destructuring'
import Section2Reference from './sections/Section2Reference'
import Section3Logical from './sections/Section3Logical'
import Section4Class from './sections/Section4Class'
import Section5Functions from './sections/Section5Functions'
import Section6Async from './sections/Section6Async'
import Section7Module from './sections/Section7Module'
import Section8Dom from './sections/Section8Dom'
import Section9Storage from './sections/Section9Storage'
import './App.css'

function App() {
  return (
    <main className="js-review">
      <header className="js-review__header">
        <h1>Ôn tập kiến thức Javascript</h1>
        <p>Những khái niệm JS thường dùng trong React — ví dụ chạy trực tiếp trong app</p>
      </header>

      <Section1Destructuring />
      <Section2Reference />
      <Section3Logical />
      <Section4Class />
      <Section5Functions />
      <Section6Async />
      <Section7Module />
      <Section8Dom />
      <Section9Storage />
    </main>
  )
}

export default App
