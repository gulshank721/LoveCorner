import { useState } from 'react';
import { memories, person, questions, reasons } from './content';
import './critters.css';
import './celestial.css';
import floralPhoto from './assets/neha-floral.jpeg';
import treePhoto from './assets/neha-under-tree.jpeg';
import sunlightPhoto from './assets/neha-sunlight.jpeg';
import meByTheSeaPhoto from './assets/me-by-the-sea.jpeg';

const Sparkle = () => (
  <span className="sparkle" aria-hidden="true">
    ✦
  </span>
);

export default function App() {
  const [screen, setScreen] = useState('welcome');
  const [question, setQuestion] = useState(0);
  const [answerOpen, setAnswerOpen] = useState(false);
  const [memory, setMemory] = useState(0);
  const [reason, setReason] = useState(0);
  const [choice, setChoice] = useState(null);
  const [sleepy, setSleepy] = useState(false);

  const goQuestion = () => {
    setQuestion(0);
    setAnswerOpen(false);
    setScreen('questions');
  };
  const nextQuestion = () => {
    if (question === questions.length - 1) setScreen('choice');
    else {
      setQuestion(question + 1);
      setAnswerOpen(false);
    }
  };
  const playSleepySound = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const context = new AudioContext();
    const now = context.currentTime;
    [523.25, 659.25, 783.99].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, now + index * 0.14);
      gain.gain.setValueAtTime(0.0001, now + index * 0.14);
      gain.gain.exponentialRampToValueAtTime(0.065, now + index * 0.14 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.14 + 0.38);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(now + index * 0.14);
      oscillator.stop(now + index * 0.14 + 0.4);
    });
    window.setTimeout(() => context.close(), 900);
  };

  return (
    <main className={`app screen-${screen}`}>
      <div className="glow glow-one" />
      <div className="glow glow-two" />
      <div className="stars">·　✦　·　　✧　　·　✦　·</div>
      <div className="tiny-hearts" aria-hidden="true">
        <span>♡</span>
        <span>♥</span>
        <span>♡</span>
        <span>♥</span>
      </div>
      <div
        className="panda-run"
        aria-label="A tiny panda walking with balloons"
      >
        <div className="balloons">
          <b>♥</b>
          <b>♥</b>
          <b>♥</b>
          <i />
          <i />
          <i />
        </div>
        <div className="panda">
          <span className="panda-head">🐼</span>
          <span className="panda-arm arm-left" />
          <span className="panda-arm arm-right" />
          <span className="panda-body" />
          <span className="panda-foot foot-left" />
          <span className="panda-foot foot-right" />
        </div>
      </div>
      <div className="penguin-pal" aria-label="A tiny happy penguin">
        🐧<span>♡</span>
      </div>
      {screen !== 'welcome' && screen !== 'final' && (
        <button className="home" onClick={() => setScreen('welcome')}>
          ⌂
        </button>
      )}

      {screen === 'welcome' && (
        <section className="panel welcome enter">
          <p className="eyebrow">
            A small corner of the internet, made just for {person}
          </p>
          <div className="petal petal-left">❋</div>
          <div className="petal petal-right">❋</div>
          <h1>
            Hey, <em>you.</em>
          </h1>
          <p className="intro">
            I made something for you.
            <br />
            Don’t rush through it.
          </p>
          <div className="photo-stack" aria-label="A few lovely photos of Neha">
            <img src={treePhoto} alt="Neha smiling under a tree" />
            <img src={sunlightPhoto} alt="Neha outside in the sunshine" />
            <img src={floralPhoto} alt="Neha smiling in a floral outfit" />
          </div>
          <button className="primary" onClick={goQuestion}>
            begin <span>→</span>
          </button>
          <p className="hint">there are a few surprises inside</p>
        </section>
      )}

      {screen === 'questions' && (
        <section className="panel card enter">
          <p className="counter">
            QUESTION {String(question + 1).padStart(2, '0')}{' '}
            <span>/ {String(questions.length).padStart(2, '0')}</span>
          </p>
          <Sparkle />
          <h2>{questions[question].prompt}</h2>
          {!answerOpen ? (
            <button className="primary" onClick={() => setAnswerOpen(true)}>
              show me <span>→</span>
            </button>
          ) : (
            <div className="answer reveal">
              <p>{questions[question].answer}</p>
              {question === 2 && (
                <button
                  className="sleepy-button"
                  onClick={() => {
                    playSleepySound();
                    setSleepy(true);
                  }}
                >
                  one tiny sleepy interruption <span>☾</span>
                </button>
              )}
              <button className="text-button" onClick={nextQuestion}>
                {question === questions.length - 1
                  ? 'one more thing'
                  : 'next question'}{' '}
                <span>→</span>
              </button>
            </div>
          )}
        </section>
      )}

      {screen === 'choice' && (
        <section className="panel choice enter">
          <p className="eyebrow">A very important question</p>
          <Sparkle />
          <h2>What do you think I love most about you?</h2>
          <div className="options">
            {[
              'Your smile',
              'Your personality',
              'Your voice',
              'Your little craziness',
            ].map((option) => (
              <button
                key={option}
                onClick={() => setChoice(option)}
                className={choice === option ? 'selected' : ''}
              >
                {option}
              </button>
            ))}
          </div>
          {choice && (
            <div className="answer reveal">
              <p>
                <strong>Wrong.</strong> I mean, all of those are very good
                answers. But it’s the whole combination — the completely
                irreplaceable way you are you.
              </p>
              <button
                className="text-button"
                onClick={() => setScreen('reasons')}
              >
                keep going <span>→</span>
              </button>
            </div>
          )}
        </section>
      )}

      {/* {screen === 'memories' && <section className="panel card memory enter">
        <p className="eyebrow">Things you probably don’t know I remember</p>
        <p className="memory-number">0{memory + 1}</p><h2>{memories[memory]}</h2>
        <button className="primary" onClick={() => memory === memories.length - 1 ? setScreen('reasons') : setMemory(memory + 1)}>{memory === memories.length - 1 ? 'and that is not all' : 'next memory'} <span>→</span></button>
      </section>} */}

      {screen === 'reasons' && (
        <section className="panel reason enter">
          <p className="counter">
            10 REASONS I LIKE YOU{' '}
            <span>
              {String(reason + 1).padStart(2, '0')} /{' '}
              {String(reasons.length).padStart(2, '0')}
            </span>
          </p>
          <div className="reason-card">
            <span className="reason-mark">
              {String(reason + 1).padStart(2, '0')}
            </span>
            <Sparkle />
            <h2>{reasons[reason][0]}</h2>
            <p>{reasons[reason][1]}</p>
          </div>
          <button
            className="primary"
            onClick={() =>
              reason === reasons.length - 1
                ? setScreen('final')
                : setReason(reason + 1)
            }
          >
            {reason === reasons.length - 1
              ? 'one last thing'
              : 'another reason'}{' '}
            <span>→</span>
          </button>
        </section>
      )}

      {screen === 'final' && (
        <section className="panel final enter">
          <p className="eyebrow">From me, to you</p>
          <h1>
            10 reasons were easy.
            <br />
            <em>Explaining why I like you wasn’t.</em>
          </h1>
          <div className="letter">
            <p>
              Because somewhere between our conversations, our stupid jokes, our
              little fights, and all those good-night messages…
            </p>
            <p>you became my person.</p>
            <p>And honestly, I don’t want this story to end at 30.</p>
            <p>
              <strong>Before You Came Into My Universe... 🌌</strong>
            </p>
            <p>
              Before you, I was just a lonely planet drifting through my own
              little universe.
            </p>
            <p>Then you came into my life, quietly becoming my gravity.</p>
            <p>
              Like the sun holds its planets in orbit, your presence started
              pulling me closer, making my world feel warmer and brighter.
            </p>
            <p>You didn't just enter my universe...</p>
            <p>
              <strong>You became my moon. 🌙</strong>
            </p>
            <p>
              The one I look for in the darkest nights, the one that makes my
              lonely sky feel a little less empty. ❤️
            </p>
          </div>
          <div
            className="celestial-card"
            aria-label="A celestial card with Neha as the moon and a tiny orbiting planet"
          >
            <div className="celestial-copy">
              <h2>Final celestial card</h2>
              <p>
                Neha is the glowing moon at the center of this little universe,
                and I’m the tiny planet happily pulled into her orbit.
              </p>
            </div>
            <div className="celestial-orbit">
              <div className="orbit-ring" aria-hidden="true" />
              <div className="celestial-core">
                <img
                  className="central-moon"
                  src={floralPhoto}
                  alt="Neha as a glowing celestial moon"
                />
                <img
                  className="orbit-planet"
                  src={meByTheSeaPhoto}
                  alt="A tiny planet orbiting the moon"
                />
              </div>
              <span className="star">✦</span>
              <span className="star">✧</span>
              <span className="star">✦</span>
              <span className="star">✧</span>
              <span className="star">✦</span>
            </div>
          </div>
          <div className="signature">
            always,
            <br />
            <strong>me</strong> <span>♡</span>
          </div>
        </section>
      )}
      {sleepy && (
        <div
          className="sleepy-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="A sleepy little interruption"
          onClick={() => setSleepy(false)}
        >
          <div
            className="sleepy-card"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="zzz">
              <span>z</span>
              <span>z</span>
              <span>z</span>
            </div>
            <span className="moon">☾</span>
            <p className="eyebrow">neha’s mid-conversation announcement</p>
            <h2>“sona hai, sona hai, sona…”</h2>
            <p>
              Noted. Please go sleep, drama queen. <span>♡</span>
            </p>
            <button className="primary" onClick={() => setSleepy(false)}>
              okay, good night <span>→</span>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
